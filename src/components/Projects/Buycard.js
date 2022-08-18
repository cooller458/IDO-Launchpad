import React, { Component } from 'react';
import { useContext, useEffect, useState } from "react";
import { ProgressBar } from 'react-bootstrap';
import { isSaleLive, isUpcoming, Salediffernce, UpcomingDiffernce } from '../../hooks/useProjects';
import Countdown from 'react-countdown';
import coin from "../../images/coin.png";

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

class Buycard extends Component
{
    constructor(props) {
        super(props);
        
    }
    render() {
  
        const { saleData } = this.props
      return (
          
          <div className='col-12 col-lg-6 col-xl-4 mb-4 px-2'>
              <a href={`/sale/${saleData && saleData.saleAddress}`}>
                  
        <div className='card card_style_1 ribbox'>
            {saleData && saleData.isWithoutToken ? 
        <div className='ribbon'>NO TOKEN</div>:<></>
            }
            <div className='card-body'>
                <div className='grid_img_div'>
                    <div>
                <img src={saleData && saleData.logo} alt={saleData && saleData.symbol} />
                </div>
                <div>
                    <p className='yellow_txt font_20 mb-2 yellow_txt_title'>{saleData && saleData.name}</p>
                    <div className="btn-group btn_grp_yel mb-2" role="group" aria-label="Basic example">
                    <a target={'_blank'} href={saleData && saleData.social[0]} className="btn btn-secondary">
                    <i className="fas fa-globe"></i>
                    </a>
                    <a target={'_blank'} href={saleData && saleData.social[1]} className="btn btn-secondary">
                    <i className="fab fa-twitter"></i>
                    </a>
                    <a target={'_blank'} href={saleData && saleData.social[2]} className="btn btn-secondary">
                    <i className="fa fa-paper-plane"></i>
                    </a>
                    </div>
                    <div className='d-sm-flex d-block'>
                    <p className='mt-2 mb-0'>
                    {saleData && isSaleLive(saleData.startTime,saleData.endTime,saleData.isPresaleOpen)  ?
                             
                    <span className="badge infobtn badge-green">
                        <span className='green_dot'></span>
                        <span className='green_txt'>Live</span>
                    </span>:
                    ( saleData && isUpcoming(saleData.startTime) ?
                     <span className="badge upbtn badge-green">
                   <i className="fa fa-fire" aria-hidden="true"></i>
                     <span className='green_txt'>Upcoming</span>
                 </span>: <span className="badge dangerbtn badge-green">
                 <i className="fa fa-flag-checkered" aria-hidden="true"></i>
                     <span className='green_txt'>Finished</span>
                 </span>)
                }
                    </p>
               

<p>
                    <span className="badge badge-yellow-fill mt-2 ml-2">
                        <span className='blk_txt'>{saleData && saleData.symbol}</span>
                        </span>
                    </p>
                </div>
                   
                </div>
 
           
                </div>
      
               
                <p className='yellow_txt_sm'>{saleData && (saleData.description).substring(0,130)}...</p>
        
          <div className='row'>
                <div className='col-12 col-lg-4 mb-3'>
                <p className='yellow_txt_sm mb-1 purple_head'>Swap rate</p>
                <p className='desc_grey_txt pb-0 mb-0'>1 BNB = {saleData && saleData.presaleRate} {saleData && saleData.symbol}</p>


                </div>
                <div className='col-12 col-lg-4 mb-3'>
                <p className='yellow_txt_sm mb-1 purple_head'>Hard Cap</p>
                <p className='desc_grey_txt pb-0 mb-0'>{saleData && (saleData.hardCap/10**18).toFixed(2)} BNB</p>
               


                </div>
                <div className='col-12 col-lg-4 mb-3'>
                <p className='yellow_txt_sm mb-1 purple_head'>Access</p>
                <p className='desc_grey_txt pb-0 mb-0'>{saleData && saleData.isWhitelisted ? 'Private' : 'Public'}</p>


                </div>
            </div>
            <p className='yellow_txt_sm purple_head d-flex justify-content-between'>
               <span>Progress</span>
               <span>Participants<b className='pl-2'>{saleData && saleData.participants}</b></span>

                </p>
            <ProgressBar now={saleData && parseInt(parseInt(saleData.earnedCap)/parseInt(saleData.hardCap) * 100)} className='yellow_bar'/>
            <p className='white_txt_sm d-flex justify-content-between mt-3'>
               <span className='text_black_perc'> {saleData && (parseInt(saleData.earnedCap)/parseInt(saleData.hardCap) * 100)} %</span>
               <span className='text_black_perc'>{saleData && ((saleData.earnedCap)/10**18).toFixed(3)}</span>

                </p>
                {  saleData && isUpcoming(saleData.startTime) ?
                    <p class="mt-2 countup countbtn counter_empty ml-sm-0 mb-0 text-center">
                    <span class="badge upbtn badge-blue">
                       
                        <span class="green_txt pl-0">
                        <div className='countdown d-flex align-items-center'>
                    Opens in &nbsp; <Countdown date={Date.now() + (UpcomingDiffernce(saleData.startTime))} renderer={renderer} />
                </div> 
                            </span></span>
                </p>: (saleData && isSaleLive(saleData.startTime,saleData.endTime,saleData.isPresaleOpen)  ?
                <p class="mt-2 countbtn ml-sm-0 text-center mb-0 counter_empty">
                    <span class="badge infobtn badge-blue">
                      
                        <span class="green_txt">
                        <div className='countdown d-flex align-items-center'>
                    Ends in &nbsp; <Countdown date={Date.now() + Salediffernce(saleData.endTime)} renderer={renderer} />
                </div> 
                            </span></span>
                </p>:<></>)
                }
            </div>
        </div>
            </a>
         

    </div>
    
      )
    }

}


export default Buycard