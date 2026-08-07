import { stripe } from "../utils/stripe.js";
import ApiError from "../utils/ApiError.js";
import pool from "../utils/connectPool.js";

export const payment = async (req, res, next) => {
  const { user_id } = req.user;
  let { order_id, product_id, quantity } = req.body;

  quantity = Number(quantity);

  if (!Number.isInteger(quantity) || quantity <= 0) {
    return next(new ApiError(400, "Invalid quantity"));
  }

  const response = await pool.query(
    `select name as product_name, offer_price from product where id=$1`,
    [product_id],
  );

  if (!response?.rows?.length)
    return next(new ApiError(404, "Product not found on the database"));

  const { product_name, offer_price } = response.rows[0];

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: quantity,
          price_data: {
            currency: "usd",

            product_data: {
              name: product_name,
            },

            unit_amount: Math.round(Number(offer_price) * 100),
          },
        },
      ],

      metadata: {
        user_id: user_id?.toString(),
        order_id: order_id?.toString(),
      },

      success_url: process.env.FRONTEND_URL + "/orders/success",
      cancel_url: process.env.FRONTEND_URL + "/orders",
    });

    return res.status(200).json({
      url: session.url,
    });
  } catch (error) {
    console.log(error);
    return next(new ApiError("Stripe Related Error", 500));
  }
};

// confirm order
export const confirmOrder = async (req, res, next) => {
  const signature = req.headers["stripe-signature"];

  const event = stripe.webhooks.constructEvent(
    req.body,
    signature,
    process.env.STRIPE_WH_SK,
  );

  if (event.type !== "checkout.session.completed") {
    return res.sendStatus(200);
  }

  const session = event.data.object;
  const { user_id, order_id, product_id } = session.metadata;

  const order_status = (
    await pool.query(
      `SELECT order_status FROM "order" WHERE buyer_id=$1 AND id=$2`,
      [user_id, order_id],
    )
  )?.rows[0]?.order_status;

  if (order_status !== "Pending")
    return next(
      new ApiError("Unauthorized", 401, "Order is not pending anymore"),
    );

  const response = await pool.query(
    `UPDATE "order" SET order_status='Payed' WHERE buyer_id=$1 AND id=$2 returning *`,
    [user_id, order_id],
  );

  if (!response.rows.length)
    return next(
      new ApiError("Failed to save orders in database", 500, "at /webhook"),
    );

  return res.status(201).json({ success: true, message: "Payment Completed" });
};
