import React, { Component } from 'react';
import { useContext, useEffect, useState } from "react";
import { Modal, InputGroup,FormControl,ProgressBar } from 'react-bootstrap';
import { getAccount } from '../../hooks/useAccount';
import { BuyToken, calculateBuy, claimToken } from '../../hooks/useBuy';
import { isSaleEnded, isSaleLive, isUpcoming } from '../../hooks/useProjects';



class Buymodal extends Component
{
    constructor(props) {
        super(props);
        this.state = {          
            buyModal: true,
            bnbAmount: 0,
            claim: '',
            max: 0,
            isMax: false
           
        };
    }

    setMax(){
        this.setState({ max: this.props.userData.bnbBalance, isMax: true })
        this.setState({ bnbAmount: this.props.userData.bnbBalance/10**18 })
        this.calculateToken(this.props.userData.bnbBalance/10**18)
    }

    async calculateToken(value){
        const tokenValue = await calculateBuy(this.props.saleAddress,value);
        this.setState({ claim: (tokenValue/10**this.props.saleData.decimals) })
        console.log("this.state.claim",this.state.claim)
    }

    async buy(){
        await BuyToken(this.props.saleAddress,this.state.bnbAmount,this.state.isMax,this.state.max,getAccount());
        this.reset();
        this.props.onUpdate();
    }

    async Claim(){
        await claimToken(this.props.saleAddress,getAccount());
        this.props.onUpdate();
    }

    reset(){
        this.setState({
            bnbAmount: 0,
            claim: '',
            max: 0,
            isMax: false
        });
    }

    componentDidMount(){
        this.setState({ bnbAmount: '' })
        
    }



    render() {
        
  
        const {buyModal} = this.state
        const { saleData,userData } = this.props
        
      return (


                    <Modal className="buy-modal" dialogClassName="modal-90w modal-dialog-lg" show={buyModal} centered>
                    <Modal.Header>
                    <h3 className="sec-head ">Buy {saleData && saleData.symbol} Token</h3>
                            <button type="button" class="close" onClick={() => this.props.onDismiss()} ><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="modal-cont">
                                <div className="deposite-token">
                                <ProgressBar now={parseInt(parseInt(saleData.earnedCap)/parseInt(saleData.hardCap) * 100)} className='yellow_bar'/>
                           <p className='white_txt_sm d-flex justify-content-between mt-3'>
                           <span>Progress ({(parseInt(saleData.earnedCap)/10**18).toFixed(2)}/{(parseInt(saleData.hardCap)/10**18).toFixed(2)} BNB)</span>
                           <span> {(parseInt(saleData.earnedCap)/parseInt(saleData.hardCap) * 100)} %</span>

                            </p>
                                    <div className='card card_toek'>
                                        <div className='card-body'>
                                            <div className='row'>
                                                <div className='col-12 col-md-6 col-lg-3 mb-3 mb-lg-0'>
                                                    <div>
                                                    <div>
                                                    <div color="color_purple" class="coin_desc_li_one">Your Claimable {saleData && saleData.symbol}</div>
                                                    </div>
                                                    <div>
                                                    <div color="color_purple" class="coin_name_title"> {userData && (parseInt(userData.userClaimbale)/10**parseInt(saleData.decimals)).toFixed(2)} {saleData && saleData.symbol}</div>
                                                    </div>
                                                    </div>
                                                </div>

                                              

                                                {/* <div className='col-12 col-md-6 col-lg-3 mb-3 mb-lg-0'>
                                                    <div>
                                                    <div>
                                                    <div color="color_purple" class="coin_desc_li_one">Your Contribution</div>
                                                    </div>
                                                    <div>
                                                    <div color="color_purple" class="coin_name_title">{userData && (parseInt(userData.userInvested)/10**18).toFixed(5)} BNB</div>
                                                    </div>
                                                    </div>
                                                </div> */}

                                                <div className='col-12 col-md-6 col-lg-4 mb-3 mb-lg-0'>
                                                    <div>
                                                    <div>
                                                    <div color="color_purple" class="coin_desc_li_one">Max Limit</div>
                                                    </div>
                                                    <div>
                                                    <div color="color_purple" class="coin_name_title">{saleData.maxEthLimit / 10**18} BNB</div>
                                                    </div>
                                                    </div>
                                                </div>

                                                <div className='col-12 col-md-6 col-lg-2 mb-3 mb-lg-0'>
                                                    <div>
                                                    <div>
                                                    <div color="color_purple" class="coin_desc_li_one">Min Limit</div>
                                                    </div>
                                                    <div>
                                                    <div color="color_purple" class="coin_name_title">{saleData.minEthLimit / 10**18}  BNB</div>
                                                    </div>
                                                    </div>
                                                </div>
                                                <div className='col-12 col-md-6 col-lg-2 mb-3 mb-lg-0'>
                                                    <div>
                                                    <div>
                                                    <div color="color_purple" class="coin_desc_li_one">{saleData && saleData.symbol} Per BNB</div>
                                                    </div>
                                                    <div>
                                                    <div color="color_purple" class="coin_name_title">{saleData.presaleRate}  {saleData && saleData.symbol}</div>
                                                    </div>
                                                    </div>
                                                </div>
                                            </div>
                                     
                                        </div>
                                    </div>
                                   <div className='row mt-4'>
                                       <div className='col-12 col-md-6 mb-3 mb-md-0'>
                                       <div className="input-groups">
                                        <InputGroup className="">
                                            <FormControl placeholder="Enter Amount" value={this.state.bnbAmount} onChange={(e)=> { this.setState({ bnbAmount: e.target.value }); this.calculateToken(e.target.value);}} aria-label="" aria-describedby="basic-addon2"/>
                                            <InputGroup.Text className="doll txt-purple">BNB</InputGroup.Text>
                                          
                                        </InputGroup>
                                    </div>
                                       </div>
                                       <div className='col-12 col-md-6 mb-3 mb-md-0'>
                                       <div className="input-groups">
                                        <InputGroup className="">
                                            <FormControl placeholder="You Will Get" readOnly={true} value={this.state.claim} aria-label="" aria-describedby="basic-addon2"/>
                                            <InputGroup.Text className="doll txt-purple"> {saleData && saleData.symbol}</InputGroup.Text>
                                          
                                        </InputGroup>
                                    </div>
                                       </div>
                                   </div>

                                   <div className='row mt-4 pb-4'>
                                       <div className='col-12 col-md-12 mb-3 mb-md-0 btn_row'>
                                       <button onClick={this.setMax.bind(this)} className="get-started-btn mr-2 mb-2">Max</button>
                                       { saleData && isSaleLive(saleData.startTime,saleData.endTime,saleData.isPresaleOpen) ? 
                                       <button onClick={this.buy.bind(this)} disabled={ saleData && saleData.isWhitelisted ? userData && !(userData.userWhitelistedAmount > 0) : false } className="get-started-btn-fill text-capitalize mr-2 mb-2" > {saleData && saleData.isWhitelisted ? (userData && !(userData.userWhitelistedAmount > 0) ? "Not Whitelisted" : "Buy"):"Buy"}</button>:
                                      (isUpcoming(saleData.startTime,saleData.endTime) ? <button disabled={true} className="get-started-btn-fill text-capitalize mr-2 mb-2" > Upcoming </button> :
                                       (!isSaleLive(saleData.startTime,saleData.endTime) ?<button disabled={true} className="get-started-btn-fill text-capitalize mr-2 mb-2" > Sale InActive </button>:<button onClick={this.buy.bind(this)} className="get-started-btn-fill text-capitalize mr-2 mb-2" > Buy </button>))
                                       }
                                      {saleData && saleData.isVested ?
                                     <button disabled={true} className="get-started-btn mr-2 mb-2">Vested</button>:
                                       (saleData && saleData.isClaimable ? 
                                       ( saleData && saleData.isWithoutToken?  <button disabled={true} className="get-started-btn mr-2 mb-2">No Token</button> :<button onClick={this.Claim.bind(this)} className="get-started-btn mr-2 mb-2">Claim</button>):
                                       <button disabled={true} className="get-started-btn mr-2 mb-2">Claim</button>)}
                                       <button onClick={()=> this.props.onDismiss()} className="get-started-btn-fill text-capitalize mr-2 mb-2">Close</button>
                                           </div>
                                           </div>
                                   
                                </div>
                            </div>
                        </Modal.Body>
                        
                </Modal>
      )
    }

}


export default Buymodal