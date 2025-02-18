import { Request, Response } from "express";
import { INTO_valideTokenActv_DTO } from "../dto/into.valideTokenActv.dto";
import { OutPutUserSessionDTO } from "../dto/output.user.session.dto";
import valideTokenActvService from "../services/valideTokenActv.service";
import { UserDTO } from "../dto/User.object.dto";
import { OUTPUT_valideTokenActv_DTO } from "../dto/output.valideTokenActv.dto";

export interface DataUserOutputDTO {
  data: OutPutUserSessionDTO;
}

const valideTokenActvController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { user, email, token }: INTO_valideTokenActv_DTO = req.body;

    console.log("into valide token", { email, user });

    const valideTokenActvSuccess: OUTPUT_valideTokenActv_DTO =
      await valideTokenActvService({
        user,
        email,
        token,
      });
    res.json(valideTokenActvSuccess);
  } catch (error: any) {
    res.json({
      statusCode: 500,
      token: `${error}`,
    });
  }
};

export default valideTokenActvController;
