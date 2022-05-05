
import { ResetTvRounded, TripOriginSharp } from "@mui/icons-material";
import { render } from "@testing-library/react";
import React, { Component }  from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Upload, Message, Button, message } from "antd"
import { UploadOutlined } from '@ant-design/icons';
import { Card, Input  } from 'antd';
import { ActionTypes } from "@mui/base";
import { fsDb, storage } from "../../../Firebase/firebase";
import { getCurrentUser } from "../../Users/auth";
import Profile from "../profile/Profile";
import {getStorage, ref} from "firebase/storage"

const { TextArea } = Input;


class Edit extends Component {
    constructor() {
        super();
        this.state = {
            showForm: false,
            name: '',
            bio: '',
            userImage: '',
            coverPhoto: '',
            userDocId: '',            
        } 
        this.uploadFile = this.uploadFile.bind(this);

        this.uploadProps = {
            name: 'file',
            action: this.uploadFile,
            header: {
                authorization: 'authorization-text'
            },
            onChange(info) {
                if (info.file.status !== 'Uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                }
            }
        }
    }
       

        ////////Upload a file

        uploadFile = (file) => {
            let storageRef = storage.ref()
            let fileRef = storageRef.child(file.name)
            return fileRef.put(file).then(() => {
                fsDb.collection("posts").doc(this.state.userDocId)
                .set({ userImage: `gs://tindergarden-1508c.appspot.com/${file.name}`}, {merge: true}).then ((firebaseImage) => {
                    fileRef.getDownloadURL().then((url) => {
                        this.setState({userImage: url })
                    })
                })
            })           
        };
        
    
    ///Fetching user info
    componentDidMount(){
        this.fetchUserInfo();        
    }
    
    fetchUserInfo = () => {
        fsDb.collection('user_profiles').where('user_id', '==', getCurrentUser().uid).get()
        .then((snapshots) => {
            snapshots.forEach((f) => {
                this.setState({
                    name: (f.data()).name,
                    userImage: (f.data()).userImage,
                    coverPhoto: (f.data()).coverPhoto,
                    userDocId: f.id                    
                });                
            });        
        });
    };



 //// Update user info to DB
    saveProfile (data) {
        fsDb.collection("user_profiles").where("user_id", "==", getCurrentUser().uid).get()
        .then((snapshots) => {
            snapshots.forEach((Profile) => {
                fsDb.collection("user_profiles").doc(Profile).set({
                    name: data.name},
                    {merge:true}).then(() => { this.fetchUserInfo();

                })
            });
        })
    }
    



 //// handler
    _handleSubmit = (event) => {
        event.preventDefault();
        this.saveProfile(this.state)
        this.setState({showForm: false})
    }

    _handleName = (event) => {
        this.setState({name: event.target.value});
    }

    _handlebio = (event) => {
        this.setState({bio: event.target.value});
    }

        
 //// From
    showForm() {
        return (
            <div>
                <form className="editPage">
                    <label className="labelOne">My Name:</label> <input onChange={this._handleName} type="text" value={this.state.name} required placeholder={this.props.name} />
                    <label>About me:</label><input onChange={this._handlebio} type="textarea" value={this.state.bio} />
                    <Upload {...this.uploadProps}>
                        <Button icon={<UploadOutlined />}>Upload Profile Photo</Button>
                    </Upload>
                    <Upload {...this.uploadProps}>
                        <Button icon={<UploadOutlined />}>Upload Cover Photo</Button>
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
                {/* <button><Link to="/newpost">New Post</Link></button> */}
                {this.state.showForm ? this.showForm() : null}
                <div> <UserInfo info= {this.state} imgURL= {this.state.userImage} coverPhoto={this.state.coverPhoto} /></div>
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
                    <h2>UserImage:{info.userImage}</h2>
                    <h2>coverPhoto:{info.coverPhoto}</h2>                    
                </div>
            </div>
         )
     }
 }
 

export default Edit;