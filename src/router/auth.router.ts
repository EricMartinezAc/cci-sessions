import express, { NextFunction, Request, Response } from 'express';
import userAuthController from '../controllers/auth.controller';
import {ValideInputAuth} from '../middlewares/valideInputsSession';

const route_auth = express.Router();

route_auth.post('/route/auth',
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        await ValideInputAuth(req.body) ?
            next() :
            res.json({ statusCode: 500, email: 'unknow gateway email 10', user: `unknow gateway user 10`, token: false })
    }, userAuthController);



route_auth.get('/route/auth', (req, res) => {
    const productInfo = {
        owner: 'arcontroller@climatecontrolsing.com',
        clav_prodct: 'Exampl2025*'
    };

    res.json(productInfo);
});

export default route_auth;
