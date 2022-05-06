

import "./edit.css"

import React, { Component }  from "react";

import { Upload, Button, message } from "antd"
import { UploadOutlined } from '@ant-design/icons';


import { fsDb, storage } from "../../../Firebase/firebase";
import { getCurrentUser } from "../../Users/auth";







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
        

        this.uploadProps = {
            name: 'file',            
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
       

        ////////    Upload a user image ////////

    uploadUserImage = (file) => {
        let storageRef = storage.ref()
        let fileRef = storageRef.child(file.name)
        return fileRef.put(file).then(() => {
            fileRef.getDownloadURL().then((url) => {
            fsDb.collection("users").doc(this.state.userDocId)
            .set({ userImage: url}, {merge: true}).then ((firebaseImage) => {
                
                    this.setState({userImage: url })
                })
            })
        })           
    };
    /////////   Upload cover photo////////
    uploadCover = (file) => {
        let storageRef = storage.ref()
        let fileRef = storageRef.child(file.name)
        return fileRef.put(file).then(() => {
            fileRef.getDownloadURL().then((url) => {
            fsDb.collection("users").doc(this.state.userDocId)
            .set({ coverPhoto: url}, {merge: true}).then ((firebaseImage) => {
                
                    this.setState({coverPhoto: url })
                })
            })
        })           
    };
    
        
    
    ///Fetching the current user info
    componentDidMount(){
        this.fetchUserInfo();        
    }
    
    fetchUserInfo = () => {
        fsDb.collection('users').where('user_id', '==', getCurrentUser().uid).get()
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



 //// Update the current user info to DB
    saveProfile (data) {        
        fsDb.collection("users").where("user_id", "==", getCurrentUser().uid).get()
        .then((snapshots) => {            
            snapshots.forEach((Profile) => {                
                fsDb.collection("users").doc(this.state.userDocId).set({
                    name: data.name, bio: data.bio},
                    {merge:true}).then(() => { this.fetchUserInfo();

                })
            });
        })
    }
    



 //// handlers//////
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

        
 //// Edit From ///////
    showForm() {
        return (
            <div>
                <form className="editPage">
                    <label className="labelOne">Name:</label> <input className="labelOne" onChange={this._handleName} type="text" value={this.state.name} required placeholder={this.props.name} />
                    <hr></hr>
                    <label className="labelTwo">About me:</label><textarea className="labelThree" onChange={this._handlebio} type="text" value={this.state.bio} />
                    <Upload {...this.uploadProps} action={this.uploadUserImage}>
                        <Button className="uploadButton" icon={<UploadOutlined />}>Upload Profile Photo</Button>
                    </Upload>
                    <Upload {...this.uploadProps} action={this.uploadCover}>
                        <Button className="uploadButton" icon={<UploadOutlined />}>Upload Cover Photo</Button>
                    </Upload>

                    <button className="saveEdit" onClick={this._handleSubmit}>Save</button>
                    <button className="saveEdit" onClick={() => this.setState({showForm: false})}>Cancel</button>
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
        //const info = this.props.info;
         return (
            <div>
                <div>
                    {/* <h2>Name:{info.name}</h2>
                    <h2>UserImage:{info.userImage}</h2>
                    <h2>coverPhoto:{info.coverPhoto}</h2>*/}
                </div>
            </div>
         )
     }
 }
 

export default Edit;