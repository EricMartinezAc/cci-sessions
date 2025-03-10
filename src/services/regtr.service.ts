import axios from "axios";
import { OutPutUserSessionDTO } from "../dto/output.user.session.dto";
import dotenv from "dotenv";
import genereToken from "../middlewares/token.generate";
import users_schema from "../utils/users.schema";
import { loginProductInDb } from "./products.services";
import { UserDTO } from "../dto/User.object.dto";

dotenv.config();

interface LoginProductResponse {
  id: string;
  stat: boolean;
  token: string;
}

export const userRegisterService = async (
  owner: string,
  clav_prodct: string,
  user: string,
  pswLogin: string
): Promise<OutPutUserSessionDTO> => {
  try {
    console.log("into gateway service regtr", { owner, user });

    const objectOwner = await loginProductInDb(owner, clav_prodct);
    console.log(2, objectOwner);

    if (!objectOwner || !objectOwner.stat) {
      return {
        statusCode: 503,
        email: "error, owner no found or unable",
        user: { user: "unknown" },
        token: false,
      };
    }

    const token = await genereToken(user, pswLogin);
    console.log(3, token);

    const objectUser: UserDTO | any = await users_schema
      .findOne({
        user,
        pswLogin,
        id_prodct: objectOwner.id,
      })
      .exec();

    if (!objectUser) {
      throw new Error("user no found");
    }

    if (objectUser) {
      await users_schema.findOneAndUpdate(
        {
          user,
          pswLogin: objectUser.pswLogin,
        },
        { token }
      );
      console.error("Object user has been stored before");
      return { statusCode: 201, email: owner, user: objectUser, token };
    }

    if (!token) {
      console.error("Object user was'nt stored");
      return {
        statusCode: 502,
        email: owner,
        user: { user: "no Token" },
        token: false,
      };
    }

    const newUser = new users_schema({
      user,
      pswLogin,
      id_prodct: objectOwner.id.toString(),
      token,
    });

    // Almacenar el nuevo usuario
    const objectNewUserSaved: UserDTO | any = await newUser.save();
    if (!objectNewUserSaved) {
      console.error("Object user was'nt stored");
      return {
        statusCode: 503,
        email: owner,
        user: { user: `${objectNewUserSaved}` },
        token: false,
      };
    }

    return {
      statusCode: 201,
      email: owner,
      user: objectNewUserSaved.user,
      token,
    };
  } catch (error: any) {
    console.error("Error while processing session:", error.message);
    return {
      statusCode: 500,
      email: `${error.message}`,
      user: { user: "error while processing regist" },
      token: false,
    };
  }
};

export default userRegisterService;
