import React, { Component } from 'react';
import { useContext, useEffect, useState } from "react";
import { Modal, InputGroup, FormControl } from 'react-bootstrap';
import { getAccount } from '../../hooks/useAccount';
import { changePresaleFee, changeTokenFee } from '../../hooks/useProjects';





class Settings extends Component
{
    constructor(props) {
        super(props);
        this.state = {          
            requestModal: true,
            presaleFee: "",
            shareFee: ""
           
        };
    }



    async presaleFeeUpdate(){
        await changePresaleFee(this.state.presaleFee,getAccount())
    }

    async presaleShareUpdate(){
        await changeTokenFee(this.state.shareFee,getAccount())
    }

 

  



    render() {
        
  
        const {requestModal,presaleFee,shareFee} = this.state

        
      return (
<Modal className="wallet-modal" show={requestModal} centered>
                        <Modal.Header className="pb-0">
                            <div>
                                <h3 className="sec-head ">Settings</h3>
                            </div>
                            <button type="button" class="close" onClick={() => this.props.onDismiss()}><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>

                        </Modal.Header>
                        <Modal.Body className="select-wallet text-center pt-0">
                      
                        <div className="inputs input-groups date_inoput_grps mb-4">
                        <InputGroup className="datepicker_input">
                        <FormControl onChange={(e)=> this.setState({ presaleFee: e.target.value })}
                        placeholder="Presale Fee in BNB" />
                          
                        </InputGroup>
                        <InputGroup.Append className='cur_pointer'>
                        <button onClick={()=>this.presaleFeeUpdate()} variant="outline-secondary" className="get-started-btn-fill">
                             Update
                             </button>
                            </InputGroup.Append>
                    </div>

                    <div className="inputs input-groups date_inoput_grps">
                        <InputGroup className="datepicker_input">
                        <FormControl onChange={(e)=> this.setState({ shareFee: e.target.value })}
                        placeholder="Share Percentage % " />
                          
                        </InputGroup>
                        <InputGroup.Append className='cur_pointer'>
                        <button onClick={()=>this.presaleShareUpdate()} variant="outline-secondary" className="get-started-btn-fill">
                             Update
                             </button>
                            </InputGroup.Append>
                    </div>
                  
                        </Modal.Body>
                    </Modal>
      )
    }

}


export default Settings