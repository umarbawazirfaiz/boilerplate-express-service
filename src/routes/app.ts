import { Router, Request, Response, NextFunction } from "express";
import { Routes } from "../interfaces/app";

class AppRoutes implements Routes {
    path: string = "/ping";
    router: Router = Router();

    constructor() {
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get(`${this.path}`, this.ping());
    }

    private ping() {
        return async (req: Request, res: Response, next: NextFunction) => {
            let response
            
            try {
                res.setHeader("Content-Type", "application/json");

                response = {
                    status: "success"
                }

                return res.status(200).json(response)
            } catch(e) {
                next(e)
            }
        }
    }
}

export default AppRoutes