import React, { Component } from 'react';
import { useContext, useEffect, useState } from "react";
import { ONEDAYINSECONDS } from '../../config/env';

class Tokeninformation extends Component
{
    constructor(props) {
        super(props);
        
    }
    render() {    

      const { saleData } = this.props
        
      return (
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
<td>{saleData && saleData.name}</td>

</tr>
<tr>
<td>Token Symbol</td>
<td>{saleData && saleData.symbol}</td>

</tr>
<tr>
<td>Token Decimals</td>
<td>{saleData && saleData.decimals}</td>

</tr> 
{ saleData && saleData.isWithoutToken ? <></>:
<tr>
<td>Explorer</td>
<td><a href={`https://bscscan.com/address/${saleData && saleData.tokenAddress}`} target='_blank' className='a_blue_txt'>{saleData && saleData.tokenAddress}</a></td>

</tr> 
}
<tr>
<td>Pancake Listing</td>
<td>{saleData && saleData.isPancake ? 'Enabled' : 'Disabled'}</td>

</tr> 
<tr>
<td>Vested Claim</td>
<td>{saleData && saleData.isVested ? 'Enabled' : 'Disabled'}</td>
</tr>
{ saleData && !saleData.isVested ? <></>:
<>
<tr>
<td>Vesting Percentage</td>
<td>{saleData && saleData.vestingPercent/100} %</td>

</tr> 
<tr>
<td>Vesting Interval Period</td>
<td>{saleData && saleData.vestingInterval/ONEDAYINSECONDS} Day(s)</td>

</tr> 
</>
}

{/* <tr>
<td>Website</td>
<td>{saleData && saleData.website}</td>

</tr>  */}


</tbody>
</table>
        </div> 
      )
    }

}


export default Tokeninformation