import axios from 'axios';
import { OutPutUserSessionDTO } from '../dto/output.user.session.dto';
import genereToken from '../middlewares/token.generate';
import users_schema from '../utils/users.schema';
import dotenv from "dotenv";
import { findProductInDb } from './products.services';

dotenv.config();

interface FindProductResponse {
  owner: string;
  stat: boolean;
  token: string | boolean
}


const userAuthService = async (id: string, userIn: string, pswLogin: string): Promise<OutPutUserSessionDTO> => {
  try {
    console.log( id)

    const responseFindProduct = await findProductInDb(id)

    const { owner, stat } = responseFindProduct;


    if (!owner || !stat) {
      console.log('objectOwner', {owner,stat});
      return { statusCode: 503, email: 'error, owner no found or unable', user: 'unknown', token: false };
    }

    const objectUser = await users_schema
      .findOne({
        user: userIn,
        pswLogin,
        id_prodct: id
      })
      .exec();

      console.error(objectUser, "Object user no found");
    if (!objectUser) {
      console.error("Object user no found");
      return { statusCode: 409, email: `no found user`, user: userIn, token: false };
    }

    const token = await genereToken(userIn, pswLogin)
    await users_schema.findOneAndUpdate(
      {
        user: userIn,
        pswLogin: objectUser.pswLogin
      },
      { token });

    return { statusCode: 200, email:owner, user: objectUser.user, token };
  } catch (error: any) {
    console.error(`Error consultando API : ${error.message}`);
    return { statusCode: 500, email: `auth service gateway ${id}`, user: `auth service gateway ${userIn}` , token: false };
  }
};

export default userAuthService

