import express, { NextFunction, Request, Response } from 'express';
import userRegtrController from '../controllers/regtr.controller';
import {ValideInputRegtr} from '../middlewares/valideInputsSession';

const route_regtr = express.Router();

route_regtr.post('/route/register',
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        await ValideInputRegtr(req.body) ?
            next() :
            res.json({ statusCode: 500, email: 'unknow gateway email 10', user: `unknow gateway user 10`, token: false })
    }, userRegtrController);


route_regtr.get('/route/register', (req, res) => {
    const productInfo = {
        owner: 'arcontroller@climatecontrolsing.com',
        clav_prodct: 'Exampl2025*'
    };

    res.json(productInfo);
});

export default route_regtr;
