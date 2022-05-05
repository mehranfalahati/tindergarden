import React, { Component, useState } from "react";
import { fsDb } from "../../../Firebase/firebase";
import { getCurrentUser } from "../../Users/auth";
import moment from "moment";
import feeds from "./feeds.css"


class Feeds extends Component {

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
        fsDb.collection('posts').get()
        .then((snapshot) => {
            let posts = [];
            snapshot.forEach((post) => {
                const postID = post.id; //this is the generated post id by the firebase
                const postsObj = post.data();
                const postAuthor = post.data().post_id;  //this is dedicated post id which is user.email: useremail was used for making association between users and posts in the db
                const postTime = moment(post.data().createdAt.toDate()).format('DD MM YYYY');
                posts.push({...postsObj, postID, postAuthor, postTime});
            });
            this.setState({posts: posts});
        });
    }


    renderPosts = () => {
        
        const posts = this.state.posts;        
            return posts.map((post, index) => {
                return (
                    <div className="feedspost" key={index}>
                        <h2 className="userh2">Created by:{post.postAuthor}</h2>
                        <p className="userp">{post.post}</p>                    
                        <h4 className="userh4">Posted:{post.postTime}</h4>
                    </div>
                )
            })
        
    }

    render() {
        return (
            <div className="feedsContainer">
                <h2 className="feedsh2">TimeLine</h2>    

                {this.renderPosts()}               

            </div>
        )
    }
}

export default Feeds;