import axios from "axios";
import valideTokenSingle from "../middlewares/token.valide.single";
import users_schema from "../utils/users.schema";
import dotenv from "dotenv";
import { findProductInDbByEmail } from "./products.services";
import { UserDTO } from "../dto/User.object.dto";
import { OUTPUT_valideTokenActv_DTO } from "../dto/output.valideTokenActv.dto";
import { INTO_valideTokenActv_DTO } from "../dto/into.valideTokenActv.dto";

dotenv.config();

const valideTokenActvService = async ({
  user,
  email,
  token,
}: INTO_valideTokenActv_DTO): Promise<OUTPUT_valideTokenActv_DTO> => {
  try {
    const id_prodct: string = await findProductInDbByEmail(email);

    const ValideTokenSingle = await valideTokenSingle(token);
    if (!ValideTokenSingle.valid) throw new Error(ValideTokenSingle.error);

    const objectUser: UserDTO | any = await users_schema
      .findOne({
        user: user,
        token: token,
        id_prodct: id_prodct,
      })
      .exec();

    if (!objectUser) {
      console.error("Object user no found");
      throw new Error("Usuario no encontrado");
    }

    return { statusCode: 200, token };
  } catch (error: any) {
    console.error(`Error consultando API : ${error.message}`);
    return {
      statusCode: 500,
      token: error.message,
    };
  }
};

export default valideTokenActvService;
