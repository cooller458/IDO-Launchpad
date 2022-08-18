import React, { Component } from 'react';
import { useContext, useEffect, useState } from "react";
import { Modal, InputGroup, FormControl } from 'react-bootstrap';
import { getSaleInfoCard } from '../../hooks/useContract';
import { ONEDAYINSECONDS } from '../../config/env';




class Requestmodal extends Component
{
    constructor(props) {
        super(props);
        this.state = {          
            requestModal: true,
            settingModal: true
           
        };
    }

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

    async loadMore(){
        const saleDetail = await getSaleInfoCard(this.props.info);
        console.log("Pop Up data : ",saleDetail)
        this.setState({ saleInfo: saleDetail });

    }

    componentDidMount(){
        this.showLoader();
        this.loadMore();
        this.hideLoader();
    }

  



    render() {
        
  
        const {requestModal, saleInfo} = this.state
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        
      return (
<Modal className="wallet-modal" show={requestModal} centered>
                        <Modal.Header className="pb-0">
                            <div>
                                <h3 className="sec-head ">{saleInfo && saleInfo.name}</h3>
                            </div>
                            <button type="button" class="close" onClick={() => this.props.onDismiss()}><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>

                        </Modal.Header>
                        <Modal.Body className="select-wallet text-center pt-0">
                        <form className='mt-5 pb-5'>
                       
                        <div className='table-responsive'>
        <table className="table table-bordered table_style_1">
<thead>
<tr>
<th scope="col" colSpan="2">Pool Information </th>

</tr>
</thead>
<tbody>
<tr>
<td>Opens</td>
<td>{saleInfo && new Date(saleInfo.startTime*1000).toLocaleDateString("en-US", options)}</td>

</tr>
<tr>
<td>Closes</td>
<td>{saleInfo && new Date(saleInfo.endTime*1000).toLocaleDateString("en-US", options)}</td>

</tr>
<tr>
<td>Swap Rate</td>
<td>1 BNB = {saleInfo && saleInfo.presaleRate} {saleInfo && saleInfo.symbol}</td>

</tr>
{/* <tr>
<td>Soft Cap</td>
<td>{saleInfo && (parseInt(saleInfo.softCap)/10**18).toFixed(3)} BNB</td>

</tr> */}
<tr>
<td>Hard Cap</td>
<td>{saleInfo && (parseInt(saleInfo.hardCap)/10**18).toFixed(2)} BNB</td>

</tr>
<tr>
<td>Soft Cap</td>
<td>{saleInfo && (parseInt(saleInfo.softCap)/10**18).toFixed(2)} BNB</td>

</tr>
<tr>
<td>Total Users Participated</td>
<td>{saleInfo && saleInfo.participants}</td>

</tr>
<tr>
<td>Total Funds Swapped</td>
<td>{saleInfo && (saleInfo.earnedCap/10**18).toFixed(2)} BNB</td>

</tr>
<tr>
<td>Access Type</td>
<td>{saleInfo && saleInfo.isWhitelisted ? 'Private' : 'Public'}</td>

</tr>
</tbody>
</table>
        </div>
        <div className='table-responsive'>
<table className="table table-bordered table_style_1">
<thead>
<tr>
<th scope="col" colSpan="2">Token Information</th>

</tr>
</thead>
<tbody>
<tr>
<td>Name</td>
<td>{saleInfo && saleInfo.name}</td>

</tr>
<tr>
<td>Token Symbol</td>
<td>{saleInfo && saleInfo.symbol}</td>

</tr>
<tr>
<td>Token Decimals</td>
<td>{saleInfo && saleInfo.decimals}</td>

</tr> 
{ saleInfo && saleInfo.isWithoutToken ? <></>:
<tr>
<td>Explorer</td>
<td><a href={`https://bscscan.com/address/${saleInfo && saleInfo.tokenAddress}`} target='_blank' className='a_blue_txt'>{saleInfo && saleInfo.tokenAddress}</a></td>

</tr> 
}
<tr>
<td>Pancake Listing</td>
<td>{saleInfo && saleInfo.isPancake ? 'Enabled' : 'Disabled'}</td>

</tr> 
<tr>
<td>Vested Claim</td>
<td>{saleInfo && saleInfo.isVested ? 'Enabled' : 'Disabled'}</td>
</tr>
{ saleInfo && !saleInfo.isVested ? <></>:
<>
<tr>
<td>Vesting Percentage</td>
<td>{saleInfo && saleInfo.vestingPercent/100} %</td>

</tr> 
<tr>
<td>Vesting Interval Period</td>
<td>{saleInfo && saleInfo.vestingInterval/ONEDAYINSECONDS} Day(s)</td>

</tr> 
</>
}

{/* <tr>
<td>Website</td>
<td>{saleInfo && saleInfo.website}</td>

</tr>  */}


</tbody>
</table>
</div> 
                    </form>
                        </Modal.Body>
                    </Modal>
      )
    }

}


export default Requestmodal