import React, { Component } from 'react';
import { useContext, useEffect, useState } from "react";

import Header from '../Header';

import Footer from '../Footer';
import Walletmodal from "../Walletmodal";

import Createtab from "./Createtab";
import Withouttab from "./Withouttab";
import { getAccount } from '../../hooks/useAccount'




import Web3 from "web3";

import {  Tab, Col, Nav, Row,InputGroup, FormControl } from 'react-bootstrap';
import '../../css/styles.css';

import favicon from "../../images/favicon.png"


class Create extends Component {
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
      // this.showLoader();
      this.hideLoader();
       this.setState({ accountInfo: getAccount() });
    }

    constructor(props) {
        super(props);
        this.state = {          
            walletModal: false,
            accountInfo: ''
        };
    }
 
    render() {
        
      const location = this.props.location.pathname.split('/')[1];

      const { walletModal} = this.state

      
      
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


<div className='mt-5 tab_div'>
            <Tab.Container  defaultActiveKey="first">
  <Row>
    <Col lg={12}>
      {/* <Nav variant="pills" className="">
        <Nav.Item>
          <Nav.Link eventKey="first" id="first">
          <p className='mb-0'>With Token</p>

          </Nav.Link>
        </Nav.Item> */}
        {/* <Nav.Item>
          <Nav.Link eventKey="second" id="second">
          <p className='mb-0'>Without Token</p>
   
          </Nav.Link>
       
        </Nav.Item> */}

      {/* </Nav> */}
    </Col>
    <Col lg={12} className="img_center_lg">
      <Tab.Content>
        <Tab.Pane eventKey="first">

          <Createtab />

        </Tab.Pane>
        {/* <Tab.Pane eventKey="second">

        <Withouttab />
        
        </Tab.Pane> */}

    
       
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
           

            <Footer />
        </div>
        </div>
        )
    }
}

export default Create