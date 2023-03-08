import  Axios, { AxiosInstance } from "axios";
import { ethers } from 'ethers';
import AppDataSource from "../config/dataSource";
import { Repository } from 'typeorm';
import Contract from "../entities/Contract";
import { transactionErrors } from "../config/errors/transaction.errors";
import { APP_BASE_URL, GB_API_KEY, NETWORK_PATH } from "../config/settings";
import { getClientSecret } from "../helpers/auth_helpers";
import { AUTH_HEADER_KEY } from "../config/appConstants";
import { NODE_URL } from './../config/settings';

class Service {
    
    baseUrl: string;
    wsBaseUrl: string;
    provider: ethers.providers.JsonRpcProvider;
    wsProvider: ethers.providers.WebSocketProvider;
    apiKey: string | undefined;
    client: AxiosInstance;
    jsonrpcVersion: 1.0;
    contractRepo: Repository<Contract>


    constructor(){
        this.apiKey = GB_API_KEY;
        this.baseUrl = `https://bsc.getblock.io/${NETWORK_PATH}/?api_key=${this.apiKey}`;
        this.wsBaseUrl = `wss://bsc.getblock.io/${NETWORK_PATH}/?api_key=${this.apiKey}`;
        this.provider = new ethers.providers.JsonRpcProvider(NODE_URL)  //JsonRpcProvider(this.baseUrl);
        this.contractRepo = AppDataSource.getRepository(Contract);      
    }       


    getConnection(){
        return this;
    }

    async getContract(contractId: number){
        const contract = await this.contractRepo.findOneBy({id: contractId});
        if(contract === null) throw new Error(transactionErrors.invalidContractTransaction);
        return contract;
    }

    async appClient(){
        const headers = {'Content-Type':"application/json"}
        headers[AUTH_HEADER_KEY] = await getClientSecret();
        return Axios.create({ baseURL: APP_BASE_URL, headers })
    }


    

    getSingleParamReqBody(param: string ,method: string, id: string = "servicecall"){
        return {
            id,
            jsonrpc: this.jsonrpcVersion,
            method,
            params: [param]
        }
    }

    getRequest(method: string, params: Array<any> = [], id: string = "servicecall"){
        return this.client.post("",JSON.stringify({
            id,
            jsonrpc: this.jsonrpcVersion,
            method,
            params
        }),{
            maxContentLength: Infinity
        })
    }

}

export default Service;