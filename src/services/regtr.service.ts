import axios from 'axios';
import { OutPutUserSessionDTO } from '../dto/output.user.session.dto';
import dotenv from "dotenv";
import genereToken from '../middlewares/token.generate';
import users_schema from '../utils/users.schema';
import { loginProductInDb } from './products.services';

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


    console.log('into gateway service regtr', { owner, user });

    const objectOwner = await loginProductInDb(owner,clav_prodct)
    console.log(2, objectOwner)

    if (!objectOwner || !objectOwner.stat) {
      return { statusCode: 503, email: 'error, owner no found or unable', user: 'unknown', token: false };
    }

    const token = await genereToken(user, pswLogin)
    console.log(3, token)

    const objectUser = await users_schema
      .findOne({
        user,
        pswLogin,
        id_prodct: objectOwner.id
      })
      .exec();
    console.log(4, objectUser)

    if (objectUser) {
      await users_schema.findOneAndUpdate(
        {
          user,
          pswLogin: objectUser.pswLogin
        },
        { token });
      console.error("Object user has been stored before");
      return { statusCode: 201, email: owner, user: objectUser.user, token };
    }

    if (!token) {
      console.error("Object user was'nt stored");
      return { statusCode: 502, email: owner, user, token: false };
    }

    const newUser = new users_schema({
      user,
      pswLogin,
      id_prodct: objectOwner.id.toString(),
      token
    });

    // Almacenar el nuevo usuario
    const objectNewUserSaved = await newUser.save();
    if (!objectNewUserSaved) {
      console.error("Object user was'nt stored");
      return { statusCode: 503, email: owner, user: `${objectNewUserSaved}`, token: false };
    }


    return { statusCode: 201, email: owner, user: objectNewUserSaved.user, token };
  } catch (error: any) {
    console.error("Error while processing session:", error.message);
    return {statusCode: 500, email: `${error.message}`, user: 'noFound', token: false };
  }
};










export default userRegisterService