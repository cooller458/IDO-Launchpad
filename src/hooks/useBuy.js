import { ERC20_ABI, ERC20_ADDRESS, DECIMAL } from "../config/erc20";
import { PROXY_SALE,PROXY_SALE_ABI } from '../config/proxy'
import { SALE_ABI } from '../config/presale'
import toast, { Toaster } from 'react-hot-toast';
import { useWeb3 } from "./useWeb3";
import { toFixedNumber, UseSale } from "./useContract";

export const calculateBuy = async(saleAddress,bnbValue)=>{
    const saleContact = await UseSale(saleAddress);
    const bnbValues = toFixedNumber(bnbValue * 10 **18);
    const willGet = await saleContact.methods.getTokensPerEth(bnbValues.toString()).call();
    return willGet;
}

export const BuyToken = async(saleAddress,bnbValue,isMax,maxNumber,account)=>{
    const web3 = await useWeb3();
    const amount = !isMax? toFixedNumber(bnbValue * 10 **18): maxNumber ;
    const data = web3.eth.sendTransaction({ from: account, to: saleAddress, value: amount.toString() })
    await toast.promise(data, {
        loading: 'Making a Buy Token Request...',
        success: 'Bougt Token Successfully',
        error: 'Error ! When Buying Token',
    }, {
        style: {
        minWidth: '300px',
        minHeight: '55px'
        }
    }
    );
}

export const claimToken = async(saleAddress,account) => {
    const saleContact = await UseSale(saleAddress);
    const data = saleContact.methods.claimTokens().send({ from: account });
    await toast.promise(data, {
        loading: 'Requesting for Claim Tokens...',
        success: 'Tokens Claimed Successfully',
        error: 'Error ! When Claiming Token',
    }, {
        style: {
        minWidth: '300px',
        minHeight: '55px'
        }
    }
    );
}

