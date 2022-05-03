
import { ResetTvRounded, TripOriginSharp } from "@mui/icons-material";
import { render } from "@testing-library/react";
import React, { Component }  from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Upload, Message, Button, message } from "antd"
import { UploadOutlined } from '@ant-design/icons';
import { Card, Input  } from 'antd';
import { ActionTypes } from "@mui/base";
import { fsDb } from "../../../Firebase/firebase";
import { getCurrentUser } from "../../Users/auth";
import Profile from "../profile/Profile";



const { TextArea } = Input;
class Edit extends Component {
    constructor() {
        super();
        this.state = {
            showForm: false,
            name: '',
            family: ''
        } 
        this.uploadFile = this.uploadFile.bind(this);

        ////////Upload a file

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
                if (info.file.status === 'done'){
                   message.success(`${info.file.name} is uploaded successfully!`) 
                }               
            },
        };
        
    }
    ///Fetching user info
    componentDidMount(){
        this.fetchUserInfo();        
    }
    
    fetchUserInfo = () => {
        fsDb.collection('user_profile').where('user_id', '==', getCurrentUser().uid).get()
        .then((snapshots) => {
            snapshots.forEach((f) => {
                console.log(f);
                this.setState({
                    name: (f.data()).name,
                    userDocId: f.id                    
                });
                console.log(this.state.name);
            });        
        });
    };


    uploadFile = (file) => {
        //todo
    }

 //// Update user info to DB
    saveProfile (data) {
        fsDb.collection("user_profile").where("user_id", "==", getCurrentUser().uid).get()
        .then((snapshots) => {
            snapshots.forEach((Profile) => {
                fsDb.collection("user_profile").doc(Profile.id).set({
                    name: data.name},
                    {merge:true}).then(() => { this.fetchUserInfo();

                })
            });
        })
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

    // _handleFamilyname = (event) => {
    //     this.setState({family: event.target.value})
    // }

     
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


    //// Render Form
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