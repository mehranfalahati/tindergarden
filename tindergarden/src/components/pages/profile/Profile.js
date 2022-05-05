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
import moment from "moment";




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

    //Fetching the information of the current user for picking up userImage and coverPhoto URL from db
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
                        <p className="profilepostp">All Your Posts</p>
                         <UserPost />
                    </div>                     
                    <Rightside/>                      
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
        fsDb.collection('posts').where('post_id', '==', getCurrentUser().email) //useremail was used as a post_id to make assciation in db
        .get().then((snapshot) => {
            let posts = [];
            snapshot.forEach((post) => {
                const postID = post.id;
                const postsObj = post.data();
                const postAuthor = post.data().user_id;
                const postTime = moment(post.data().createdAt.toDate()).format('MMMM Do YYYY');
                posts.push({...postsObj, postID, postAuthor, postTime});
            });
            this.setState({posts: posts});
        });
    }

    async deletePost (event) {
        console.log(event)
        await fsDb.collection('posts').doc(event).delete()
        .then(() => {
            console.log("Document successfully deleteed!");
            this.fetchFeeds();            
        }).catch((error) => {
            console.error("Error removing post: ", error);
        })
    }

    renderPosts = () => {
        const posts = this.state.posts;        
            return posts.map((post, index) => {         
                              
                return (           
                    
                    <div className="postprofile" key={index}>
                        <p>{post.post}</p>       
                        <p className="profilep">Created on: {post.postTime}</p>
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