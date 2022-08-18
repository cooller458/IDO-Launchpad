import { ERC20_ABI, ERC20_ADDRESS, DECIMAL } from "../config/erc20";
import { PROXY_SALE,PROXY_SALE_ABI } from '../config/proxy'
import { SALE_ABI } from '../config/presale'
import toast, { Toaster } from 'react-hot-toast';
import { useWeb3 } from "./useWeb3";
import { getSaleInfo, getSaleInfoCard, toFixedNumber, UseProxySale, UseSale } from "./useContract";
import { ONEDAYINSECONDS } from "../config/env";
import { getAccount } from "./useAccount";

export const getTotalSalesInfo = async()=>{
    const proxy = await UseProxySale();
    let data = await proxy.methods.getTotalSales().call();
    console.log("Data : ",data)
    const filteredData = await data.filter(value => ((value._isActive)) == true);
    const reverseArray = [...filteredData].reverse();
    return (reverseArray);
}

export const getRequestsInfo = async()=>{
    const proxy = await UseProxySale();
    const account = getAccount();
    let data = await proxy.methods.getTotalSales().call();
    console.log("Total Saled :",data)
    const filteredData = await data.filter(value => ((value._from).toUpperCase()) == (account.toUpperCase()));
    const reverseArray = [...filteredData].reverse();
    return (reverseArray);
}

export const getRequestedSales = async()=>{
    const proxy = await UseProxySale();
    let data = await proxy.methods.getTotalSales().call();
    const filteredData = await data.filter(value => ((value._isActive)) == false);
    const reverseArray = [...filteredData].reverse();
    return (reverseArray);
}


export const getSaleCards = async (cards)=>{
    let SaleInfoCards = [];
    await cards.map( async(index)=>{
        const saleInfo = await getSaleInfoCard(index._sale);
        SaleInfoCards.push(saleInfo);
    })
    return SaleInfoCards;
}

export const getSaleCardsLimit = async (cards,start,end)=>{
    let SaleInfoCards = [];
    console.log("Cards data : ",cards,start,end)
    if(cards.length > 0){
    for(var i=start;i<end;i++){
        if(i<cards.length){
            const saleInfo = await getSaleInfoCard(cards[i]._sale);
            SaleInfoCards.push(saleInfo);
        }    
    }
    
    }
    return SaleInfoCards;
}

export const searchSale = async(SaleInfoCards,search) =>{
   const filteredData = await SaleInfoCards.filter(value => ((value._name).toUpperCase()).includes(search.toUpperCase()));
  // console.log("Sale filteredData : ",filteredData)
   let filteredCard = [];
   await filteredData.map( async(index)=>{
    const saleInfo = await getSaleInfoCard(index._sale);
    filteredCard.push(saleInfo);
    })
    console.log("Sale filteredCard : ",filteredCard)
   return filteredCard;
}

export const searchCards = async(SaleInfoCards, search) => {
    const filteredData = await SaleInfoCards.filter(value => ((value._name).toUpperCase()).includes(search.toUpperCase()));
    return filteredData;
}

export const isSaleLive = (start,end,isOpen) => {
    return (Date.now() >= (start*1000) && Date.now()<= (end*1000)) && isOpen;
}

export const isUpcoming = (start,end) =>{
    return (Date.now() < (start*1000));
}

export const isSaleEnded = (start,end,isOpen) => {
    return (Date.now() >= (end*1000)) || !isOpen
}

export const UpcomingDiffernce = (start) => {
    return ((start*1000) - Date.now());
}

export const Salediffernce = (end)=>{
    return ((end*1000)-Date.now());
}


export const processCSV = (str, delim=',') => {
    const headers = str.slice(0,str.indexOf('\n')).split(delim);
    const rows = str.slice(str.indexOf('\n')+1).split('\n');

    const newArray = rows.map( row => {
        const values = row.split(delim);
        const eachObject = headers.reduce((obj, header, i) => {
            obj[header] = values[i];
            return obj;
        }, {})
        return eachObject;
    })

    return (newArray)
}

export const acceptProject = async(SALE,account,name)=>{
    const proxy = await UseProxySale();
    const data = proxy.methods.activateSale(SALE).send({ from: account})
    await toast.promise(data, {
        loading: 'Activating '+ name +' Presale ...',
        success: name +' Presale Activated Successfully',
        error: (err) => `Error : ${err.message}`,
    }, {
        style: {
        minWidth: '300px',
        minHeight: '55px'
        }
    }
    );
}

export const rejectProject = async(SALE,account,name)=>{
    const proxy = await UseProxySale();
    const data = proxy.methods.deleteSalePresale(SALE).send({ from: account})
    await toast.promise(data, {
        loading: 'Rejecting '+ name +' Presale ...',
        success: name +' Presale Rejected Successfully',
        error: (err) => `Error : ${err.message}`,
    }, {
        style: {
        minWidth: '300px',
        minHeight: '55px'
        }
    }
    );
}

export const isActivated = async (Sale) =>{
    const proxy = await UseProxySale();
    const data = await proxy.methods.getActivated(Sale).call();
    if(!data){
        toast.error(`Warning ! Sale is Not Activated`,
        {
            style: {
            minWidth: '300px',
            minHeight: '55px'
            }
        });
    }
    return data;
}

export const changePresaleFee = async(fee,account)=>{
    const proxy = await UseProxySale();
    const feevalue = toFixedNumber(fee*10**18);
    const data = proxy.methods.setDeploymentFee(feevalue.toString()).send({ from: account });
    await toast.promise(data, {
        loading: 'Updating Presale Deployment Fee ...',
        success: 'Presale Deployment Fee Updated Successfully',
        error: (err) => `Error : ${err.message}`,
    }, {
        style: {
        minWidth: '300px',
        minHeight: '55px'
        }
    }
    );
}

export const changeTokenFee = async(fee,account)=>{
    const proxy = await UseProxySale();
    const feevalue = (fee*100);
    const data = proxy.methods.setTokenFee(feevalue.toString()).send({ from: account });
    await toast.promise(data, {
        loading: 'Updating Presale Share Fee ...',
        success: 'Presale Share Fee Updated Successfully',
        error: (err) => `Error : ${err.message}`,
    }, {
        style: {
        minWidth: '300px',
        minHeight: '55px'
        }
    }
    );
}

