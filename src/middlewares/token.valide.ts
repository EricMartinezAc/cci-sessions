import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


interface RequestInto {
  owner: string
  token: string
  user: string
  process: string
}

const verifyIntoAndToken = async (Bearer: string, req: RequestInto) => {
  try {

    const PSW_JWT: string | undefined = process.env.JWT_SECRET;

    if (!PSW_JWT) {
      throw new Error('JWT secret is not defined in environment variables');
    }

    if (typeof Bearer !== "undefined") {
      req.owner = await Bearer.split(" ")[1];
      req.token = await Bearer.split(" ")[2];
      req.user = await Bearer.split(" ")[3];
      req.process = await Bearer.split(" ")[4];
      const resp = await jwt.verify(req.token, PSW_JWT, (error, data) => {
        return error ? false : true;
      });
      {
        console.log(`${req.token}: verified`);
        return await resp;
      }
    } else {
      if (typeof req.token !== "undefined") {
        await jwt.verify(req.token, PSW_JWT, (error, data) => {
          console.log(`${req.token}: refused`);
          return error ? false : true;
        });
        return true;
      } else {
        console.error("verifytoken", 403);
        return false;
      }
    }
  } catch (error) {
    return false;
  }
};

export default verifyIntoAndToken
