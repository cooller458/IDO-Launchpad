import React, { Component } from 'react';
import { useContext, useEffect, useState } from "react";
import { Modal, InputGroup,FormControl,ProgressBar } from 'react-bootstrap';
import { getAccount } from '../../hooks/useAccount';
import { addWhitelistMembers } from '../../hooks/useAdmin';
import toast, { Toaster } from 'react-hot-toast';
import { IsValidAddress } from '../../hooks/useContract';


class WhitelistModal extends Component
{
    constructor(props) {
        super(props);
        this.state = {   
                   
            whitelistModal: true,
            inputList:[{ user: "", bnbvalue: "" }],
            isPending: false,
           
        };
    }
    handleInputChange = async(e, index) => {
        const { name, value } = e.target;
        const list = [...this.state.inputList];
           list[index][name] = value;
           console.log(list, "sdf");
           if(name == "user" && value.length == 42){
               const valid = await IsValidAddress(value);
               if(!valid){
                toast.error(`Non Valid Address (${value}) !`,
                {
                    style: {
                    minWidth: '700px',
                    minHeight: '55px'
                    }
                });
               }

           }
       
      };
    
    
        handleRemoveClick = index => {
            console.log("index", index);
            const list = [...this.state.inputList];
            list.splice(index, 1);
            this.setState ({ inputList: list });
    
          };

        handleAddUserList = async() => {
            this.setState({ isPending : true });
            await addWhitelistMembers(this.state.inputList,this.props.saleAddress,getAccount());
            this.setState({ isPending : false });
            this.props.onDismiss()
        }
         
          // handle click event of the Add button
           handleAddClick = () => {
            this.setState ({ inputList: [...this.state.inputList, { user: "", bnbvalue: "" }] });
        };
    render() {
        
  
        const {whitelistModal} = this.state

        
      return (


                    <Modal className="buy-modal" dialogClassName="modal-90w modal-dialog-lg" show={whitelistModal} centered>
                    <Modal.Header>
                    <h3 className="sec-head "><i className="fa fa-user-plus pr-2"></i> Add Whitelist Users</h3>
                            <button type="button" class="close" onClick={this.props.onDismiss.bind(this)} ><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                        </Modal.Header>
                        <Modal.Body className="select-wallet pt-3">


                        {this.state.inputList.map((x, i) => {
                        return (
                        <div>

                        <div className="row form_row row_add_remove modalbtn mb-2 px-3">
                        <div className="col-6 col-sm-5 px-1">
                        <div className="inputs">
                        <InputGroup className="">
                                <FormControl name="user" placeholder="Wallet Address"  onChange={e => this.handleInputChange(e, i)} />

                        </InputGroup>
                        </div>
                        </div>
                        <div className="col-6 col-sm-5  px-1">
                        <div className="inputs">
                        <InputGroup className="">
                        <FormControl name="bnbvalue" placeholder="Allocated BNB Value"  onChange={e => this.handleInputChange(e, i)} />
                            
                            
                        </InputGroup>
                        </div>
                        </div>
                        {this.state.inputList.length !== 1 && 
                        <div className="col-2 col-sm-1  px-1">
                            <button
                            className=" btn btn-danger  mb-2 mt-sm-2 mt-3  badge badge-yellow-fill btn_user badge-yellow-fill-big"
                            onClick={() => this.handleRemoveClick(i)}><i className="fa fa-trash-alt"></i></button>
                        </div>}


                        {this.state.inputList.length - 1 === i && 
                        <div className="col-2 col-sm-1  px-1">
                        <button className="badge  badge-yellow-fill-big mt-sm-2 mt-3 btn_user get-started-btn btn btn btn-withdraw btn-theme  mb-2 mt-0 ml-1" onClick={this.handleAddClick}><i className="fa fa-user-plus"></i></button>
                        </div> 
                        }





</div>

</div>
);
})}


<div className="">
        <button className="badge badge-yellow-fill badge-yellow-fill-big mt-2 float-right" disabled={this.state.isPending} onClick={this.handleAddUserList.bind(this)}> { this.state.isPending ? 'Adding User(s) List...' : 'Add User(s) List' } </button>

</div>

</Modal.Body>
                        
                </Modal>
      )
    }

}


export default WhitelistModal