import React, { Component } from 'react';
import { useContext, useEffect, useState } from "react";




class Poolinformation extends Component
{
    constructor(props) {
        super(props);
        
    }
    render() {
        
      const { saleInfo,value } = this.props
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

      
        
      return (
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
      )
    }

}


export default Poolinformation