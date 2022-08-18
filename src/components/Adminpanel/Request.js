import React, { Component } from 'react';
import { useContext, useEffect, useState } from "react";

import Header from '../Header';
import Footer from '../Footer';
import Requestmodal from "./Requestmodal";

import favicon from "../../images/favicon.png"
import { acceptProject, getRequestedSales, rejectProject } from '../../hooks/useProjects';
import { getAccount } from '../../hooks/useAccount';


class Request extends Component
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
    
      componentDidMount()
      {
        this.showLoader();
        this.getData()
        this.hideLoader();
      }

      onDismiss(){
        this.setState({ requestModal: false });
    }
    constructor(props) {
        super(props);
        this.state = {          
            requestModal: false,
            requestedData: [],
            requestedAddress: ""
        };
        
    }

    async getData(){
      const data = await getRequestedSales();
      this.setState({ requestedData: data });
    }

    async Accept(saleAddress,name){
      await acceptProject(saleAddress,getAccount(),name);
      window.location.reload();
    }

    async Reject(saleAddress,name){
      await rejectProject(saleAddress,getAccount(),name);
      window.location.reload();
    }

   

  

    render() {
        
        
      const { requestModal} = this.state

     
        
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
               <div className="container container_custom mt-5">
                 <p className='yellow_head'>New Request</p>
          
               <div className='table-responsive mt-5 pt-5'>
        <table className="table table_style_admin table_req">
<thead>
<tr>
<th scope="col">S.No</th>
<th scope="col">Token Name</th>
<th scope="col">Sale</th>
<th scope="col">Info</th>
<th scope="col">Action</th>

</tr>
</thead>
<tbody>
{ this.state.requestedData && this.state.requestedData.length > 0 && this.state.requestedData.map((index,i)=>
<tr>
<td>{i+1}</td>
<td>{index._name}</td>
<td>{(index._sale).substring(0,12)+"..."+(index._sale).substring(28,42)}</td>
<td>
<button className="grey-btn-fill" onClick={() => this.setState({ requestModal: true, requestedAddress: index._sale })}>View</button>
</td>
<td>
<button onClick={()=> this.Accept(index._sale,index._name)} className="get-started-btn-fill mr-2 mr-md-3">Accept</button>
<button onClick={()=> this.Reject(index._sale,index._name)} className="get-started-btn">Reject</button>

</td>

</tr>)
    }







</tbody>
</table>
        </div>
        </div>
    
                 
                </div>
                {requestModal && this.state.requestedAddress && <Requestmodal connect={"string"} info={this.state.requestedAddress} onDismiss={()=>this.onDismiss()} /> }

                
               
    
                <Footer />
            </div>
            </div>


       
      )
    }

}


export default Request