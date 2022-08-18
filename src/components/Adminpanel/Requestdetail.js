import React, { Component } from 'react';
import { useContext, useEffect, useState } from "react";

import Header from '../Header';
import Footer from '../Footer';

import profile from "../../images/prof.jpg"
import favicon from "../../images/favicon.png"
import { UseProvider } from '../../hooks/useWeb3';
import { getAccount } from '../../hooks/useAccount';
import { getRequestsInfo } from '../../hooks/useProjects';



class Requestdetail extends Component
{
    
    showLoader()
    {
      document.getElementsByTagName("body")[0].classList.add("overflow_hidden");
      document.getElementById("logo_overlay").style.opacity = 0;
      document.getElementById("loader_div").classList.remove("d-none");
      document.getElementById("loader_div").classList.add("d-block");
  
  
    }
  
    hideLoader()
    {
      document.getElementsByTagName("body")[0].classList.remove("overflow_hidden");
      document.getElementById("logo_overlay").style.opacity = 1;
      document.getElementById("loader_div").classList.remove("d-block");
      document.getElementById("loader_div").classList.add("d-none");
  
  
  
    }

    logOut = async () =>{
        this.setState({accountInfo : ""})
        localStorage.removeItem("accountInfo")
        if(localStorage.getItem("walletconnect")!=null)
     {
        const provider = await UseProvider();
        await provider.disconnect()
     }
      //  this.setState({accountModal: false})
        window.location.href="/"
        console.log("logout")
    }
    
      componentDidMount()
      {
         this.showLoader();
        this.checkAccount();
        this.loadData();
        this.hideLoader();
        
      }

      onDismiss(){
        this.setState({ requestModal: false });
    }

    checkAccount(){
        if(this.props.location.pathname.split('/')[2] != getAccount())
            window.location.href="/"
    }

    async loadData(){
        const myrequest = await getRequestsInfo();
        console.log("Request : ",myrequest)
        this.setState({ requests: myrequest });
    }

    constructor(props) {
        super(props);

        this.state = {
            accountInfo : this.props.location.pathname.split('/')[2],
            requests: []

        }
       
        
    }

  

    render() {
        
        
        const { accountInfo,requests } = this.state 
     
        
      return (

        <div id="loader_main">
        <div id="loader_div">
        <span className="spin_round">
    
        </span>
        <img src={favicon} className="logo_load" />
      </div>
            <div className='logo_overlay' id="logo_overlay">
    
               <Header />
               <div className="whole_sec">
               <div className="container container_custom mt-5 pt-3">
                <badge className="badge badge-fill-yellow mr-3">
                <i className="fa fa-credit-card mr-2" aria-hidden="true"></i>{`${accountInfo}`}
                </badge>
                <a href={`https://bscscan.com/address/${accountInfo}`} target="_blank" className='mr-3 request_a'>View on BscScan 
                <i className="fa fa-external-link ml-2" aria-hidden="true"></i>
                
                </a>

                <a href="#" onClick={this.logOut.bind(this)} className='request_a'> Logout
                <i className="fa fa-power-off ml-2" aria-hidden="true"></i>
                
                </a>

                <div className='card_sec mt-5'>
                    <div className='card card_req mr-3'>
                        <div className='card-body'>
                            <p className='req_head  text-center'>My Pending Requests</p>
                            <p className='req_val  text-center'>{requests && requests.length}</p>

                        </div>
                    </div>
                  
                </div>

                <div className='mt-5'>
                    { requests && requests.length > 0 && requests.map((index)=> 
                    <div className={ index._isActive ? `card card_rect card_success mb-2` : `card card_rect card_warning mb-2`}>
                    <div className='card-body'>
                    <div className="media align-items-center">
                        <img className="align-self-center mr-3 mr-md-4 img-fluid" src={favicon} alt="Generic placeholder image" />
                        <div className="media-body">
                            <p className="mb-0 card_address align-self-center">{index._name}</p>
                        </div>
                        </div>
                    </div>
                    </div>)
    }
                   
                    </div>
        </div>
    
                 
                </div>
                <Footer />
            </div>
            </div>
       
      )
    }

}


export default Requestdetail