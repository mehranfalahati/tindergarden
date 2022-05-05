import React, { Component } from "react";
import { getCurrentUser, signInWithGoogle, signup } from "../../Users/auth";
import { Input, Button, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {db, fsDb} from '../../../Firebase/firebase'
import moment from "moment";
import { Link } from "react-router-dom";
import post from "./post.css"
const { TextArea } = Input




class Post extends Component {
    constructor() {
        super();
        this.state ={
            post: '',
            post_id: '',
            createdAt: '',
            
        };
        this.getPost = this.getPost.bind(this);
        this.uploadPost = this.uploadPost.bind(this);
        this.renderPost = this.renderPost.bind(this);
        
        
    }

       
    getPost() {
        db.collection('users').doc(getCurrentUser().uid).get()
        .then((doc) => {
            if (doc.exists) {                    
                    console.log("Document data:", doc.data());                    
                } else {                    
                    console.log("No such document!");
                }
        }) .catch((error) => ("Error getting document: ", error));
        
    };

    renderPost (event) {
        this.setState({post: event.target.value});
    }

    async uploadPost(event) {        
        event.preventDefault(); 
               
        const user_id = getCurrentUser().email;
        await db.collection("posts").add(
           {...this.state, post_id: user_id, createdAt: (new Date)}
        ).then(() => {
            this.renderPost();
            console.log("post successfully posted!");
            
        });
    }


    render() {
        return (
            <div className="postContainer">
                <h2 className="h2post">Create a New Post</h2>
                <form onSubmit={this.uploadPost}>
                    <textarea className="postBox" placeholder="What is in your mind?" type="text" onChange={this.renderPost} value={this.state.post} required />                    
                    <input className="postbutton" type='submit' value="Post" />                    
                </form>      
                <br></br>
            </div>
        );
    }
}

export default Post;