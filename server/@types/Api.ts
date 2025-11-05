import { Request, Response } from "express";

export type routerModule = (req: Request, res: Response) => any
