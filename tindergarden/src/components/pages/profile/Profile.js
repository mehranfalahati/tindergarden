import React, { Component } from "react";
import "./profile.css"
import Leftside from "../leftside/Leftside";
import Rightside from "../rightside/Rightside";
import Searchbar from "../../searchbar/Searchbar";
import { Routes, Route, Link } from "react-router-dom";
import {Edit} from "@mui/icons-material"
import UserProfile from "./UserProfile";
import {currentUser, getCurrentUser} from "../../Users/auth";
import {fsDb} from "../../../Firebase/firebase";




class Profile extends Component {
    constructor(){
        super();
        this.state = {
            name: '',
            userImage: '',
            coverPhoto: '',
            userDocId: '',
        }
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

    componentDidMount = () => {
        this.fetchUserInfo();
    }



    render() {
        return (
            <>
                <div className="mainContainer">
                    <Leftside />
                    <div className="profilePicture">
                        <img className="profilePic" src={this.state.userImage} />
                        <img className="profileCover" src={this.state.coverPhoto}/>
                        <div className="userInfo">
                            <UserProfile userId={getCurrentUser().uid}/>
                        </div>
                        <Link className="edit" to="/edit"><Edit /></Link>
                        <p>Here are your posts:</p>
                         <UserPost />
                    </div>      
                         <Rightside />
                         
                </div>

            </>
        )
    }
}


class UserPost extends Component {
    constructor() {
        super();
        this.state = {
            posts: []
        }
    }

    componentDidMount = () => {
        this.fetchFeeds();
    }


    fetchFeeds = () => {
        fsDb.collection('posts').where('post_id', '==', getCurrentUser().email)
        .get().then((snapshot) => {
            let posts = [];
            snapshot.forEach((post) => {
                const postID = post.id;
                const postsObj = post.data();
                const postAuthor = post.data().user_id;
                //const postTime = post.data().createdAt;
                posts.push({...postsObj, postID, postAuthor});
            });
            this.setState({posts: posts});
        });
    }

    async deletePost (event) {
        console.log(event)
        await fsDb.collection('posts').doc(event).delete()
        .then(() => {
            console.log("Document successfully deleteed!");
            //this.uploadPost;
        }).catch((error) => {
            console.error("Error removing post: ", error);
        })
    }

    renderPosts = () => {
        const posts = this.state.posts;        
            return posts.map((post, index) => {         
                              
                return (           
                    
                    <div key={index}>
                        {/* <p>You created this post on: {post.postTime}</p> */}
                        <p>Posts={post.post}</p>                   
                            <button  onClick={() => this.deletePost(post.postID)} >delete </button>                       
                    </div>
                    
                )
            })
        
    }

    render() {
        return (
            <div>
                {this.renderPosts()}
            </div>
        );
    }

}

export default Profile;