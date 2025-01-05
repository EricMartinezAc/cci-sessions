import { Request, Response } from 'express';
import { IntoUserRegtrDTO } from '../dto/into.user.regtr.dto';
import { OutPutUserSessionDTO } from '../dto/output.user.session.dto';
import userRegisterService from '../services/regtr.service';

export interface DataUserOutputDTO {
  data: OutPutUserSessionDTO;
}

const userRegtrController = async (req: Request, res: Response): Promise<void> => {
  try {   
    const { owner, clav_prodct, user, pswLogin }: IntoUserRegtrDTO = req.body;
    let userRegisterSuccess: OutPutUserSessionDTO = { statusCode: 404, email: 'unknow gateway controller regtr 20', user: `unknow gateway controller regtr 20`, token: false }

    console.log('into gateway controller regtr', { owner, user });

    if (!owner || !clav_prodct || !user || !pswLogin) {
      res.json(userRegisterSuccess)
    }

    userRegisterSuccess = await userRegisterService(owner, clav_prodct, user, pswLogin);
    res.json(userRegisterSuccess);


  } catch (error: any) {
    res.json({ statusCode: 500, email: 'unknow gateway controller regtr 20', user: `unknow gateway controller regtr 20`, token: `${error}` })
  }
};

export default userRegtrController
