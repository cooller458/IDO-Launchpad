import { ERC20_ABI, ERC20_ADDRESS, DECIMAL } from "../config/erc20";
import { PROXY_SALE,PROXY_SALE_ABI,PROXY } from '../config/proxy'
import { CHAINS } from "../config/env";
import { SALE_ABI } from '../config/presale'
import toast, { Toaster } from 'react-hot-toast';
import { CURRENT_CHAIN_ID, CURRENT_RPC_URL, useWeb3 } from "./useWeb3";
import Web3 from "web3"


   
export const UseERC20 = async (VALUE) =>{
    const web3 = await useWeb3();
    const contract = new web3.eth.Contract(ERC20_ABI, VALUE);
    return contract;                
}

export const UseSale = async (VALUE) =>{
    const web3 = await useWeb3();
    const contract = new web3.eth.Contract(SALE_ABI, VALUE);
    return contract;                
}

export const getProxyAddress = ()=>{
    const CHAIN_ID = CURRENT_CHAIN_ID();
    return PROXY[CHAIN_ID];
}

export const checkChainId = (chainId) =>{
    const CHAIN_ID = CURRENT_CHAIN_ID();
    if(parseInt(chainId) != parseInt(CHAIN_ID)){
        toast.error(`Connected to Wrong Network !`,
            {
                style: {
                minWidth: '300px',
                minHeight: '55px'
                }
            });
    }
    return true;
}

export const UseProxySale = async () =>{
     const web3 = await useWeb3();
     const chainId = await web3.eth.getChainId();
     checkChainId(chainId);
     const proxysale = getProxyAddress();
    const contract = new web3.eth.Contract(PROXY_SALE_ABI, proxysale);
    console.log("use proxy sale chain id:",chainId,"proxysale",proxysale);
    return contract;   
}

export const getProxyOwner = async () => {
    const proxy = await UseProxySale();
    const owner = await proxy.methods.owner().call();
  return owner
}

export const UseTokenInfo = async (TOKEN) => {
    const token = await UseERC20(TOKEN);
    const name= await token.methods.name().call();
    const symbol= await token.methods.symbol().call();
    const decimals= await token.methods.decimals().call();
    const data = {
        name: name,
        symbol: symbol,
        decimals: decimals
    }
    return data;
}

export const IsValidAddress = async(ADDRESS) =>{
    const web3 = await useWeb3();
    const value = await web3.utils.isAddress(ADDRESS);
    return value;
}

export const getFullBalance = (value) =>{
    const balance = parseFloat(value) / 10 ** parseFloat(DECIMAL)
    return balance.toFixed(2)
}

export const getWholeNumber = (value) => {
    const balance = (parseFloat(value) * 10 ** parseFloat(DECIMAL))
    return toFixedNumber(balance).toString()
}

export const isFloat = (x) => {
    if(!!(x % 1)){
        toast.error(`Decimal Values are not accepted !`,
            {
                style: {
                minWidth: '300px',
                minHeight: '55px'
                }
            });
    }
    return !!(x % 1);
}

export const createPresale = async(token,values,setters,details,account) =>{
    await InitiatePresale(token,values,setters,details,account);
    const sale = await getSaleAddress(token[0]);
    return sale;  
}

export const InitiatePresale = async(token,values,setters,details,account) =>{
    const proxyContract = await UseProxySale();
    const deploymentFee = await proxyContract.methods.getDeploymentFee().call();
    const data = proxyContract.methods.createPresale(token,values,setters,details).send({ from: account, value: deploymentFee})
    await toast.promise(data, {
        loading: 'Creating New Presale ...',
        success: 'Presale Created Successfully',
        error: (err) => `Error : ${err.toString()}`,
    }, {
        style: {
        minWidth: '300px',
        minHeight: '55px'
        }
    }
    );
}

export const getSaleAddress = async (tokenAddress)=>{
      const proxyContract = await UseProxySale();
    const sale = await proxyContract.methods.getSale(tokenAddress).call()
    return sale;
}

export const depositTokens = async (tokenAddress,saleAddress,value,account) => {
    const erc20 = await UseERC20(tokenAddress)
    const data = erc20.methods.transfer(saleAddress,value).send({ from: account})
    await toast.promise(data, {
        loading: 'Depositing Tokens ...',
        success: 'Tokens Deposited Successfully',
        error: 'Error ! When Depositing Tokens',
    }, {
        style: {
        minWidth: '300px',
        minHeight: '55px'
        }
    });
    const balance = await erc20.methods.balanceOf(saleAddress).call();
    if(balance >= parseInt(value)){
        return true;
    }else{
        return false;
    }
}

export const getSaleInfo = async(ADDRESS)=>{
    const saleContract = await UseSale(ADDRESS);
    const tokenAddress = await saleContract.methods.tokenAddress().call();
    const isWithoutToken = await saleContract.methods.isWithoutToken().call();
    let name,symbol,decimals = "";
    if(isWithoutToken){
        name = await saleContract.methods.tokenName().call();
        symbol = await saleContract.methods.tokenSymbol().call();
        decimals = await saleContract.methods.tokenDecimals().call();
    }else{
        const tokenContract = await UseERC20(tokenAddress);
         name = await tokenContract.methods.name().call();
         symbol = await tokenContract.methods.symbol().call();
         decimals = await tokenContract.methods.decimals().call();
    }
    const description = await saleContract.methods.description().call();
    const logo = await saleContract.methods.logo().call();
    const start = await saleContract.methods.startTime().call();
    const end = await saleContract.methods.endTime().call();
    const islive = Date.now() >= start && Date.now <= end;
    const earnedCap = await saleContract.methods.earnedCap().call();
    const participants = await saleContract.methods.participants().call();
    const website = await saleContract.methods.social(0).call();
    const twitter = await saleContract.methods.social(1).call();
    const telegram = await saleContract.methods.social(2).call();
    const isPancake = await saleContract.methods.isautoAdd().call();
    const isVested = await saleContract.methods.isVested().call();
    const vestingInterval = await saleContract.methods.vestingInterval().call();
    const vestingPercent = await saleContract.methods.vestingPercent().call();
    const hardCap = await saleContract.methods.hardCap().call();
    const softCap = await saleContract.methods.softCap().call();
    const tokenRatePerEth = await saleContract.methods.tokenRatePerEth().call();
    const minEthLimit = await saleContract.methods.minEthLimit().call();
    const maxEthLimit = await saleContract.methods.maxEthLimit().call();
    const ownerAddress = await saleContract.methods.owner().call();
    const data = {
        name: name,
        symbol: symbol,
        decimals: decimals,
        tokenAddress: tokenAddress,
        logo: logo,
        isWithoutToken: isWithoutToken,
        description: description,
        start: start,
        end: end,
        islive: islive,
        earnedCap: earnedCap,
        participants: participants,
        website: website,
        twitter: twitter,
        telegram: telegram,
        isPancake: isPancake,
        isVested: isVested,
        vestingInterval:vestingInterval,
        vestingPercent: vestingPercent,
        hardCap: hardCap,
        softCap: softCap,
        tokenRatePerEth: tokenRatePerEth,
        minEthLimit: minEthLimit,
        maxEthLimit: maxEthLimit,
        owner: ownerAddress
    }

    return data;
}

export const GetSalePerAccount = async (account,saleAddress) => {
    // console.log("User data " ,account )
    // const web3 = await useWeb3();
    const saleContract = await UseSale(saleAddress);
    const userData = await saleContract.methods.getUserInfo(account).call();
//     const tokenAddress = await saleContract.methods.tokenAddress().call();
//     const erc20 = await UseERC20(tokenAddress);
//     const bnbBalance = await web3.eth.getBalance(account);
//    const userTokenBalance = await erc20.methods.balanceOf(account).call();
//     console.log("Token address : ",tokenAddress)
//     const userInvested = await saleContract.methods.getUserInvestments(account).call();
//     const userClaimbale = await saleContract.methods.getUserClaimbale(account).call();
//     const getUnsoldTokens = await saleContract.methods.getUnsoldTokensBalance().call();
//     const userWhitelistedAmount = await saleContract.methods.whitelistedAddresses(tokenAddress,account).call();
//     const userData = {
//         bnbBalance: bnbBalance,
//         userInvested: userInvested,
//         userClaimbale: userClaimbale,
//         userWhitelistedAmount: userWhitelistedAmount,
//         userTokenBalance: userTokenBalance,
//         unSoldTokens: getUnsoldTokens
//     }
//     console.log("User data " ,userData )
    return userData;
}

export const getSaleInfoCard = async (saleAddress) => {
    const saleContract = await UseSale(saleAddress);
    const data = await saleContract.methods.getSaleInfo().call();
    return data;
}


export const approveContract = async(contract, account,CONTRACT_ADDRESS)=>{
    await contract.methods.approve(CONTRACT_ADDRESS,"115792089237316195423570985008687907853269984665640564039457584007913129639935").send({ from: account})
}

export const toFixedNumber = (x)=> {
    if (Math.abs(x) < 1.0) {
        var e = parseInt(x.toString().split('e-')[1]);
        if (e) {
            x *= Math.pow(10, e - 1);
            x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
        }
    } else {
        var e = parseInt(x.toString().split('+')[1]);
        if (e > 20) {
            e -= 20;
            x /= Math.pow(10, e);
            x += (new Array(e + 1)).join('0');
        }
    }
    return x;
}