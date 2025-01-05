import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const PSW_JWT: string | undefined = process.env.PSW_JWT;
const DB_USER: string | undefined = process.env.DB_USER;

if (!PSW_JWT || !DB_USER) {
  throw new Error("Environment variables PSW_JWT or DB_USER are not set");
}

const genereToken = async (name: string, psw: string) => {
  const payload = {
    id: uuidv4(), 
    name,        
    psw,       
    issuedAt: new Date().toISOString(), 
  };

  return await jwt.sign(payload, PSW_JWT, {
    expiresIn: "1h",     
    issuer: DB_USER,     
    algorithm: "HS256",  
  });
};

export default genereToken;
