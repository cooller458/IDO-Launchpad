import React, { Component } from 'react';
import { useContext, useEffect, useState } from "react";
import { ProgressBar } from 'react-bootstrap';
import { getAccount } from '../../hooks/useAccount';
import { isSaleLive, isUpcoming, Salediffernce, UpcomingDiffernce } from '../../hooks/useProjects';
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

class Singlesalecard extends Component
{
    constructor(props) {
        super(props);

        
        
    }




    render() {
        
        const { userData,saleData } = this.props

    //    console.log("user Data : ",isNaN(userData),getAccount(), getAccount() ? 'card card_style_1 single_sale_card blur' : 'card card_style_1 single_sale_card')
       
      return (
          
        <div className={ getAccount() ? 'card card_style_1 single_sale_card' : 'card card_style_1 single_sale_card blur'}>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-12 col-lg-6 mb-3'>
                                    <p className='text-uppercase yellow_txt font-weight-500 mb-2'>Your Balance</p>
                                    <p className='text-white text-uppercase font-weight-800 font_20'>{userData && (parseInt(userData.userTokenBalance)/10**parseInt(saleData.decimals)).toFixed(2)} {saleData && saleData.symbol}</p>
                                    <p className='text-white text-uppercase font-weight-800 font_20'>{userData && (parseInt(userData.bnbBalance)/10**18).toFixed(5)} BNB</p>

                                </div>

                                <div className='col-12 col-lg-6 mb-3'>
                                    <p className='text-uppercase yellow_txt font-weight-500 mb-2'>Your Whiteisted Amount</p>
                                    <p className='text-white text-uppercase font-weight-800 font_20'>{userData && (parseInt(userData.userWhitelistedAmount)/10**18).toFixed(5)} BNB</p>
                                    <p className='mt-2 mb-0'>
                                    {saleData && saleData.isWhitelisted ?
                                    <span className="badge badge-green-fill">
                                    <span className='green_txt pl-0'>Private</span>
                                    </span>
                                    : <span className="badge badge-green-fill">
                                    <span className='green_txt pl-0'>Public</span>
                                    </span>}

                                </p>
                                </div>

                                <div className='col-12 col-lg-6 mb-3'>
                                    <p className='text-uppercase yellow_txt font-weight-500 mb-2'>Swapped</p>
                                    <p className='text-white text-uppercase font-weight-800 font_20'>{userData && (parseInt(userData.userInvested)/10**18).toFixed(5)} BNB</p>
                                    <p className='text-white text-uppercase font-weight-800 font_16'>{userData && (parseInt(userData.actualBalance)/10**parseInt(saleData.decimals)).toFixed(2)} {saleData && saleData.symbol}</p>

                                </div>

                                <div className='col-12 col-lg-6 mb-3'>
                                    {  isSaleLive(saleData.startTime,saleData.endTime,saleData.isPresaleOpen) ||  isUpcoming(saleData.startTime) ?
                                        <>
                                    <p className='text-uppercase yellow_txt font-weight-500 mb-2'>Remaining {saleData && saleData.symbol} to be Sold</p>
                                    <p className='text-white text-uppercase font-weight-800 font_20'>{userData && (parseInt(userData.unSoldTokens)/10**parseInt(saleData.decimals)).toFixed(2)} {saleData && saleData.symbol}</p>
                                    </>: <>
                                    <p className='text-uppercase yellow_txt font-weight-500 mb-2'>Total {saleData && saleData.symbol} Sold</p>
                                    <p className='text-white text-uppercase font-weight-800 font_20'>{saleData && ((parseInt(saleData.earnedCap)/10**18)*saleData.presaleRate).toFixed(2)} {saleData && saleData.symbol}</p>
                                    </> }
                                    {/* <p class="mt-2 countbtn salecount mb-2">
                                    <span class="badge upbtn badge-green">
                                        <span class="green_dot"></span>
                                        <span class="green_txt">
                                        <div className='countdown d-flex align-items-center'>
                                            Opens in &nbsp; <Countdown date={Date.now() + 1687600000} renderer={renderer} />
                                        </div> 
                                            </span>
                                            </span>
                                </p> */}
                                {  saleData && isUpcoming(saleData.startTime) ?
                    <p class="mt-2 countup countbtn ml-sm-2 mb-0">
                    <span class="badge infobtn badge-blue">
                        <span class="green_txt pl-0">
                        <div className='countdown d-flex align-items-center'>
                    Opens in &nbsp; <Countdown date={Date.now() + (UpcomingDiffernce(saleData.startTime))} renderer={renderer} />
                </div> 
                            </span></span>
                </p>: (saleData && isSaleLive(saleData.startTime,saleData.endTime,saleData.isPresaleOpen)  ?
                <p class="mt-2 countbtn ml-sm-2 mb-0">
                    <span class="badge infobtn badge-blue">
                        <span class="green_txt pl-0">
                        <div className='countdown d-flex align-items-center'>
                    Ends in &nbsp; <Countdown date={Date.now() + Salediffernce(saleData.endTime)} renderer={renderer} />
                </div> 
                            </span></span>
                </p>:<></>)
                }


                                </div>
                                {/* <div className='col-md-12 mb-3'>
                               
                                </div> */}
                            </div>

                      
                        <p className='text-white d-flex justify-content-between'>
                           <span>Swap Progress</span>
                         

                            </p>
                        <ProgressBar now={parseInt(parseInt(saleData.earnedCap)/parseInt(saleData.hardCap) * 100)} className='yellow_bar'/>
                        <p className='white_txt_sm d-flex justify-content-between mt-3'>
                           <span> {(parseInt(saleData.earnedCap)/parseInt(saleData.hardCap) * 100)} %</span>
                           <span>{(parseInt(saleData.earnedCap)/10**18).toFixed(2)}/{(parseInt(saleData.hardCap)/10**18).toFixed(2)} BNB</span>

                            </p>
                        </div>
                    </div>
      )
    }

}


export default Singlesalecard