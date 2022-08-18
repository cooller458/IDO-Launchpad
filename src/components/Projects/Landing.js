import React, { Component } from 'react';
import { useContext, useEffect, useState } from "react";

import Header from '../Header';
import Footer from '../Footer';

import Buycard from "./Buycard";

import Web3 from "web3";
import '../../css/styles.css';

import coin from "../../images/coin.png"
import favicon from "../../images/favicon.png"

import loader from "../../images/loader.gif"
import { getSaleCards, getSaleCardsLimit, getTotalSalesInfo, searchCards, searchSale } from '../../hooks/useProjects';


class Landing extends Component {
   
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
     // this.hideLoader();
     this.loadData();
  
    }
   
    constructor(props) {
      super(props);
      this.state = {  
        proxy: [],        
        totalSales: [],
        onGoingSales: [],
        upComingSales: [],
        isSearch: false,
        searchSale: [],
        search: '',
        interval: 3,
        loadInterval: 3,
        searchInterval: 3,
        searchProxy: [],
        isLoading: false
      };
    }

    sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

    async loadData(){
        this.showLoader();
        const Proxydata = await getTotalSalesInfo();
        this.setState({ proxy : Proxydata })
        const total = await getSaleCardsLimit(Proxydata,0,this.state.interval);
        await this.sleep(1000)
         this.setState({ totalSales: total });   
       
        this.hideLoader();
    }

    async loadMore(){
      console.log("Lad more",this.state.totalSales.length < this.state.proxy.length)
      this.setState({ isLoading: true});
      const newly = await getSaleCardsLimit(this.state.proxy,this.state.interval,this.state.interval+this.state.loadInterval);
      const total = this.state.totalSales.concat(newly);
      await this.sleep(1000)
       this.setState({ totalSales: total,interval: this.state.interval+this.state.loadInterval });
       this.setState({ isLoading: false});   
    }

    async loadSearchMore(){
      console.log("Lad more",this.state.totalSales.length < this.state.proxy.length)
      this.setState({ isLoading: true});
      const newly = await getSaleCardsLimit(this.state.searchProxy,this.state.searchInterval,this.state.searchInterval+this.state.loadInterval);
      const total = this.state.searchSale.concat(newly);
      await this.sleep(1000)
       this.setState({ searchSale: total,searchInterval: this.state.searchInterval+this.state.loadInterval });
       this.setState({ isLoading: false});   
    }

    async handleChange(e){
        if((e.target.value).length > 0){
              if (e.key === 'Enter') {
              console.log("Search : ",e.target.value)
              this.showLoader();
              const searchS = await searchCards(this.state.proxy,e.target.value);
              this.setState({ searchProxy : searchS});
              const data = await getSaleCardsLimit(searchS,0,this.state.searchInterval);
              await this.sleep(1050)
              console.log("Search sale : ",searchS)
              this.setState({ searchSale: data, isSearch: true})
              this.hideLoader();
              }
        }else{
          this.setState({ isSearch: false})
        }
     
    }

    render() {
     

      const location = this.props.location.pathname.split('/')[1];

      const {totalSales,onGoingSales,upComingSales,search,isSearch,searchSale } = this.state
    
      
	return (
    <div id="loader_main">
    <div id="loader_div">
    <span className="spin_round">

    </span>
    <img src={favicon} className="logo_load" />
  </div>
        <div className='logo_overlay' id="logo_overlay">
      

           <Header onUpdate={this.loadData.bind(this)} />
        
           <div className="whole_sec">
           {/* ongoing_sec */}
               <div className='ongoing_sec'>
            <div className="container container_custom">
                <div className='top_heqad_sec'>
                    <div className='text-right'>
                <input className="form-control searc_style_1" value={search} type="text" onChange={(e)=> { this.setState({ search: e.target.value }); this.handleChange(e); }} onKeyDown={(e)=>this.handleChange(e)}  placeholder="Project Name" aria-label="Search" />
                </div>
             
                  <div className="row py-3">
                  <div className='banner_home_launchpad'></div>
                      <div className="col-12 col-md-12 flex_cen_col">
                        <p className="banner_title text-center">Projects</p>
                        <div className='row mt-3'>
                          <div className='col-12 col-md-10 col-lg-9 col-xl-9 mx-auto'>
                          <p className="banner_subtitle_sm text-center" style={{color:"black"}}>Balance Network benefits all holders of the token and allows for fair launches giving traders of all sizes the opportunity to invest in the best upcoming Binance Smart Chain projects.</p>

                          </div>
                        </div>
                       
                        <hr className='hr_yellow mt-5'/>
                      </div>
                    
                  </div>
                </div>
            </div>
           
            <div className="inner_bg mt-4">
            <div className="container container_custom">


            <div className='row  card_row_h mx-0'>

            { !isSearch ? 
            (totalSales && totalSales.map((index)=>
            <Buycard saleData={index} connect={"string"} />
            )):
            (searchSale && searchSale.map((index)=>
            <Buycard saleData={index} connect={"string"} />
            ))
            }
            </div>
            <div className='text-center mt-5'>
              { isSearch ?
              <>
            {searchSale && searchSale.length < this.state.searchProxy.length ? 
            ( !this.state.isLoading ?
            <button className="get-started-btn get-started-btn-load" onClick={this.loadSearchMore.bind(this)} id="load_more_btn">{this.state.isLoading ? 'Loading...' : 'Load More' }</button>: <img src={loader}  id="loader_div_sm" />)
            :<></>
            }
            </> :  <>
            {totalSales && totalSales.length < this.state.proxy.length ? 
            ( !this.state.isLoading ?
            <button className="get-started-btn get-started-btn-load" onClick={this.loadMore.bind(this)} id="load_more_btn">{this.state.isLoading ? 'Loading...' : 'Load More' }</button>: <img src={loader}  id="loader_div_sm" />)
            :<></>
            }
            </>
            }
           
            </div>
                </div>
            </div>
            </div>
            {/* end ongoing_sec */}

              {/* upcoming_sec */}
              {/* <div className='upcoming_sec mt-5'>
            <div className="container container_custom">
                <div  className='top_heqad_sec'>
                <div className='text-right'>
                <input className="form-control searc_style_1" type="text" placeholder="Project Name" aria-label="Search" />
                </div>
                  <div className="row py-3">
                      <div className="col-12 col-md-12 flex_cen_col">
                        <p className="banner_title text-center">Upcoming IDOs</p>
                        <hr className='hr_yellow mt-5'/>
                      </div>
                    
                  </div>
                </div>
            </div>
           
            <div className="inner_bg mt-4">
            <div className="container container_custom">


            <div className='row  justify-content-between'>
             
            <Buycard connect={"string"} />
            <Buycard connect={"string"} />
            </div>
            <div className='text-center mt-5'>

            <button className="get-started-btn" id="load_more_btn_1">Load More</button>
            <img src={loader}  id="loader_div_sm_1" className='d-none'/>
            </div>
                </div>
            </div>
            </div> */}
            {/* end upcoming_sec */}
            </div>

            <Footer />
        </div>
        </div>
        )
    }
}

export default Landing