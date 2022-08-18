import { ERC20_ABI, ERC20_ADDRESS, DECIMAL } from "../config/erc20";
import { PROXY_SALE,PROXY_SALE_ABI } from '../config/proxy'
import { SALE_ABI } from '../config/presale'
import toast, { Toaster } from 'react-hot-toast';
import { useWeb3 } from "./useWeb3";
import { getSaleInfo, getSaleInfoCard, IsValidAddress, toFixedNumber, UseSale } from "./useContract";
import { ONEDAYINSECONDS } from "../config/env";

export const updatePresaleRate = async (saleInfo,saleAddress,account) =>{
    const presaleRate = saleInfo.presaleRate;
    const saleContact = await UseSale(saleAddress);
    const data = saleContact.methods.setTokenRatePerEth(presaleRate).send({from: account});
    await toast.promise(data, {
        loading: 'Updating Presale Price ...',
        success: 'Presale Price Updated Successfully',
        error: (err) => `Error ! : ${err.toString()}`,
    }, {
        style: {
        minWidth: '300px',
        minHeight: '55px'
        }
    }
    );
}

export const updateMinBNB = async (saleInfo,saleAddress,account) =>{
    const value = toFixedNumber(saleInfo.minEthLimit * 10 ** 18);
    const saleContact = await UseSale(saleAddress);
   
    const data = saleContact.methods.setMinEthLimit(value.toString()).send({from: account});
    await toast.promise(data, {
        loading: 'Updating ...',
        success: 'Data Updated Successfully',
        error: (err) => `Error ! : ${err.toString()}`,
    }, {
        style: {
        minWidth: '300px',
        minHeight: '55px'
        }
    }
    );

}

export const updateMaxBNB = async (saleInfo,saleAddress,account) =>{
    const value = toFixedNumber(saleInfo.maxEthLimit * 10 ** 18);
    const saleContact = await UseSale(saleAddress);
    const data = saleContact.methods.setMaxEthLimit(value.toString()).send({from: account});
    await toast.promise(data, {
        loading: 'Updating ...',
        success: 'Data Updated Successfully',
        error: (err) => `Error ! : ${err.toString()}`,
    }, {
        style: {
        minWidth: '300px',
        minHeight: '55px'
        }
    }
    );

}

export const updateSaleEvent = async (saleInfo,saleAddress,account) =>{
    const value = saleInfo.startSale;
    const saleContact = await UseSale(saleAddress);
    const data = saleContact.methods.startPresale(value).send({from: account});
    await toast.promise(data, {
        loading: 'Manual Start Sale event ...',
        success: 'Sale Started Successfully',
        error: 'Error ! When Starting sale',
    }, {
        style: {
        minWidth: '300px',
        minHeight: '55px'
        }
    }
    );

}

export const updateStopEvent = async (saleAddress,account) =>{
    const saleContact = await UseSale(saleAddress);
    const data = saleContact.methods.closePresale().send({from: account});
    await toast.promise(data, {
        loading: 'Manual Stop Sale event ...',
        success: 'Sale Stopped Successfully',
        error: 'Error ! When Stopping sale',
    }, {
        style: {
        minWidth: '300px',
        minHeight: '55px'
        }
    }
    );
}

export const getUnsold = async (saleAddress,account) =>{
    const saleContact = await UseSale(saleAddress);
    const data = saleContact.methods.getUnsoldTokens().send({from: account});
    await toast.promise(data, {
        loading: 'Withraw Un Sold Tokens ...',
        success: 'Withdrawn Successfully',
        error: 'Error ! When Withdraw',
    }, {
        style: {
        minWidth: '300px',
        minHeight: '55px'
        }
    }
    );

}

export const withdrawBNB = async (saleAddress,account) =>{
    const saleContact = await UseSale(saleAddress);
    const data = saleContact.methods.withdrawBNB().send({from: account});
    await toast.promise(data, {
        loading: 'Withraw BNB ...',
        success: 'Withdrawn BNB Successfully',
        error: 'Error ! When Withdraw BNB',
    }, {
        style: {
        minWidth: '300px',
        minHeight: '55px'
        }
    }
    );

}

export const SetWhitelisted = async (saleAddress,value,account) => {
    const saleContact = await UseSale(saleAddress);
    const data = saleContact.methods.setWhitelist(value).send({from: account});

    await toast.promise(data, {
        loading: Boolean(value) ? 'Enabling Whitelist ...' : 'Disabling Whitelist ...',
        success: Boolean(value) ? 'Whitelist Enabled' : 'Whitelist Disabled',
        error: 'Error ! When Whitelisting',
    }, {
        style: {
        minWidth: '300px',
        minHeight: '55px'
        }
    }
    );
}


export const Finalise = async (saleAddress,account) =>{
    const saleContact = await UseSale(saleAddress);
    const data = saleContact.methods.finalizeSale().send({from: account});
    await toast.promise(data, {
        loading: 'Finalizing the sale ...',
        success: 'Users can Claim their Tokens Now !',
        error: 'Error ! When Finalising',
    }, {
        style: {
        minWidth: '300px',
        minHeight: '55px'
        }
    }
    );

}

export const updateTokenInfo = async (saleInfo,saleAddress,account) =>{
    const DataFromSale = await getSaleInfoCard(saleAddress);
    let value = [];
    value.push(saleInfo.description && saleInfo.description ? saleInfo.description : DataFromSale.description);
    value.push(saleInfo.website && saleInfo.website ? saleInfo.website : DataFromSale.social[0]);
    value.push(saleInfo.twitter  && saleInfo.twitter ? saleInfo.twitter : DataFromSale.social[1]);
    value.push(saleInfo.telegram && saleInfo.telegram ? saleInfo.website : DataFromSale.social[2]);
    value.push(saleInfo.logo && saleInfo.logo ? saleInfo.logo : DataFromSale.logo);

    console.log("Data : ",value)

    const saleContact = await UseSale(saleAddress);
    const data = saleContact.methods.updateTokenInfo(value).send({from: account});
    await toast.promise(data, {
        loading: 'Updating ...',
        success: 'Data Updated Successfully',
        error: 'Error ! When Updating sale data',
    }, {
        style: {
        minWidth: '300px',
        minHeight: '55px'
        }
    }
    );

}

export const updateVestingInfo = async (saleInfo,saleAddress,account) =>{
    const DataFromSale = await getSaleInfoCard(saleAddress);
    const isvest = saleInfo.isVested && saleInfo.isVested ? saleInfo.isVested : DataFromSale.isVested;
    const vestPercent = saleInfo.vestingPercent && saleInfo.vestingPercent ? saleInfo.vestingPercent*100 : DataFromSale.vestingPercent;
    const vestInterval = saleInfo.vestingInterval && saleInfo.vestingInterval ? saleInfo.vestingInterval*ONEDAYINSECONDS : DataFromSale.vestingInterval;

    const saleContact = await UseSale(saleAddress);
    const data = saleContact.methods.setVestingInfo(isvest,vestInterval,vestPercent).send({from: account});
    await toast.promise(data, {
        loading: 'Updating ...',
        success: 'Data Updated Successfully',
        error: 'Error ! When Updating sale data',
    }, {
        style: {
        minWidth: '300px',
        minHeight: '55px'
        }
    }
    );

}

export const updatePancakeInfo = async (saleInfo,saleAddress,account) =>{
    const DataFromSale = await getSaleInfoCard(saleAddress);
    const saleContact = await UseSale(saleAddress);
    const liquidityPercentage = await saleContact.methods.liquidityPercent().call()
    const ispancake = saleInfo.isPancake && saleInfo.isPancake ? saleInfo.isPancake : DataFromSale.isPancake;
    const pancakeRate = saleInfo.pancakeRate && saleInfo.pancakeRate ? saleInfo.pancakeRate : DataFromSale.pancakeRate;
    const unlockOn = saleInfo.lpUnlockon && saleInfo.lpUnlockon ? saleInfo.lpUnlockon : DataFromSale.lpUnlockon;
    const percent = saleInfo.liquidityPercent && saleInfo.liquidityPercent ? saleInfo.liquidityPercent : liquidityPercentage;
    const data = saleContact.methods.setPancakeInfo(ispancake,pancakeRate,percent,unlockOn).send({from: account});
    await toast.promise(data, {
        loading: 'Updating ...',
        success: 'Data Updated Successfully',
        error: 'Error ! When Updating sale data',
    }, {
        style: {
        minWidth: '300px',
        minHeight: '55px'
        }
    }
    );
}

export const addWhitelistMembers = async (listOfMembers,saleAddress,account) =>{

    var userList = [];
    var bnbvalues = [];

    Object.keys(listOfMembers).forEach(function (key) {
            if((listOfMembers[key].user).length == 42){
                userList.push(listOfMembers[key].user);
                const amount = (parseFloat(listOfMembers[key].bnbvalue) * parseInt(10 ** 18)).toString();
                bnbvalues.push(amount);
            }
    })
      
    const saleContact = await UseSale(saleAddress);
    const data = saleContact.methods.addMultipleWhitelistedAddresses(userList,bnbvalues).send({from: account});
    await toast.promise(data, {
        loading: 'Adding Whitelist Members ...',
        success: 'User(s) Whitelisted Successfully',
        error: 'Error ! When Whitelisting Users',
    }, {
        style: {
        minWidth: '300px',
        minHeight: '55px'
        }
    }
    );

}

export const UploadCSVWhitelist = async(CSVdata,saleAddress,account) =>{
    var userList = [];
    var bnbvalues = [];
    await CSVdata.map(async(index)=>{
        var user = Object.values(index);
        const valid = await IsValidAddress(user[0]);
        if(!valid){
            toast.error(`Non Valid Address (${user[0]}) Ignored !`,
            {
                style: {
                minWidth: '600px',
                minHeight: '55px'
                }
            });
            return false;
        }
        const amount =toFixedNumber(parseFloat(user[1]) * 10 ** 18)
        console.log("User :", userList)
        console.log("BNB :", bnbvalues)
        if(user[0].length == 42){
        userList.push(user[0]);
        bnbvalues.push(amount.toString());
        }
    });
    if(userList.length > 200){
        toast.error('Maximum 200 entries is restricted !', {
            style: {
            minWidth: '300px',
            minHeight: '55px'
            }
        })
        return false;
    }
    const saleContact = await UseSale(saleAddress);
    const data = saleContact.methods.addMultipleWhitelistedAddresses(userList,bnbvalues).send({from: account});
    await toast.promise(data, {
        loading: 'Adding Whitelist Members ...',
        success: 'User(s) Whitelisted Successfully',
        error: 'Error ! When Whitelisting Users',
    }, {
        style: {
        minWidth: '300px',
        minHeight: '55px'
        }
    }
    );
}