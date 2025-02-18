import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const PSW_JWT = process.env.PSW_JWT;
const DB_USER = process.env.DB_USER;

if (!PSW_JWT || !DB_USER) {
  throw new Error("Environment variables PSW_JWT or DB_USER are not set");
}

const verifyToken = (token:string) => {
  try {
    const decoded = jwt.verify(token, PSW_JWT, { issuer: DB_USER });
    return { valid: true, decoded };
  } catch (error:any) {
    return { valid: false, error: error.message };
  }
};

export default verifyToken;