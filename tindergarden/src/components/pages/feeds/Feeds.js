import React, { Component } from "react";
import { fsDb } from "../../../Firebase/firebase";
import { getCurrentUser } from "../../Users/auth";

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

    ////////////////////////
    fetchFeeds = () => {
        fsDb.collection('posts').get().then((snapshot) => {
            let posts = [];
            snapshot.forEach((post) => {
                const postID = post.id;
                const postsObj = post.data();
                const postAuthor = post.data().user_id;
                
                posts.push({...postsObj, postID, postAuthor});
            });
            this.setState({posts: posts});
        });
    }

    ///////////////////////
    // deleteFeed = (documentID) => {
    //     const newPosts = this.state.posts.filter((post) => {
    //         return post.documentID !== documentID;
    //     })
    //     this.setState({posts: newPosts});
    // }
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


    ///////////////////////
    renderPosts = () => {
        const posts = this.state.posts;        
            return posts.map((post, index) => {
                return (
                    <div key={index}>
                        <h1>post Author:{post.postAuthor}</h1>
                        <p>Posts1={post.post}</p>
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
        )
    }
}

export default Feeds;