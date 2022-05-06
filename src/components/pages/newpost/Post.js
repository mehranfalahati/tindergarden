import React, { Component } from "react";
import { getCurrentUser } from "../../Users/auth";


import {db} from '../../../Firebase/firebase'


import "./post.css"





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

    //geting the post of the current user from the db   
    getPost() {
        db.collection('users').doc(getCurrentUser().uid).get().then((doc)=>{
            if (doc.exists) {                    
                    console.log("Document data:", doc.data());                    
                } else {                    
                    console.log("No such document!");
                }
        }).catch((error) => (error));
    };

    renderPost(event) {
        console.log(event.target.value);
        this.setState({post: event.target.value});
    }
   



    

    ////////Uploading a post to the db    
    async uploadPost(event) {        
        event.preventDefault(); 
               
        const user_id = getCurrentUser().email; //user_id here is the useremail which is used as a post Id for making association between posts and users inside the db
        await db.collection("posts").add({...this.state, post_id: user_id, createdAt: new Date()}).then(() => { 
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