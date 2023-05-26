import { Request, Response } from "express";
import AppService from "../services/AppService";
import Controller from "./Controller";
import AppDataSource from "../config/dataSource";
import Contract from "../entities/Contract";
import TransactionService from "../services/TransactionService";
import { VAULT_ADDRESS } from "../config/settings";

class HomeController extends Controller {
    public static async index(req: Request, res: Response){
        const {address} = req.query
        const appService = new AppService();
        const repo = AppDataSource.getRepository(Contract);
        const txnService = new TransactionService();
        const contractId = (await repo.findOneBy({contractAddress: address as string}))?.id ?? null;
        res.send({
            hello: "Welcome to smart chain wallet service",
            info: {
                latestBlock: await appService.getLatestBlock(),
                consolidatedBlock: await appService.getLastIndexedNumber(),
                vaultAddress: VAULT_ADDRESS,
                received: await txnService.getWalletAccountInfo(contractId)
            },
            baseUrl: req.baseUrl
        })
    }

    
}

export default HomeController;