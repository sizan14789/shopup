import { stripe } from "../utils/stripe.js";
import ApiError from "../utils/ApiError.js";
import pool from "../utils/connectPool.js";

export const payment = async (req, res, next) => {
  const { user_id } = req.user;
  let { product_id, quantity } = req.body;

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
        product_id: product_id?.toString(),
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
  const { buyerid } = req;
  const id = req.params.id;

  const order_status = (
    await pool.query(
      `SELECT order_status FROM "order" WHERE buyer_id=$1 AND id=$2`,
      [buyerid, id],
    )
  )?.rows[0]?.order_status;

  if (order_status !== "Pending")
    return next(
      new ApiError("Unauthorized", 401, "Order is not pending anymore"),
    );

  //   await pool.query(
  //     `UPDATE "order" SET order_status='Payed' WHERE buyer_id=$1 AND id=$2`,
  //     [buyerid, id],
  //   );

  return res.status(201).json({ success: true, message: "Payment Completed" });
};
