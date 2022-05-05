import React, { Component, useState } from "react";
import { fsDb } from "../../../Firebase/firebase";
import { getCurrentUser } from "../../Users/auth";
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
                const postID = post.id;
                const postsObj = post.data();
                const postAuthor = post.data().post_id;
                
                posts.push({...postsObj, postID, postAuthor});
            });
            this.setState({posts: posts});
        });
    }


    renderPosts = () => {
        
        const posts = this.state.posts;        
            return posts.map((post, index) => {
                return (
                    <div className="feedspost" key={index}>
                        <p>Posts1={post.post}</p>                    
                        <h2>post Author:{post.postAuthor}</h2>
                        
                                               
                    </div>
                )
            })
        
    }

    render() {
        return (
            <div className="feedsContainer">
                <h2>TimeLine</h2>    

                {this.renderPosts()}               

            </div>
        )
    }
}

export default Feeds;