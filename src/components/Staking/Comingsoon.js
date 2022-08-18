import React, { Component } from 'react';
import { useContext, useEffect, useState } from "react";

import Header from '../Header';
import Footer from '../Footer';


import '../../css/styles.css';

import coming from "../../images/rocket.png"



class Comingsoon extends Component {
   

  
    componentDidMount()
    {
      // this.showLoader();
    //   this.hideLoader();
    }
   
    constructor(props) {
      super(props);
      this.state = {          
      };
  }
    render() {
     

      const location = this.props.location.pathname.split('/')[1];


      
	return (
    <div>
    
        <div>
      

           <Header />
           <div className="whole_sec pb-0 coimg_soon_bg">
         <div className='container container_custom'>
        <div className='coimg_soon_center'>
            <div className='coing_soon_img mb-0'>
            <img src={coming} className='img-fluid'/>
            </div>
            <div>
                <p className='coimg_soon_text mb-0'>
                <span className='coimg_soon_text_white px-1'>4</span>
                    <span className='coimg_soon_text_yellow px-1'>0</span>
                    <span className='coimg_soon_text_white px-1'>4</span>

                </p>
            </div>
        </div>
         </div>

           
            </div>

            <Footer />
        </div>
        </div>
        )
    }
}

export default Comingsoon