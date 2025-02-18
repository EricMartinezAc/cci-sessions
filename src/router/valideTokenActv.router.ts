import express, { NextFunction, Request, Response } from "express";
import valideTokenActvController from "../controllers/valideTokenActv.controller";

const route_valideTokenActv = express.Router();

route_valideTokenActv.post(
  "/route/route_valideTokenActv",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    (await req.body)
      ? next()
      : res.json({ statusCode: 500, token: req.body });
  },
  valideTokenActvController
);

export default route_valideTokenActv;
