import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";

export const getToken = (arg) => {
  const token = getCookie("token");
  const decode_token = jwt.decode(token)[arg];
  return decode_token;
};
