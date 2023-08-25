import Controller from './Controller';
import TransactionService from '../services/TransactionService';
import { HttpRequestParams } from './../dataTypes/Http';
import { VAULT_ADDRESS } from '../config/settings';
import AppDataSource from '../config/dataSource';
import Contract from '../entities/Contract';


export default class TransactionController extends Controller {

    public static async getFeeEstimate({ req }: HttpRequestParams) {
        const txnService = new TransactionService();
        return {
            fee: txnService.fetchFeeEstimate(req.query?.from, (req?.query?.contract === null) ? false : true),
            amount: req.query?.amount,
            from: req.query?.from,
            to: req.query?.to
        }
    }


    public static async createTransaction({ req, res }: HttpRequestParams) {
        try {
            const { toAddress, contractAddress, amount, fromAddress } = req.body ?? {};
            const txnService = new TransactionService();
            const contractRepo = AppDataSource.getRepository(Contract);
            const contract = (contractAddress) ? await contractRepo.findOneBy({ contractAddress }) : null;
            const sentTransaction = await txnService.sendTransferTransaction(
                amount,
                fromAddress ?? VAULT_ADDRESS,
                toAddress,
                contract?.id ?? undefined
            )
            return {
                sentTransaction,
                amount
            }

        } catch (e) {
            let message = "Unknown error occurred";
            if (e instanceof Error) {
                message = e.message;
            }
            res.status(500).json({
                message
            })
        }


    }

}