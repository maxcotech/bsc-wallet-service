import { Request, Response } from "express";
import AppService from "../services/AppService";
import Controller from "./Controller";

class HomeController extends Controller {
    public static async index(req: Request, res: Response){
        const appService = new AppService();
        res.send({
            hello: "Welcome to smart chain wallet service",
            info: {
                latestBlock: await appService.getLatestBlock(),
                consolidatedBlock: await appService.getLastIndexedNumber()
            },
            baseUrl: req.baseUrl
        })
    }

    
}

export default HomeController;