import React, { Component } from 'react';
import { useContext, useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';

import wall1 from "../images/wall1.png";
import wall2 from "../images/wall2.png";
import wall3 from "../images/wall3.png";

import { MetamaskWallet,WalletConnect } from "../hooks/useWallet"
import Web3 from 'web3';


class Walletmodal extends Component
{
    constructor(props) {
        super(props);
        this.state = {          
            walletModal: true,
           
        };
    }


        sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

   
    MetaMask = async ()=>{
        await MetamaskWallet()
        await this.sleep(1000)
       this.setState({accountInfo: localStorage.getItem("accountInfo")});
       console.log("Account : ", localStorage.getItem("accountInfo"));
        if(localStorage.getItem("accountInfo")){
            this.setState({ walletModal : false})
            window.location.reload()
        }
        
    }

    enableWallet = async () =>{
       const provider = await WalletConnect()
        this.setState({walletConnect: provider})
        this.setState({accountInfo: localStorage.getItem("accountInfo")});
        this.setState({ walletModal : false})
        if(localStorage.getItem("accountInfo")){
            this.setState({ walletModal : false})
            window.location.reload()
        }
     
    }

  



    render() {
        
  
        const {walletModal} = this.state

        
      return (
<Modal className="wallet-modal" show={walletModal} centered>
                        <Modal.Header className="pb-0">
                            <div>
                                <h3 className="sec-head ">Connect to Wallet</h3>
                            </div>
                            <button type="button" class="close" onClick={() => this.props.onDismiss()}><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>

                        </Modal.Header>
                        <Modal.Body className="select-wallet text-center pt-0">

                            <div className="wallet-lists">
                                <ul>
                                    <li onClick={this.MetaMask}>
                                        <div className="img">
                                            <img src={wall1} alt="img" />
                                        </div>
                                        <div className="wal-option">
                                            <h3 className="side-head-li mb-0"> Metamask</h3>

                                        </div>
                                    </li>
                                    <li onClick={this.enableWallet}>
                                        <div className="img">
                                            <img src={wall2} alt="img" />
                                        </div>
                                        <div className="wal-option">
                                            <h3 className="side-head-li mb-0">Wallet Connect</h3>
                                        </div>
                                    </li>
                                    <li onClick={this.MetaMask}>
                                        <div className="img">
                                            <img src={wall3} alt="img" />
                                        </div>
                                        <div className="wal-option">
                                            <h3 className="side-head-li mb-0"> Trust Wallet</h3>

                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </Modal.Body>
                    </Modal>
      )
    }

}


export default Walletmodal