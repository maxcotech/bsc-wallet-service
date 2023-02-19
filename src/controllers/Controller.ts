import { ethers } from 'ethers';
import { Response } from 'express';
import { Request } from 'express';
import { VAULT_ADDRESS } from '../config/settings';
import MessageQueueService from '../services/MessageQueueService';
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
            // const result = await service.provider.getTransaction("0x416805985aeefbeccc386bdacf88d1e8153fcb3c159129dec4b9ee3da3a8efbe");
            // res.json({result, convertedVal: parseFloat(ethers.utils.formatEther(result.value))});
            // const result = ethers.utils.formatEther(await service.fetchFeeEstimate(VAULT_ADDRESS,true) as ethers.BigNumberish)
            // const transaction = await service.createTokenTransfer(1,"0xc8f9ee7b99090ff50a2523e69c24583b9dfef889",VAULT_ADDRESS,6,true);
            // res.json({transaction});
<<<<<<< HEAD
            const wallet = await walletService.fetchWalletFromAddress("0x92cd56082dde14328a6e940002553396e0fc9a00");
            const result = await wallet.getFeeData();
            const limitInWei = ethers.utils.parseUnits(service.getGasLimit(false).toString(),'wei')
            const fee = result.gasPrice?.mul(limitInWei)
            res.json({
                gasPrice:  ethers.utils.formatUnits(result.gasPrice as ethers.BigNumberish,'gwei'),
                result,fee: ethers.utils.formatEther(fee as ethers.BigNumberish)});
=======

            const queueService = new MessageQueueService();
            const result = await queueService.fetchQueue();
            res.json({result});
>>>>>>> 9263669e00eb225d4aef4b1aac66231d011c96fa
        }
        catch(e){
            if(e instanceof Error) console.log(e.message, e.stack);
            res.json({error:e})
        }
    }
}

export default Controller;