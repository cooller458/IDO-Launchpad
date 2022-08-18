import React, { Component } from 'react';
import { useContext, useEffect, useState } from "react";
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Walletmodal from "./Walletmodal";
import Settings from './Adminpanel/Settings';
// import 'font-awesome/css/font-awesome.min.css';

import { metamaskWallet , walletConnet } from '../hooks/useWallet';
import { getAccount, getChainId, setChainId } from '../hooks/useAccount'

import bsc from "../images/bsc.png"
import bsctestnet from "../images/bsctestnet.png"
import { getProxyOwner } from '../hooks/useContract';
import { UseProvider} from '../hooks/useWeb3'
import { CHAINS } from '../config/env'
import policy from "../images/Cookie-Policy.pdf"




class Header extends Component 
{
    darkTheme()
    {
        document.body.classList.remove('light_theme'); 
        document.body.classList.add('dark_theme'); 
        document.getElementById("sun_icon").classList.remove('active'); 
        document.getElementById("moon_icon").classList.add('active'); 
        // document.getElementById("sun_icon_mob").classList.remove('active'); 
        // document.getElementById("moon_icon_mob").classList.add('active'); 
        localStorage.setItem("theme",'dark_theme');

       
    }
    lightTheme()
    {
        document.body.classList.remove('dark_theme'); 
        document.body.classList.add('light_theme'); 
        document.getElementById("moon_icon").classList.remove('active'); 
        document.getElementById("sun_icon").classList.add('active');
        // document.getElementById("moon_icon_mob").classList.remove('active'); 
        // document.getElementById("sun_icon_mob").classList.add('active');
        localStorage.setItem("theme",'light_theme');

        
    }

    darkThemeMobile()
    {
        document.body.classList.remove('light_theme'); 
        document.body.classList.add('dark_theme'); 
       
        document.getElementById("sun_icon_mob").classList.remove('active'); 
        document.getElementById("moon_icon_mob").classList.add('active'); 
        localStorage.setItem("theme",'dark_theme');

       
    }
    lightThemeMobile()
    {
        document.body.classList.remove('dark_theme'); 
        document.body.classList.add('light_theme'); 
      
        document.getElementById("moon_icon_mob").classList.remove('active'); 
        document.getElementById("sun_icon_mob").classList.add('active');
        localStorage.setItem("theme",'light_theme');

        
    }

  
   


    showMobile()
    {
      
        //  document.getElementById("mobile_nav_item").classList.toggle('active');
        document.getElementById("mobile_nav_item").classList.toggle("left_stye");
        document.getElementById("mobileLayer").classList.toggle('active');
        document.getElementById("burger").classList.toggle('clicked');  
        document.getElementById("burger").classList.toggle("burger_stye")   
        
    }

    

    
   
   
    
   constructor(props)
   {
       super(props);
       this.state = {location:false,
        walletModal: false,
        accountInfo: "",
        walletConnect: "",
        proxyOwner: "",
        currentChain: 1,
        settingModal: false
    }
   }
  
  componentDidMount()
   {
    window.addEventListener('scroll', function() {
        if(window.pageYOffset >50)
        {
            document.getElementById("header").classList.add('header-scrolled');
            
        }
        else{
            document.getElementById("header").classList.remove('header-scrolled');

        }
    });
    if(!(localStorage.getItem("theme") == "dark_theme"))
    {
        document.body.classList.remove('dark_theme'); 
        document.body.classList.add('light_theme'); 
        document.getElementById("moon_icon").classList.remove('active'); 
        document.getElementById("sun_icon").classList.add('active');
        document.getElementById("moon_icon_mob").classList.remove('active'); 
        document.getElementById("sun_icon_mob").classList.add('active');
        localStorage.setItem("theme",'light_theme');
    }
    else
    {
        document.body.classList.remove('light_theme'); 
        document.body.classList.add('dark_theme'); 
        document.getElementById("sun_icon").classList.remove('active'); 
        document.getElementById("moon_icon").classList.add('active'); 
        document.getElementById("sun_icon_mob").classList.remove('active'); 
        document.getElementById("moon_icon_mob").classList.add('active');
        localStorage.setItem("theme",'dark_theme');  
    }
    this.setState({ accountInfo: getAccount() });
    this.setState( { currentChain: getChainId() });
    this.getOwner();
   }

   onDismiss(){
       this.setState({ walletModal: false,settingModal: false });
   }

   getOwner = async() =>{
       const owner = await getProxyOwner();
       this.setState({ proxyOwner: owner });
       console.log("owner : ",owner)
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
        window.location.reload()
        console.log("logout")
    }
  

    render() {
    const {location} = this.props;
    const {walletModal,accountInfo,proxyOwner,settingModal } = this.state


		return (


           <div>

                          
<div id="mobileLayer">
                   <div id="header" className="fixed-top-navbar py-2 py-lg-2">
               <div className="container container_custom" id="mobileshow">
               <header className={`${location}`}>
        <Link to="/"><span className='logo_img_sm'/></Link>

<div className='d-none d-lg-block web_menu'>
<div className="d-flex align-items-center justify-content-between py-3 header_flex">

  
      
       <div className='d-flex align-items-center nav_parnt'>
<div className='nav_parnt_1'>
<Link to="/projects" className="get-started-btn get-started-btn">
            <i className="fa fa-fire pr-2"></i>Projects</Link>


            <Link to="/create" className="get-started-btn ml-3">
            <i className="fa fa-plus-circle pr-2"></i>Create</Link>

            {/* <Link to="/comingsoon" className="get-started-btn ml-3">
            <i className="fas fa-coins pr-2"></i>Staking</Link> */}
            { proxyOwner == getAccount() ? 
             (<><Link to="/requests" className="get-started-btn ml-3">
             <i className="fa fa-paper-plane pr-2"></i>Requests</Link>
              <a onClick={()=>this.setState({ settingModal: true })}  className="get-started-btn ml-3">
              <i className="fas fa-cog pr-2"></i></a>
              </>):
              <a href="https://swap.balancenetwork.io/stake" target="_blank" className="get-started-btn ml-3">
              <i className="fas fa-coins pr-2"></i>Staking</a>
            }
           
           {/* <a onClick={()=>this.setState({ settingModal: true })} className="get-started-btn ml-3">
              <i className="fas fa-cog pr-2"></i></a> */}

       {/* <Dropdown className="dropdown_yelo">
       <Dropdown.Toggle variant="success" id="dropdown-basic">
  <img src={this.state.currentChain && CHAINS[this.state.currentChain].IMAGE} /> { this.state.currentChain && CHAINS[this.state.currentChain].NAME }
  </Dropdown.Toggle>

  <Dropdown.Menu className='dd_meu_header'>
            { CHAINS.map((index,i)=>
    <Dropdown.Item onClick={()=> setChainId(i)}> <img src={index.IMAGE} /> {index.NAME}</Dropdown.Item>)
            }
  </Dropdown.Menu>
</Dropdown> */}


{/* <Link to="/staking" className="get-started-btn ml-3">
            <i className="fa fa-superpowers pr-2"></i>Staking</Link> */}
            


       
</div>
<div className='nav_parnt_2'>
    <div className="nav-menu">
          <ul className="pl-0 mb-0">
         
            {(accountInfo == "" || localStorage.getItem("accountInfo")== null)?
            <button className="get-started-btn" onClick={() => this.setState({ walletModal: true })}>
            <i className="fa fa-paperclip pr-2"></i>Connect Wallet</button>:
           <Link to={`/profile/${accountInfo}`} className="get-started-btn" ><i className="fa fa-wallet pr-2"></i>
            {`${accountInfo.substring(0, 5)}...${accountInfo.substring(38,42)}`}</Link>}
          
        </ul>
    </div>
    <Dropdown className="dropdown_yelo ml-3 p-0">
       <Dropdown.Toggle variant="success" id="dropdown-basic" className='p-5'>
   Info
  </Dropdown.Toggle>
  <Dropdown.Menu className='dd_meu_header'>

      
 
        <a href="https://docs.balancenetwork.io/views/About/privacypolicy.html" target="_blank" className="dropdown-item">Cookie Policy</a>
  

        <a href="https://docs.balancenetwork.io/views/whitepaper.html" target="_blank" className="dropdown-item">Whitepaper</a>
 

            
  </Dropdown.Menu>
</Dropdown>
    {/* {((accountInfo != "" || localStorage.getItem("accountInfo")!= null)) && this.state.proxyOwner == localStorage.getItem("accountInfo") ? */}
     
    <div className="theme-icon pl-3">
            <div className="theme-btn">
                <span className="cursor_pointer icon_black fas fa-sun" id="sun_icon" onClick={this.lightTheme}></span>
         
            <span className="px-2 text-white slash_icon">/</span>
            <span className="cursor_pointer icon_black fa fa-moon-o active" id="moon_icon" onClick={this.darkTheme}></span>
           </div> </div>

           
    </div>
     

</div>
   
    

</div>
</div>

<button type="button" className="mobile-nav-toggle d-lg-none" onClick={this.showMobile}><i className="fa fa-bars" aria-hidden="true" id="burger"></i></button>
<nav className="mobile-nav d-lg-none" id="mobile_nav_item">
    <div className='container container_custom'>
<div className='d-flex align-items-center nav_parnt'>



    <div className='nav_parnt_1'>
       {/* <Dropdown className="dropdown_yelo mr-3">
  <Dropdown.Toggle variant="success" id="dropdown-basic">
  <img src={this.state.currentChain && CHAINS[this.state.currentChain].IMAGE} /> { this.state.currentChain && CHAINS[this.state.currentChain].NAME }
  </Dropdown.Toggle>

  <Dropdown.Menu className='dd_meu_header'>
            { CHAINS.map((index,i)=>
    <Dropdown.Item onClick={()=> setChainId(i)}> <img src={index.IMAGE} /> {index.NAME}</Dropdown.Item>)
            }
  </Dropdown.Menu>
</Dropdown> */}

<Link to="/projects" className="get-started-btn">
            <i className="fa fa-fire pr-2"></i>Project</Link>

            <Link to="/create" className="get-started-btn">
            <i className="fa fa-plus-circle pr-2"></i>Create</Link>

            {/* <Link to="/comingsoon" className="get-started-btn">
            <i className="fas fa-coins  pr-2"></i>Staking</Link> */}

            <a href="https://swap.balancenetwork.io/stake" target="_blank" className="get-started-btn">
            <i className="fas fa-coins pr-2"></i>Staking</a>

            <div className='nav_parnt_2'>
    <div className="nav-menu">
          <ul className="pl-0 mb-0">
         
            {(accountInfo == "" || localStorage.getItem("accountInfo")== null)?
            <button className="get-started-btn" onClick={() => this.setState({ walletModal: true })}>
            <i className="fa fa-paperclip pr-2"></i>Connect Wallet</button>:
            <button className="get-started-btn" onClick={() => this.logOut()}><i className="fa fa-wallet pr-2"></i>
            {`${accountInfo.substring(0, 5)}...${accountInfo.substring(38,42)}`}</button>}
          
        </ul>
    </div>
    
   
         
   
    </div>

    <Dropdown className="dropdown_yelo mr-3 mt-3">
  <Dropdown.Toggle variant="success" id="dropdown-basic">
  Info
  </Dropdown.Toggle>

  <Dropdown.Menu className='dd_meu_header'>
        
  <a href={policy} target="_blank" className="dropdown-item">Cookie Policy</a>
  

  <a href="#" target="_blank" className="dropdown-item">Whitepaper</a>
       
  </Dropdown.Menu>
</Dropdown>

            <div className="theme-icon pl-3">
            <div className="theme-btn">
                <span className="cursor_pointer icon_black fas fa-sun" id="sun_icon_mob" onClick={this.lightThemeMobile}></span>
         
            <span className="px-2 text-white slash_icon">/</span>
            <span className="cursor_pointer icon_black fa fa-moon-o active" id="moon_icon_mob" onClick={this.darkThemeMobile}></span>
           </div> </div>
{/* <Link to="/staking" className="get-started-btn">
            <i className="fa fa-superpowers pr-2"></i>Staking</Link> */}

</div>


   

</div>
           </div>
</nav>
{walletModal && <Walletmodal connect={"string"} onDismiss={()=>this.onDismiss()} /> }
{settingModal && <Settings connect={"string"} onDismiss={()=>this.onDismiss()} /> }


</header>
</div>
</div>
</div>

           </div>
        );
    }
}



export default Header