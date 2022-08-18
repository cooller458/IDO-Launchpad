import React, { Component } from 'react';
import { useContext, useEffect, useState } from "react";

import Header from '../Header';

import Footer from '../Footer';
import Walletmodal from "../Walletmodal";
import Buymodal from "./Buymodal";
import Singlesalecard from "./Singlesalecard";
import Poolinformation from "./Poolinformation";
import Tokeninformation from "./Tokeninformation";
import Allocation from "./Allocation";
import Admin from "./Admin";


import Web3 from "web3";

import {  Tab, Col, Nav, Row } from 'react-bootstrap';
import '../../css/styles.css';

import coin from "../../images/coin.png"
import favicon from "../../images/favicon.png"
import { getSaleInfo,getSaleInfoCard, GetSalePerAccount } from '../../hooks/useContract'
import { getAccount, getAllocationInfo } from '../../hooks/useAccount';
import {addTokentoMetamask} from '../../hooks/useWeb3'
import { isSaleLive, isUpcoming,isActivated } from '../../hooks/useProjects';

import Countdown from 'react-countdown';


const renderer = ({ days, Month, Year, hours, minutes, seconds, completed }) => {
  if (completed) {
    return  <div>
    <div>{days}d </div>
    <div>{hours}h</div>
    <div>{minutes}m</div>   
    <div>{seconds}s </div>         
 </div>
  } else {
    // Render a countdown
    return <div>
              {/* <span>{days}<span>Days</span> </span>
              <span>{hours}<span>Hours</span></span>
              <span>{minutes}<span>Minuits</span></span>   
              <span>{seconds}<span>Seconds</span> </span>    */}
               <div>{days}d </div>
    <div>{hours}h</div>
    <div>{minutes}m</div>   
    <div>{seconds}s </div>
          </div>;
  }
};


class Singlesale extends Component {
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
  
    componentDidMount()
    {
     //  this.showLoader();
     // this.hideLoader();
      this.loadData()
    }

    

    constructor(props) {
        super(props);
        this.state = {          
          
            buyModal : false,
            walletModal: false,
            saleAddress: this.props.location.pathname.split('/')[2],
            saleInfo: {},
            userInfo: {},
            allocations: []
         
        };
      
    }


    async loadData(){
      this.showLoader();
      const isactive = await isActivated(this.state.saleAddress);
      if(!isactive)
        return false;
      const saleDetail = await getSaleInfoCard(this.state.saleAddress);
      this.setState({ saleInfo: saleDetail });
      console.log("Sale  :",saleDetail)
      if(localStorage.getItem("accountInfo")){
        const user = await GetSalePerAccount(localStorage.getItem("accountInfo"),this.state.saleAddress);
       this.setState({userInfo: user});
       console.log("User : ",user);
       if(saleDetail.isClaimable){
        const allocated = await getAllocationInfo(user.actualBalance,user.userClaimbale,saleDetail.vestingInterval,saleDetail.vestingPercent,user.initialClaim);
       this.setState({ allocations: allocated });
       console.log("allcations L ",allocated)
       }
       
      }
      this.hideLoader();

    }

    async refreshData(){
      const saleDetail = await getSaleInfoCard(this.state.saleAddress);
      this.setState({ saleInfo: saleDetail });
      console.log("On Update Sale  :",saleDetail)
      if(localStorage.getItem("accountInfo")){
        const user = await GetSalePerAccount(localStorage.getItem("accountInfo"),this.state.saleAddress);
       this.setState({userInfo: user});
       if(saleDetail.isClaimable){
        const allocated = await getAllocationInfo(user.actualBalance,saleDetail.vestingInterval,saleDetail.vestingPercent,user.initialClaim);
       this.setState({ allocations: allocated });
       }
       
      }
    }

    AddTokenMetamask(){
      addTokentoMetamask(this.state.saleInfo.tokenAddress,this.state.saleInfo.symbol,this.state.saleInfo.decimals,this.state.saleInfo.logo)
    }
 
    render() {
        
     
      const location = this.props.location.pathname.split('/')[2];
      const {buyModal, walletModal,saleAddress,saleInfo} = this.state
          
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
           {/* ongoing_sec */}
               <div className='ongoing_sec'>
           
           
            <div className="inner_bg mt-4">
            <div className="container container_custom">


            <div className='row'>
            <div className='col-12 col-lg-6 mb-4'>
            <div>
                            <img src={saleInfo && saleInfo.logo} alt={saleInfo && saleInfo.symbol} className='round_img'/>
                            </div>
                            <p className='text-white font_35 mb-0'>{saleInfo && saleInfo.name}</p>
                            <p className='mt-2 mb-0'>
                            
                                {saleInfo && isSaleLive(saleInfo.startTime,saleInfo.endTime,saleInfo.isPresaleOpen)  ?
                                <span className="badge infobtn badge-green badge-green-big mr-3">
                                    <span className='green_dot'></span>
                                    <span className='green_txt'>Live</span>
                                </span>: ( isUpcoming(saleInfo.startTime) ? 
                                   <span className="badge upbtn badge-green badge-green-big mr-3">
                                     <i className="fa fa-fire" aria-hidden="true"></i>
                                    <span className='green_txt'>Upcoming</span>
                                </span>: <span className="badge dangerbtn badge-green badge-green-big mr-3">
                                <i className="fa fa-flag-checkered" aria-hidden="true"></i>
                                    <span className='green_txt'>Finished</span>
                                </span>)
                                }
                                { saleInfo && saleInfo.isWithoutToken ?
                                    <span className="badge badge-yellow-fill badge-yellow-fill-big mt-2">
                                    <span className='blk_txt'>{saleInfo && saleInfo.symbol}</span>
                                    </span>:
                                     <span className="badge badge-yellow-fill badge-yellow-fill-big mt-2">
                                     <span className='blk_txt'>{saleInfo && saleInfo.symbol}</span>
                                     </span>
                                }
                                </p>
                                <p className='text-white mt-3 line_he_big word_brk_addrs'> {saleInfo && saleInfo.description} </p>

                                <p className='mt-4'>
                                <a className="get-started-btn-fill mr-3" href={saleInfo && saleInfo.social && saleInfo.social[0]} target="_blank" >Website &nbsp;<i className="fa fa-external-link "></i></a>
                                <button className="get-started-btn btn_join" onClick={() => this.setState({ buyModal: true })}>Join</button>

                                </p>
                                {/* <p class="mt-2 countbtn salecount  mb-0">
                    <span class="badge upbtn badge-green">
                        <span class="green_dot"></span>
                        <span class="green_txt">
                        <div className='countdown d-flex align-items-center'>
                    Opens in &nbsp; <Countdown date={Date.now() + 1687600000} renderer={renderer} />
                </div> 
                            </span></span>
                </p> */}
                  </div>
                <div className='col-12 col-lg-6'>
                  <Singlesalecard userData={this.state.userInfo} saleData={this.state.saleInfo} onUpdate={this.refreshData.bind(this)} value="string" />
                </div>
               
            </div>
<div className='mt-5 tab_div'>
            <Tab.Container  defaultActiveKey="first">
  <Row>
    <Col lg={12}>
      <Nav variant="pills" className="">
        <Nav.Item>
          <Nav.Link eventKey="first" id="first">
          <p className='mb-0'>Project Details</p>

          </Nav.Link>
         </Nav.Item>
         { saleInfo && !saleInfo.isWithoutToken? 
        <Nav.Item>
          <Nav.Link eventKey="second" id="second">
          <p className='mb-0'>Your Allocation</p>
   
          </Nav.Link>
                               
        </Nav.Item>:<></>
          }
         { saleInfo && saleInfo.owner== getAccount()? 
        <Nav.Item>
          <Nav.Link eventKey="third" id="third">
          <p className='mb-0'>Admin</p>
   
          </Nav.Link>
        
        </Nav.Item>
          :<></>
        } 
      </Nav>
    </Col>
    <Col lg={12} className="img_center_lg">
      <Tab.Content>
        <Tab.Pane eventKey="first">
            <div className="tab_img mt-5">
                <div className='row'>
                    <div className='col-12 col-lg-6 mb-4'>
                      <Poolinformation saleInfo={this.state.saleInfo} value="string" />
                   
                    </div>

                    <div className='col-12 col-lg-6 mb-4'>
                      <Tokeninformation saleData={this.state.saleInfo} />
               
                    </div>
                </div>
               
        </div>
        </Tab.Pane>
        <Tab.Pane eventKey="second">
        <div className="tab_img mt-5">

        <div className='row'>
                    <div className='col-12 col-lg-12 mb-4'>
                        <div className='text-right mb-4'>
                          { this.state.saleInfo.isWithoutToken ? <></>:
                        <button onClick={this.AddTokenMetamask.bind(this)} className="get-started-btn-fill">Add Token to Metamask</button>
                          }
                        </div>

                        <Allocation userData={this.state.userInfo} allocationData={this.state.allocations} saleAddress={this.state.saleAddress} saleData={this.state.saleInfo} onUpdate={this.refreshData.bind(this)} />
                
                    </div>

                  
                </div>
        </div>
        </Tab.Pane>
        {/* { saleInfo && saleInfo.owner== getAccount()?  */}
        <Tab.Pane eventKey="third">
        <div className="tab_img mt-5">
        <Admin saleAddress={this.state.saleAddress} onUpdate={this.refreshData.bind(this)} userData={this.state.userInfo} saleData={this.state.saleInfo} />
       
        </div>
        </Tab.Pane> 
       
      </Tab.Content>
    </Col>
  </Row>
</Tab.Container>
</div>
           
                </div>
            </div>
            </div>
            {/* end ongoing_sec */}

             
            </div>
            {walletModal && <Walletmodal connect={"string"} /> }
            {buyModal && <Buymodal userData={this.state.userInfo} saleAddress={this.state.saleAddress} saleData={this.state.saleInfo} onUpdate={this.refreshData.bind(this)} onDismiss={()=> this.setState({ buyModal: false })} connect={"string"} /> }

            <Footer />
        </div>
        </div>
        )
    }
}

export default Singlesale