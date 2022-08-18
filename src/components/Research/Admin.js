import React, { Component } from 'react';
import "csv-to-array"
import { useContext, useEffect, useState } from "react";
import { InputGroup, FormControl } from 'react-bootstrap';
import { getAccount } from '../../hooks/useAccount';
import { Finalise, getUnsold, SetWhitelisted, updateMaxBNB, updateMinBNB, updatePancakeInfo, updatePresaleRate,updateSaleEvent, updateStopEvent, updateTokenInfo,updateVestingInfo, UploadCSVWhitelist, withdrawBNB } from '../../hooks/useAdmin';

import WhitelistModal from "./WhitelistModal";
import { ONEDAYINSECONDS } from '../../config/env';
import { processCSV } from '../../hooks/useProjects';
import { isFloat } from '../../hooks/useContract';



class Admin extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            whitelistModal : false,
            saleInfo: this.props.saleData,
            uploadFile:'',
            csvData: [],
            buttonName: 'Browse'
        }
        
    }

    // token Info

    async setTokenInfo(){
       await updateTokenInfo(this.state.saleInfo,this.props.saleAddress,getAccount());
       this.props.onUpdate();
    }

    async setPancakeInfo(){
        await updatePancakeInfo(this.state.saleInfo,this.props.saleAddress,getAccount());
        this.props.onUpdate();
    }
    async setVestingInfo(){
        await updateVestingInfo(this.state.saleInfo,this.props.saleAddress,getAccount());
        this.props.onUpdate();
    }

    async setPresaleRate(){
        await updatePresaleRate(this.state.saleInfo,this.props.saleAddress,getAccount());
        this.props.onUpdate();
    }

    async setMinBNB(){
        await updateMinBNB(this.state.saleInfo,this.props.saleAddress,getAccount());
        console.log("await update");
       this.props.onUpdate();
    }

    async setMaxBNB(){
        await updateMaxBNB(this.state.saleInfo,this.props.saleAddress,getAccount());
        this.props.onUpdate();
    }

    async startPresaleEvent(){
        await updateSaleEvent(this.state.saleInfo,this.props.saleAddress,getAccount());
        this.props.onUpdate();
    }

    async stopSaleEvent(){
        await updateStopEvent(this.props.saleAddress,getAccount());
        this.props.onUpdate();
    }

    async withdrawToken(){
        await getUnsold(this.props.saleAddress,getAccount());
        this.props.onUpdate();
    }

    async BNBwithdraw(){
        await withdrawBNB(this.props.saleAddress,getAccount());
        this.props.onUpdate();
    }

    async Finalisesale(){
        await Finalise(this.props.saleAddress,getAccount());
        this.props.onUpdate();
    }

    convert = async(e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            let csvD = [];
    
            reader.onload = async function(e) {
                const text = e.target.result;
               const whitelist = processCSV(text);
               console.log("CSV Data 1 : ",whitelist);
               csvD = (whitelist);
               console.log("CSV Data 2 : ",csvD);
               localStorage.setItem("csvData",JSON.stringify(whitelist))

              
              // this.setState({ csvData: whitelist });
            }
            reader.readAsText(file);
            const csvData = JSON.parse(localStorage.getItem("csvData")); 
            this.setState({ buttonName: `${csvData.length} User(s) added` })
    }

    async addWhitelistCSV(){
      //  await addWhitelistMembers(this.state.inputList,this.props.saleAddress,getAccount());
      if(localStorage.getItem("csvData")){
        const csvData = JSON.parse(localStorage.getItem("csvData")); 
        await UploadCSVWhitelist(csvData,this.props.saleAddress,getAccount());
        localStorage.removeItem("csvData");
      }else{
        await SetWhitelisted(this.props.saleAddress,this.state.saleInfo.isWhitelisted,getAccount());
      }
      
    }
   




    

    componentDidMount(){
        this.setState({saleInfo : this.props.saleData});
    }
    render() {
        const {whitelistModal,saleInfo} = this.state
        const {saleData} = this.props
      return (
        <div className="saledet">
        <div className="detail-list">

        {whitelistModal && <WhitelistModal saleAddress={this.props.saleAddress} onDismiss={() => this.setState({ whitelistModal: false })} connect={"string"} /> }
        <div className="row form_row">
        <div className='col-12 col-md-12'>
                      <p className='yellow_txt font_20 mb-2 toggle_label'>Token Information
                      <span className="font_14 yelow_desc_blk swithch_inline">
                      <div className="inputs inputs_switdch input-groups">
               
              
           </div>
                      </span>
                      </p>

                        </div>
        <div className="col-12 col-md-6">
                    <label>Logo</label>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl placeholder={ !saleInfo.logo ? saleData.logo : saleInfo.logo } onChange={(e)=>{ let data = saleInfo; data.logo=e.target.value; this.setState({ saleInfo: data }); }} 
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                    </div>
                </div>

                <div className="col-12 col-md-6">
                    <label>Website</label>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl placeholder={!saleInfo.website  ? saleData.social && saleData.social[0] : saleInfo.website } onChange={(e)=>{ let data = saleInfo; data.website=e.target.value; this.setState({ saleInfo: data }); }} 
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                    </div>
                </div>

                <div className="col-12 col-md-6">
                    <label>Twitter</label>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl placeholder={ !saleInfo.twitter  ? saleData.social && saleData.social[1] : saleInfo.twitter } onChange={(e)=>{ let data = saleInfo; this.setState({ saleInfo: data.twitter=e.target.value }); }} 
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <label>Telegram</label>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl placeholder={ !saleInfo.telegram ? saleData.social && saleData.social[2] : saleInfo.telegram } onChange={(e)=>{ let data = saleInfo; data.telegram=e.target.value; this.setState({ saleInfo: data }); }} 
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                    </div>
                </div>

                <div className="col-12 col-md-12 mb-3">
                    <label>Project Description</label>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl placeholder={ !saleInfo.description ? saleData.description : saleInfo.description } onChange={(e)=>{ let data = saleInfo; data.description=e.target.value; this.setState({ saleInfo: data }); }}
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                    </div>
                </div>
                <div className="col-6 col-sm-3 col-md-3 text-sm-left">
                                <button onClick={this.setTokenInfo.bind(this)} className="get-started-btn mr-4 mt-3">Update</button>

                            </div>
        </div>
        <div className="row form_row">
        <div className='col-12 col-md-12'>
                      <p className='yellow_txt font_20 mb-2 toggle_label'>Pancake Information
                      <span className="font_14 yelow_desc_blk swithch_inline">
                      <div className="inputs inputs_switdch input-groups">
               
               <InputGroup className="">
               <label className="switch mb-0">
              
       <input type="checkbox" checked={ saleInfo && !("isPancake" in saleInfo)  ? saleData.isPancake : saleInfo.isPancake} onChange={(e)=>{ let data = saleInfo; data.isPancake=e.target.checked; this.setState({ saleInfo: data }); }}/>
       <span className="slider round"></span>
       </label>
                 
               </InputGroup>
           </div>
                      </span>
                      </p>

                        </div>
                <div className="col-12 col-md-6">
                    <label>LP Locking Days</label>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl placeholder={ !saleInfo.lpUnlockon ? "0" : saleInfo.lpUnlockon } onChange={(e)=>{ let data = saleInfo; data.lpUnlockon=e.target.value; this.setState({ saleInfo: data }); }} 
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <label>Pancake Rate per BNB</label>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl placeholder={ !saleInfo.pancakeRate ? saleData.pancakeRate : saleInfo.pancakeRate } onChange={(e)=>{ if(!isFloat(e.target.value)){ let data = saleInfo; data.pancakeRate=e.target.value; this.setState({ saleInfo: data });} }}  
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                    </div>
                </div>

                <div className="col-12 col-md-12 mb-3">
                    <label>Pancake Liquidity Percentage %</label>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl placeholder={ !saleInfo.liquidityPercent ? "0" : saleInfo.liquidityPercent } onChange={(e)=>{ if(!isFloat(e.target.value)){ let data = saleInfo; data.liquidityPercent=e.target.value; this.setState({ saleInfo: data });} }}  
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                    </div>
                </div>
                <div className="col-6 col-sm-3 col-md-3 text-sm-left">
                                <button onClick={this.setPancakeInfo.bind(this)} className="get-started-btn mr-4 mt-3">Update</button>

                            </div>
        </div>
         {/* <p className='yellow_txt font_20 mb-2'>Vesting Information</p> */}
        <div className="row form_row">
        <div className='col-12 col-md-12'>
                      <p className='yellow_txt font_20 mb-2 toggle_label'>Vesting Information
                      <span className="font_14 yelow_desc_blk swithch_inline">
                      <div className="inputs inputs_switdch input-groups">
               
               <InputGroup className="">
               <label className="switch mb-0">
              
       <input type="checkbox" checked={saleInfo && !("isVested" in saleInfo) ? saleData.isVested : saleInfo.isVested} onChange={(e)=>{ let data = saleInfo; data.isVested=e.target.checked; this.setState({ saleInfo: data }); }}/>
       <span className="slider round"></span>
       </label>
                 
               </InputGroup>
           </div>
                      </span>
                      </p>

                        </div>
        <div className="col-12 col-md-6">
                    <label>Vesting Percentage</label>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl placeholder={ !saleInfo.vestingPercent ? saleData.vestingPercent/100 : saleInfo.vestingPercent } onChange={(e)=>{ if(!isFloat(e.target.value)){ let data = saleInfo; data.vestingPercent=e.target.value; this.setState({ saleInfo: data });} }} 
                            />
                          
                        </InputGroup>
                    </div>
                </div>

                <div className="col-12 col-md-6">
                    <label>Vesting Interval in Days</label>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl  placeholder={ !saleInfo.vestingInterval ? saleData.vestingInterval/ONEDAYINSECONDS : saleInfo.vestingInterval } onChange={(e)=>{ let data = saleInfo; data.vestingInterval=e.target.value; this.setState({ saleInfo: data }); }} 
                                aria-describedby="basic-addon2"
                            />
                          
                        </InputGroup>
                    </div>
                </div>

             
                <div className="col-6 col-sm-3 col-md-3 text-sm-left">
                                <button onClick={this.setVestingInfo.bind(this)} className="get-started-btn mr-4 mt-3">Update</button>

                            </div>
        </div>
      
        <div className="row form_row">
        <div className='col-12 col-md-12'>
                      <p className='yellow_txt font_20 mb-2 toggle_label'>WhiteListing Information
                      <span className="font_14 yelow_desc_blk swithch_inline">
                      <div className="inputs inputs_switdch input-groups">
               
               <InputGroup className="">
               <label className="switch mb-0">
              
       <input type="checkbox" checked={ saleInfo && !("isWhitelisted" in saleInfo)? saleData.isWhitelisted : saleInfo.isWhitelisted} onChange={(e)=>{ let data = saleInfo; data.isWhitelisted=e.target.checked; this.setState({ saleInfo: data }); }}/>
       <span className="slider round"></span>
       </label>
                 
               </InputGroup>
           </div>
                      </span>
                      </p>

                        </div>
                        <div className="col-12 col-md-6">
                            <div className=' align-items-center'>
                            <label className='text_dr_wh'>Import CSV</label>
                            <div className='browsebtn '>
                                    <input type="file" onChange={this.convert.bind(this)} className=' get-started-btn-fill '/>
                                    <label>{this.state.buttonName}</label>
                            </div>
                            {/* <b>{this.state.buttonName}</b> */}
                            </div>
                
             
                </div>

                <div className="col-12 col-md-6">
                <label>Whitelist</label>
                    <div className="inputs inputs_switdch input-groups">
               
                        <InputGroup className="">
                      
                        
                                <button variant="outline-secondary" className="get-started-btn-fill"  onClick={() => this.setState({ whitelistModal: true })}>Add Whitelist</button>
                          
                        </InputGroup>
                    </div>
                </div>

             
                <div className="col-6 col-sm-3 col-md-3 text-sm-left">
                                <button onClick={this.addWhitelistCSV.bind(this)} className="get-started-btn mr-4 mt-3">Update</button>

                            </div>
        </div>
        <br></br>
        <p className='yellow_txt font_20 mb-2'>Sale Information</p>
            <div className="row form_row">
                
                <div className="col-12 col-md-6">
                    <label>Price of Token</label>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl placeholder={ !saleInfo.presaleRate ? saleData.presaleRate : saleInfo.presaleRate } onChange={(e)=>{ if(!isFloat(e.target.value)){ console.log("Data Float : ",isFloat(e.target.value)); let data = saleInfo; data.presaleRate=e.target.value; this.setState({ saleInfo: data });} }} 
                                aria-describedby="basic-addon2"
                            />
                            <InputGroup.Append>
                                <button onClick={this.setPresaleRate.bind(this)} variant="outline-secondary" className="get-started-btn-fill">Update</button>
                            </InputGroup.Append>
                        </InputGroup>
                    </div>
                </div>
               
                <div className="col-12 col-md-6">
                    <label>Minimum Contribution</label>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl id="min_contribution"  placeholder={ !saleInfo.minEthLimit ? saleData.minEthLimit/10**18 : saleInfo.minEthLimit } onChange={(e)=>{ let data = saleInfo; data.minEthLimit=e.target.value; this.setState({ saleInfo: data }); }}  aria-describedby="basic-addon2"
                            />
                            <InputGroup.Append>
                                <button onClick={this.setMinBNB.bind(this)} variant="outline-secondary" className="get-started-btn-fill">Update</button>
                            </InputGroup.Append>
                        </InputGroup>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <label>Maximum Contribution</label>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl id="max_contribution"  placeholder={ !saleInfo.maxEthLimit ? saleData.maxEthLimit/10**18 : saleInfo.maxEthLimit } onChange={(e)=>{ let data = saleInfo; data.maxEthLimit=e.target.value; this.setState({ saleInfo: data }); }} aria-describedby="basic-addon2"
                            />
                            <InputGroup.Append>
                                <button onClick={this.setMaxBNB.bind(this)} variant="outline-secondary" className="get-started-btn-fill">Update</button>
                            </InputGroup.Append>
                        </InputGroup>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <label>Number of days for sale</label>

                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl id="days"  placeholder={ !saleInfo.startSale  ? "0" : saleInfo.startSale } onChange={(e)=>{ let data = saleInfo; data.startSale=e.target.value; this.setState({ saleInfo: data }); }} aria-describedby="basic-addon2"
                            />
                            <InputGroup.Append>
                                <button onClick={this.startPresaleEvent.bind(this)} variant="outline-secondary" className="get-started-btn-fill">Start Sale</button>
                            </InputGroup.Append>
                        </InputGroup>
                    </div>
                </div>
                {/* <div className="col-12 col-md-6">
                    <label>Deposit token</label>
                    <div className="inputs input-groups">
                        <InputGroup className="">
                            <FormControl id="amt"  value={ Object.keys(saleInfo).length == 0 ? "0" : saleInfo.deposit } onChange={(e)=>{ let data = saleInfo; data.deposit=e.target.value; this.setState({ saleInfo: data }); }} placeholder=""
                                aria-describedby="basic-addon2"
                            />
                            <InputGroup.Append>
                                <button variant="outline-secondary" className="get-started-btn-fill">Deposit</button>
                            </InputGroup.Append>
                        </InputGroup>
                    </div>
                </div> */}
                {/* <div className="col-12 col-md-6">
                <label>Whitelist</label>
                    <div className="inputs inputs_switdch input-groups">
               
                        <InputGroup className="">
                        <label className="switch mb-0">
                       
                <input type="checkbox"/>
                <span className="slider round"></span>
                </label>
                            <InputGroup.Append>
                                <button variant="outline-secondary" className="get-started-btn-fill"  onClick={() => this.setState({ whitelistModal: true })}>Add Whitelist</button>
                            </InputGroup.Append>
                        </InputGroup>
                    </div>
                </div> */}
              
                <div className="col-12 col-xl-12">
                    <div className="btns text-center">
                        <div className="row mt-3 row_admin_btns">
                            <div className="col-6 col-sm-3 col-md-3 text-sm-left">
                                <button onClick={this.stopSaleEvent.bind(this)} className="get-started-btn-fill mt-3">Stop sale</button>

                            </div>
                            <div className="col-6 col-sm-3 col-md-3">
                                <button onClick={this.withdrawToken.bind(this)} className="get-started-btn mt-3">Get Unsold</button>

                            </div>
                            <div className="col-6 col-sm-3 col-md-3">
                                <button onClick={this.BNBwithdraw.bind(this)} className="get-started-btn-fill mr-4 mt-3">Withdraw</button>


                            </div>
                            <div className="col-6 col-sm-3 col-md-3  text-sm-right">
                                <button onClick={this.Finalisesale.bind(this)} className="get-started-btn mt-3">Finalize sale</button>


                            </div>
                        </div>

                    </div>
                </div>

             

            </div>
        </div>
    </div>
      )
    }

}


export default Admin