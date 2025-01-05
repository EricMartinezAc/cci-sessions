import { Request, Response } from 'express';
import { IntoUserAuthDTO } from '../dto/into.user.auth.dto';
import { OutPutUserSessionDTO } from '../dto/output.user.session.dto';
import userAuthService from '../services/auth.service';

export interface DataUserOutputDTO {
  data: OutPutUserSessionDTO;
}

const userAuthController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, user, pswLogin }:IntoUserAuthDTO = req.body;
    console.log('into gateway',{ id, user, pswLogin })
    let userAuthSuccess: OutPutUserSessionDTO = { statusCode: 404, email: 'unknow 1.5', user: `unknow 1.5`, token: false }

    if (!user || !pswLogin) {
      res.json(userAuthSuccess)
    }

    userAuthSuccess = await userAuthService(id, user, pswLogin);
    res.json(userAuthSuccess)
  } catch (error: any) {
    res.json({ email: '500', user: `unknow 1.2`, token: `${error}` })
  }
};

export default userAuthController

