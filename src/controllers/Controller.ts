import { ethers } from 'ethers';
import { Response } from 'express';
import { Request } from 'express';
import TransactionService from '../services/TransactionService';
import WalletServices from '../services/WalletServices';

class Controller {
    public static successWithData(res: Response,data: any, message: string = "successful"){
        res.json({
            success: true,
            message,
            data
        })
    }

    static async testRun(req: Request, res: Response){
        try{
            const service = new TransactionService();
            const walletService = new WalletServices();
            const wallet = await walletService.fetchWalletFromAddress("0x92cd56082dde14328a6e940002553396e0fc9a00");
            const result = await wallet.getFeeData();
            const limitInWei = ethers.utils.parseUnits(service.getGasLimit(false).toString(),'wei')
            const fee = result.gasPrice?.mul(limitInWei)
            res.json({
                gasPrice:  ethers.utils.formatUnits(result.gasPrice as ethers.BigNumberish,'gwei'),
                result,fee: ethers.utils.formatEther(fee as ethers.BigNumberish)});
        }
        catch(e){
            if(e instanceof Error) console.log(e.message, e.stack);
            res.json({error:e})
        }
    }
}

export default Controller;