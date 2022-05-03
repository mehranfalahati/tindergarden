import { ResetTvRounded, TripOriginSharp } from "@mui/icons-material";
import { render } from "@testing-library/react";
import React, { Component }  from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Upload, Message, Button, message } from "antd"
import { UploadOutlined } from '@ant-design/icons';
import { Card, Input  } from 'antd';
import { ActionTypes } from "@mui/base";


const { TextArea } = Input;
class Edit extends Component {
    constructor() {
        super();
        this.state = {
            showForm: false,
            name: 'Mehran',
            family: 'Falahati'
        } 


        this.uploadProps = {
            name: 'file',
            action: this.uploadFile,
            headers: {
                authorization: 'authorization-text'
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                message.success(`${info.file.name} is uploaded successfully!`)
            }
        }
    }

    componentDidMount(){
        this.fetchUserInfo();
    }

    fetchUserInfo = () => {
        //todo
    }


    uploadFile = (file) => {
        //todo
    }

 //// Update
 saveChanges () {

 }



 //// handler
    _handleSubmit = (event) => {
        event.preventDefault();
        this.saveChanges(this.state)
        this.setState({showForm: false})
    }

    _handleName = (event) => {
        this.setState({name: event.target.value});
    }

    _handleFamilyname = (event) => {
        this.setState({family: event.target.value})
    }

     
 //// From
    showForm() {
        return (
            <div>
                <form className="editPage">
                    <label className="labelOne">First Name:</label> <input onChange={this._handleName} type="text" value={this.state.name} required />
                    <label className="labelTwo">Family Name:</label> <input onChange={this._handleFamilyname} type="text" value={this.state.family} required />
                    <Upload {...this.uploadProps}>
                        <Button icon={<UploadOutlined />}>Upload Profile Photo</Button>
                    </Upload>

                    <button onClick={this._handleSubmit}>Save</button>
                    <button onClick={() => this.setState({showForm: false})}>Cancel</button>
                </form>
            </div>
        )
    }


    //// Render
    render() {
        return(
            <div>
                <button onClick={() => this.setState({showForm: true})} type="primary" >Edit Profile</button>
                <button><Link to="/newpost">New Post</Link></button>
                {this.state.showForm ? this.showForm() : null}
                <div> <UserInfo info= {this.state} imgURL= {this.state.userImage} /></div>
            </div>
        )
    }
}

class UserInfo extends Component {
     render() {
         const info = this.props.info;
         return (
            <div>
                <div>
                    <h2>Name:{info.name}</h2>
                    <h2>Family Name:{info.family}</h2>
                </div>
            </div>
         )
     }
 }
 

export default Edit;