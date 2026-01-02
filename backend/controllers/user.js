import supabase from "../utils/supabase.js";
import ApiError from "../utils/ApiError.js";
import { randomUUID } from "crypto";
import pool from "../utils/connectPool.js";

export const updateDP = async (req, res, next) => {
  const file = req.files?.file;
  if (!file)
    return next(new ApiError("no file found", 404, "api/user/changedp"));

  if (!file.mimetype.startsWith("image"))
    return next(new ApiError("File not image", 400, "api/user/changedp"));

  const filepath = `profile_pics/${randomUUID()}-${file.name}`;

  const supares = await supabase.storage
    .from("profile_pics")
    .upload(filepath, file.data, {
      contentType: file.mimetype,
      upsert: true,
    });

  if (supares.error)
    return next(new ApiError("Upload Error", 500, "api/user/changedp"));

  const urlResponse = await supabase.storage
    .from("profile_pics")
    .getPublicUrl(filepath);

  const url = urlResponse.data.publicUrl;

  const updatedUser = await pool.query(
    `UPDATE "user" SET image = $1 where id=$2`,
    [url, req.buyerid]
  );

  return res.status(201).send("dadwa");
};
