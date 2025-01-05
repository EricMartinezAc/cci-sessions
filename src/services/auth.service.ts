import axios from 'axios';
import { OutPutUserSessionDTO } from '../dto/output.user.session.dto';
import genereToken from '../middlewares/token.generate';
import usersSchema from '../utils/users.schema';
import dotenv from "dotenv";

dotenv.config();

interface FindProductResponse {
  owner: string;
  stat: boolean;
  token: string | boolean
}


const userAuthService = async (id: string, userIn: string, pswLogin: string): Promise<OutPutUserSessionDTO> => {
  try {
    console.log(`${process.env.MSPRODUCTS_URI}${process.env.MSPRODUCTS_LOGIN}`, { id, userIn })

    const responseFindProduct = await axios.post<FindProductResponse>(
      `${process.env.MSPRODUCTS_URI}${process.env.MSPRODUCTS_FIND}`, { id }
    );

    const { owner, stat } = responseFindProduct.data;


    if (!owner || !stat) {
      console.log('objectOwner', {owner,stat});
      return { statusCode: 503, email: 'error, owner no found or unable', user: 'unknown', token: false };
    }

    const objectUser = await usersSchema
      .findOne({
        user: userIn,
        pswLogin,
        id_prodct: id
      })
      .exec();

    if (!objectUser) {
      console.error("Object user no found");
      return { statusCode: 409, email: `no found user`, user: userIn, token: false };
    }

    const token = await genereToken(userIn, pswLogin)
    await usersSchema.findOneAndUpdate(
      {
        user: userIn,
        pswLogin: objectUser.pswLogin
      },
      { token });

    return { statusCode: 200, email:owner, user: objectUser.user, token };
  } catch (error: any) {
    console.error(`Error consultando API : ${error.message}`);
    return { statusCode: 500, email: "auth service gateway ", user: "auth service gateway ", token: false };
  }
};

export default userAuthService

