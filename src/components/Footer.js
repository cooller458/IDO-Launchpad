import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../css/footer.css';
import policy from "../images/Cookie-Policy.pdf"



class Footer extends Component 
{ 

    componentDidMount(){
        if(localStorage.getItem("cookie")){
            this.setState( { cookies : true });
        }
    }
    constructor(props)
    {
        super(props);
        this.state = {
            cookies : false
        }
    }
    
    accept(){
        console.log("Accept : ")
        localStorage.setItem("cookie","true");
        this.setState( { cookies : true });
    }
   
    render() {
		return (
           <div>
               <div className="footer mt-5">
               <div className="footer_bg_purple">
                  
               <div className="footer_sec_2">
               <div className="container container_custom">
                  
                  
                               <hr className='hr_yellow'/>
                               <div className='row'>
                                   <div className='col-12 col-lg-4'>
                                   <p className="mb-0 footer_text mb-3 mt-3">© 2022 Balance Network, Ltd. All rights reserved.</p>

                                   </div>
                                   <div className='col-12 col-lg-4'>
                                   <ul className="footer_ul footer_ul_hor">
                                    <li><a href="https://t.me/BalanceNetwork" target="_blank" className="mr-3"><span className="fa fa-paper-plane"></span></a></li>                                   
                                   <li><a href="https://twitter.com/balance_web3" target="_blank" className="mr-3"><span className="fa fa-twitter"></span></a></li>
                                   <li><a href="https://www.instagram.com/balancenetworkweb3" target="_blank" className="mr-3"><span className="fa fa-instagram"></span></a></li>
                                   <li><a href="http://balancenetwork.medium.com" target="_blank" className="mr-3"><span className="fab fa-medium-m"></span></a></li>
                                  
                                   <li><a href="https://www.reddit.com/r/BalanceNetwork" target="_blank" className="mr-3"><span className="fa fa-reddit-alien"></span></a></li>
                                   <li><a href="https://discord.com/invite/7KbjPHMA" target="_blank" className="mr-3"><span className="fab fa-discord"></span></a></li>

                                    
                               </ul>

                                   </div>
                                   { this.state.cookies ? <></> :
                                <div className='col-12 col-lg-4 text-lg-right'>
                                   <p className="mb-0 footer_text mb-3 mt-3">
                                       <a href='https://docs.balancenetwork.io/views/About/privacypolicy.html' className='sett'>Cookie Settings</a>

                                    <a onClick={()=>this.accept()} target="_blank" className="get-started-btn-fill ml-2">Accept</a>

                                       </p>
                                       
                                </div>
                                }
                               </div>
                   </div>
               </div>
               </div>
       
           </div>
           </div>
        );
    }
}

export default Footer