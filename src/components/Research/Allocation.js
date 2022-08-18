import React, { Component } from 'react';
import { useContext, useEffect, useState } from "react";
import { getAccount } from '../../hooks/useAccount';
import { claimToken } from '../../hooks/useBuy';




class Allocation extends Component
{
    constructor(props) {
        super(props);
        this.state = {
          allocation: []
        }
        
    }

    async Claim(){
      console.log("Data test")
      await claimToken(this.props.saleAddress,getAccount());
      this.props.onUpdate();
    }

    render() {
        
      const { userData,saleData,allocationData } = this.props
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

     
        
      return (
        <div className={ saleData.isClaimable ? 'table-responsive' : 'table-responsive blur'}>
        <table className="table table-bordered table_style_1 table_style_2">
<thead>
<tr>
<th scope="col">No.</th>
<th scope="col">Allocation</th>
<th scope="col">Unlock On</th>
<th scope="col">Claimed</th>

</tr>
</thead>
<tbody>

{  allocationData && allocationData.map((index)=>
<tr>
<td>{index.no}</td>
<td>{index.allocation/10**saleData.decimals}</td>
<td>{new Date(index.unlockon*1000).toLocaleDateString("en-US", options)}</td>
<td className='text-left'>
<button onClick={this.Claim.bind(this)} disabled={!index.isClaimed} className="get-started-btn">{index.isDid ? 'Claimed' : 'Claim'}</button>
</td>

</tr>)
}

</tbody>
</table>
        </div>
      )
    }

}


export default Allocation