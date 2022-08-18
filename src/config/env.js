import bsc from "../images/bsc.png"
import bsctestnet from "../images/bsctestnet.png"
import eth from "../images/eth.png"
import ropsten from "../images/ropsten.png"
export const RPC_URL = "https://bsc-dataseed1.binance.org/";
export const CHAIN_ID = 56;
  
// export const RPC_URL = "https://data-seed-prebsc-1-s1.binance.org:8545/";
//  export const CHAIN_ID = 97;
 export const ROUTER = "0x10ED43C718714eb63d5aA57B78B54704E256024E";

 export const ONEDAYINSECONDS = 86400;


 export const CHAINS = [
    {
        NAME: "BSC",
        RPC_URL:"https://bsc-dataseed1.binance.org/",
        CHAIN_ID:56,
        IMAGE: bsc,
        ROUTER: "0x10ED43C718714eb63d5aA57B78B54704E256024E" //pancake router
    },
   {
        NAME: "BSC-TEST",
        RPC_URL:"https://data-seed-prebsc-1-s1.binance.org:8545/",
        CHAIN_ID:97,
        IMAGE: bsctestnet,
        ROUTER: "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3"
    }
//    ,
//    {
//         NAME: "ETH",
//         RPC_URL:"https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
//         CHAIN_ID:56,
//         IMAGE: eth,
//         ROUTER: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
//     },
//   {
//         NAME: "ROPSTEN",
//         RPC_URL:"https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
//         CHAIN_ID:3,
//         IMAGE: ropsten,
//         ROUTER: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
//     }
];