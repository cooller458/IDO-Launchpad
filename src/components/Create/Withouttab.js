import React, { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useContext, useEffect, useState } from "react";
import { InputGroup, FormControl } from 'react-bootstrap';
import createimg from "../../images/createimg.png"

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { ROUTER } from '../../config/env'
import { UseTokenInfo,IsValidAddress,createPresale,toFixedNumber,getSaleAddress,depositTokens, isFloat } from '../../hooks/useContract'
import { getAccount } from '../../hooks/useAccount'


  
class Withouttab extends Component
{

       
    constructor(props) {
        super(props);
        this.state = {   
          logo: '',       
          name: '',
          symbol: '',
          address: localStorage.getItem('accountInfo')? localStorage.getItem('accountInfo'): '' ,
          presaleRate: 0,
          softCap: 0,
          hardCap: 0,
          min: 0,
          max : 0,
          isVested: false,
          isPancake: false,
          pancakeRate:0,
          liquidityPercent:0,
          unlockOn: 0,
          startDate: '',
          endDate: '',
          vestPercent: 0,
          vestInterval: 0,
          isWithoutToken: true,
          description: '',
          website: '',
          twitter: '',
          telegram: '',
          deposit: 0,
          decimals: 18,
          createdSale: '',
          isDeposited: false,
          isWhitelisted: false
                     
         
        };
    }

  
    // Presale Creation
    async CreateSale(){
       
        let Addresses = [];
        let Values = [];
        let Details = [];
        let isSetter = [];

        const startTime = this.state.startDate;
        const endTime = this.state.endDate;

        const account= getAccount()
     

        // let startDiff = 0;
        // let endDiff = 0;
        // var now = new Date();
          
        // if(startTime > now.getTime())
        //     startDiff = parseInt((new Date(startTime).getTime() - now.getTime())/86400/1000) ;
        
        // endDiff =  parseInt(((new Date(endTime).getTime() - now.getTime())/86400/1000)-startDiff) ;

        const startDiff = parseInt(parseInt((new Date(startTime).getTime()))/1000);
        const endDiff =  parseInt(parseInt((new Date(endTime).getTime()))/1000);
       
         // _token 0
        //_router 1
       Addresses.push(this.state.address); 
       Addresses.push(ROUTER);
       Addresses.push(account);


          //_min 0 
        //_max 1
        //_rate 2
        // _soft  3
        // _hard 4
        //_pancakeRate  5
        //_unlockon  6
        // _percent 7
        // _start 8
        //_end 9
        //_vestPercent 10
        //_vestInterval 11
        Values.push(toFixedNumber(this.state.min*10**18).toString());
        Values.push(toFixedNumber(this.state.max*10**18).toString());
        Values.push(this.state.presaleRate);
        Values.push(toFixedNumber(this.state.softCap*10**18).toString());
        Values.push(toFixedNumber(this.state.hardCap*10**18).toString());
        Values.push(this.state.pancakeRate.toString());
        Values.push(this.state.unlockOn.toString());
        Values.push(this.state.liquidityPercent.toString());
        Values.push(startDiff.toString());
        Values.push(endDiff.toString());
        Values.push(this.state.vestPercent.toString());
        Values.push(this.state.vestInterval.toString());

         // isAuto 0
        //_isvested 1
        // isWithoutToken 2
        isSetter.push(this.state.isPancake);
        isSetter.push(this.state.isVested);
        isSetter.push(this.state.isWithoutToken);
        isSetter.push(this.state.isWhitelisted);
      
         // description 0 
        // website,twitter,telegram 1,2,3
        //logo 4
        //name 5
        //symbol 6
        Details.push(this.state.description);
        Details.push(this.state.website);
        Details.push(this.state.twitter);
        Details.push(this.state.telegram);
        Details.push(this.state.logo);
        Details.push(this.state.name);
        Details.push(this.state.symbol);

        const data = this.validate()
        if(data)
            return false;
     
        console.log("data Create : ",Addresses,Values,isSetter,Details,account)
        const sale = await createPresale(Addresses,Values,isSetter,Details,account)
        this.setState({createdSale: sale});
        console.log("createdSale : ",sale);
    }

    goToSale(){
        window.location.href = `${window.location.origin}/Balanceidolaunchpad/sale/${this.state.createdSale}`;
    }

    async getTokenInfo(tokenAddress){
        const isValid = await IsValidAddress(tokenAddress);
        if(tokenAddress.length == 42 && !isValid)
            toast.error("This is not a Valid Address !",
    {
        style: {
        minWidth: '300px',
        minHeight: '55px'
        }
    })
       
        console.log("IS valid ",isValid)
        if(tokenAddress.length == 42 && isValid){
            const token = await UseTokenInfo(tokenAddress);
            this.setState({ name: token.name });
            this.setState({ symbol: token.symbol });
            this.setState({ decimals: token.decimals });
        }
    }

    calculateDepositTokens(){
        this.forceUpdate() 
        let topancakeTokens =0;
        let pancakeTokens = 0;
        const presalePrice = 1/this.state.presaleRate;
        if(this.state.isPancake){
            const pancakePrice = 1/this.state.pancakeRate;
            topancakeTokens = (this.state.hardCap) * this.state.liquidityPercent / 100;
            pancakeTokens = topancakeTokens/pancakePrice;
            console.log("pancake tokens : ",pancakeTokens)
        }
         const netTokens = (this.state.hardCap)/presalePrice;
         console.log("net Token : ",pancakeTokens + netTokens)
         this.setState({ deposit: pancakeTokens + netTokens });
        
    }

    async DepositTokens(){
        const account= getAccount()
        const tokenAmount = toFixedNumber(this.state.deposit * 10 ** this.state.decimals).toString()
        const isDeposit = await depositTokens(this.state.address,this.state.createdSale,tokenAmount,account)
        this.setState({ isDeposited : isDeposit});
        
    }   

    renderDeposit(){
        return( this.state.deposit > 0 ?
              <button onClick={this.DepositTokens.bind(this)} className="get-started-btn-fill">Deposit {this.state.deposit} {this.state.symbol}</button>:
               <button onClick={this.calculateDepositTokens.bind(this)} className="get-started-btn-fill">Calculate</button>)
    }

    validate(){
        if(this.state.hardCap < this.state.softCap){
            toast.error("Hard Cap must be Higher than Soft Cap !",
            {
                style: {
                minWidth: '300px',
                minHeight: '55px'
                }
            })
        }
        if((this.state.presaleRate < 0)){
            toast.error("Price must be greater than 0",
            {
                style: {
                minWidth: '300px',
                minHeight: '55px'
                }
            })
        }
        if((this.state.pancakeRate < 0)){
            toast.error("Pancake price must be greater than 0",
            {
                style: {
                minWidth: '300px',
                minHeight: '55px'
                }
            })
        }

        return (this.state.hardCap < this.state.softCap) || (this.state.presaleRate < 0) || (this.state.pancakeRate < 0) ;
    }

    filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);
    
        return currentDate.getTime() < selectedDate.getTime();
      };



    render() {
        
        
     

        
      return (
        <div className="tab_img mt-5">
            <p className='yellow_txt font_25'>Create Presale</p>

                <div className='row'>
                    <div className='col-12 col-md-4 col-lg-3 mb-4'>
                    
                
                     <div className='card card_style_1 single_sale_card card_img_craete mt-5'>
        <div className='card-body'>
           <div className='img_card_outer'>
            <img src={this.state.logo} onError={(e)=>{e.target.onerror = null; e.target.src=createimg}} className='img-fluid'/>
           </div>                   
      
      
        </div>
        <div className='card-footer'>
        <p className='mb-0'>
           <span>{this.state.name=='' ? 'Token Name': this.state.name}</span>
         

            </p>
            <p className='mb-0 font_14'>
           <span>{this.state.symbol=='' ? 'Token Symbol': this.state.symbol}</span>
         

            </p>
        </div>
    </div>
                   
                    </div>

                    <div className='col-12 col-lg-9 col-md-8 mb-4'>
                      <div className='row mt-5'>
                        <div className='col-12 col-md-12 mb-3'>
                        <p className='yellow_txt font_20 mb-2'>Logo Url</p>
                    <p className='input_desc_sm'>Only Cloud Url is Accepted *.</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl id="file" value={this.state.logo} onChange={(e)=>this.setState({ logo: e.target.value }) } placeholder=""
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                    </div>
                        </div>
                      </div>

                      <div className='row'>
                      <div className='col-12 col-md-12'>
                      <p className='yellow_txt font_20 mb-2'>Token Information</p>

                        </div>
                    <div className='col-12 col-md-12 mb-3'>
                    <p className='input_desc_sm'>Token Name</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl value={this.state.name} onChange={(e)=>this.setState({ name: e.target.value }) } id="tokenname" placeholder=""
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                    </div>
                        </div>

                        <div className='col-12 col-md-6 mb-3'>
                    <p className='input_desc_sm'>Token Symbol</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl value={this.state.symbol} onChange={(e)=>this.setState({ symbol: e.target.value }) } id="tokensymbol" placeholder=""
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                    </div>
                        </div>

                      

                        <div className='col-12 col-md-6 mb-3'>
                    <p className='input_desc_sm'>Token Decimal</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl value={this.state.decimals} onChange={(e)=>this.setState({ decimals: e.target.value }) } id="tokendecimal" placeholder=""
                                readOnly={this.state.isWithoutToken} aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                    </div>
                        </div>
                      </div>

                      <div className='row'>
                        <div className='col-12'>
                        <p className='yellow_txt font_20 mb-2'>Enter Your Presale Price 
                        <span className='font_14 yelow_desc_blk'>(If I pay 1 BNB, how many tokens do I get?)</span>
                        </p>
                        </div>
                        <div className='col-12 col-md-12 mb-3'>
                        
                    <p className='input_desc_sm'>Presale Rate</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl pattern="/^\d+$/" id="presalerate" value={this.state.presaleRate} onChange={(e)=>{if(!isFloat(e.target.value)){ this.setState({ presaleRate: e.target.value }) }}} placeholder=""
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                    </div>
                        </div>
                      </div>
                 
                      <div className='row'>
                      <div className='col-12 col-md-12'>
                      <p className='yellow_txt font_20 mb-2'>Enter Presale cap. Softcap must be >= 50% of Hardcap</p>

                        </div>
                      <div className='col-12 col-md-6 mb-3'>
                    <p className='input_desc_sm'>Soft Cap</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl value={this.state.softCap} onChange={(e)=>this.setState({ softCap: e.target.value }) } id="softcap" placeholder=""
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                    </div>
                        </div>

                        <div className='col-12 col-md-6 mb-3'>
                    <p className='input_desc_sm'>Hard Cap</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl id="hardcap" value={this.state.hardCap} onChange={(e)=>{this.setState({ hardCap: e.target.value }) }} placeholder=""
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                    </div>
                        </div>                   

                      
                      </div>

                      <div className='row'>
                      <div className='col-12 col-md-12'>
                      <p className='yellow_txt font_20 mb-2'>Enter minimum and maximum amounts each wallet can contribute
                      <span className="font_14 yelow_desc_blk">(min, max)</span>
                      </p>

                        </div>
                      <div className='col-12 col-md-6 mb-3'>
                    <p className='input_desc_sm'>Min Contribution Limit</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl id="mincontribution" value={this.state.min} onChange={(e)=>this.setState({ min: e.target.value }) } placeholder=""
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                    </div>
                        </div>

                        <div className='col-12 col-md-6 mb-3'>
                    <p className='input_desc_sm'>Max Contribution Limit</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl id="maxcontribution" value={this.state.max} onChange={(e)=>this.setState({ max: e.target.value }) } placeholder=""
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                    </div>
                        </div>                   

                      
                      </div>

                        <div className='row'>
                      <div className='col-12 col-md-12'>
                      <p className='yellow_txt font_20 mb-2'>Please set the start and end time for the following parameters
                     
                      </p>

                        </div>
                      <div className='col-12 col-md-6 mb-3'>
                    <p className='input_desc_sm'>Start Time</p>
                    <div className="inputs input-groups date_inoput_grps">
                        <InputGroup className="datepicker_input">
                        <DatePicker
                         minDate={new Date()}
                                                    filterTime={this.filterPassedTime.bind(this)}
                                                   showTimeSelect
                                                   selected={this.state.startDate}
                                                   onChange={(date)=> this.setState({startDate: date})}
                                                   dateFormat="MMMM d, yyyy h:mm aa"
                                                 />
                          
                        </InputGroup>
                        <InputGroup.Append className='cur_pointer'>
                                <button variant="outline-secondary" className="get-started-btn-fill">
                                <i class="far fa-calendar-alt"></i>
                                </button>
                            </InputGroup.Append>
                    </div>
                        </div>

                        <div className='col-12 col-md-6 mb-3'>
                    <p className='input_desc_sm'>End Time</p>
                    <div className="inputs input-groups date_inoput_grps">
                        <InputGroup className="datepicker_input">
                        <DatePicker
                                                    minDate={new Date()}
                                                    filterTime={this.filterPassedTime.bind(this)}
                                                   showTimeSelect
                                                   selected={this.state.endDate}
                                                   onChange={(date)=> this.setState({endDate: date})}
                                                   dateFormat="MMMM d, yyyy h:mm aa"
                                                 />
                          
                        </InputGroup>
                        <InputGroup.Append className='cur_pointer'>
                                <button variant="outline-secondary" className="get-started-btn-fill">
                                <i class="far fa-calendar-alt"></i>
                                </button>
                            </InputGroup.Append>
                    </div>
                        </div>                   

                      
        </div>

    <div className='row'>
    

            


          {this.state.isVested ? 
             <>   <div className='col-12 col-md-6 mb-3'>
                    <p className='input_desc_sm'>Vesting Period Days</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl value={this.state.vestInterval} onChange={(e)=>this.setState({ vestInterval: e.target.value }) } id="vestinglockingdays" placeholder=""
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                    </div>
                        </div>

                        <div className='col-12 col-md-6 mb-3'>
                    <p className='input_desc_sm'>Rewards % per Vesting Period</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl value={this.state.vestPercent} onChange={(e)=>this.setState({ vestPercent: e.target.value }) } id="vestingliquidityrate" placeholder=""
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                    </div>
                </div>   </>   : <></> }             

                      
    </div>

      
    


      

        <div className='row'>
            { this.state.isPancake ?
                <>
                 <div className='col-12'>
                            <p className='yellow_txt font_20 mb-2'>Enter the percentage of raised funds that should be allocated to Liquidity on Pancakeswap 
                            <span className='font_14 yelow_desc_blk'>(Min 51%, Max 100%, we recommend > 70%)</span>
                            </p>
                </div>
                 <div className='col-12 col-md-12 mb-3'>
                            
                        <p className='input_desc_sm'>Pancakeswap Liquidity</p>
                        <div className="inputs input-groups">
                            <InputGroup className="">
                                <FormControl pattern="/^\d+$/" id="pancakswapliquidity" value={this.state.liquidityPercent} onChange={(e)=>this.setState({ liquidityPercent: e.target.value }) } placeholder=""
                                    aria-describedby="basic-addon2"
                                />
                            
                            </InputGroup>
                        </div>
                 </div>
                    </> : <></>
    }

                        <div className='col-12 note_desc'>
                          <p>Please fill out the additional information below to display it on your presale. (Information in this section is optional, but a description and logo link is recommended)</p>
                          <p>Note the information in this section can be updated at any time by the presale creator while the presale is active. Any links left blank will not be displayed on your sale.</p>
                          </div>

                          <div className='col-12 col-md-6 mb-3'>
                    <p className='input_desc_sm'>Website Link</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl value={this.state.website} onChange={(e)=>this.setState({ website: e.target.value }) } id="logolink1" placeholder="https://twitter.com"
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                    </div>
                        </div>

                        <div className='col-12 col-md-6 mb-3'>
                    <p className='input_desc_sm'>Twitter Link</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl value={this.state.twitter} onChange={(e)=>this.setState({ twitter: e.target.value }) } id="logolink2" placeholder="https://linkedin.com"
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                    </div>
                        </div>

                        <div className='col-12 col-md-6 mb-3'>
                    <p className='input_desc_sm'>Telegram Link</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl value={this.state.telegram} onChange={(e)=>this.setState({ telegram: e.target.value }) } id="logolink3" placeholder="https://skype.com"
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                    </div>
                        </div>

                        <div className='col-12 col-md-6 mb-3'>
                    <p className='input_desc_sm'>Logo Link</p>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl value={this.state.logo} onChange={(e)=>this.setState({ logo: e.target.value }) } id="logolink4" placeholder="https://facebook.com"
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                    </div>
                        </div>

            <div className='col-12 col-md-12 mb-3'>
                    <p className='input_desc_sm'>Project Description</p>
                    <div className="inputs input-groups text_are_grp">
                        <InputGroup className="">
                            <textarea value={this.state.description} onChange={(e)=>this.setState({ description: e.target.value }) } id="description" rows="3"
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                    </div>


                    {/* { !this.state.isWithoutToken  ?
                    <>
                <div className='row'>
        <div className='col-12 col-md-12'>
                      <p className='yellow_txt font_20 mb-4 toggle_label'>Deposit {this.state.deposit} {this.state.symbol} Tokens
                      <span className="font_14 yelow_desc_blk swithch_inline">
                  { this.state.deposit > 0 ?
              <button onClick={this.calculateDepositTokens.bind(this)} className="get-started-btn-fill">Deposit {this.state.deposit} {this.state.symbol}</button>:
               <button onClick={this.calculateDepositTokens.bind(this)} className="get-started-btn-fill">Calculate</button>
    }
                 
                      </span>
                      </p>

            </div>
                      
    </div></>:<></>
    } */}
    <>
                <div className='row'>
        <div className='col-12 col-md-12'>
                      <p className='yellow_txt font_20 mb-4 toggle_label'> WhiteListed Sale
                      <span className="font_14 yelow_desc_blk swithch_inline">
                      <div className="inputs inputs_switdch input-groups">
               
               <InputGroup className="">
               <label className="switch mb-0">
              
       <input type="checkbox" checked={this.state.isWhitelisted} onChange={(e)=> this.setState({isWhitelisted : e.target.checked})}/>
       <span className="slider round"></span>
       </label>
                 
               </InputGroup>
           </div>
                 
                      </span>
                      </p>

            </div>
                      
    </div></>


                        </div>

                        

                        
                        <div className='col-12 text-right mt-4'>
                        
                       { this.state.createdSale == '' ?
                        <a onClick={this.CreateSale.bind(this)} className="get-started-btn-fill">Create</a>:
                        <a onClick={this.goToSale.bind(this)} className="get-started-btn-fill">Proceed to Sale</a>
                        }
                        </div>
                      </div>
                      
               
                    </div>
                </div>

                
               
        </div>
      )
    }

}


export default Withouttab