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
            title: '',
            post: '',
            user_id: '',
            createdAt: '',
            
        };
        this.getPost = this.getPost.bind(this);
        this.uploadPost = this.uploadPost.bind(this);
        this.renderPost = this.renderPost.bind(this);
        this.renderTitle = this.renderTitle.bind(this);
        
    }

    // postArray = [];
    
    getPost() {
        db.collection('users').doc(getCurrentUser().uid).get()
        .then((doc) => {
            if (doc.exists) {
                    // this.postArray.push(doc.data());
                    console.log("Document data:", doc.data());                    
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
        }) .catch((error) => ("Error gett`ing document: ", error));
        
    };

    renderPost (event) {
        console.log(event.target.value);
        this.setState({post: event.target.value})
    }
    renderTitle (event) {
        this.setState({title: event.target.value})
    }




    async uploadPost(event) {        
        event.preventDefault(); 
               
        const user_id = getCurrentUser().email;
        await db.collection("posts").add(
           {...this.state, user_id: user_id, createdAt: (new Date)}
        ).then(() => {
            console.log("post successfully posted!");
            
        });
    }

    // deletePost (event) {
    //     fsDb.collection('posts').doc(getCurrentUser().uid).delete()
    //     .then(() => {
    //         console.log("Document successfully deleteed!");
    //         //this.uploadPost;
    //     }).catch((error) => {
    //         console.error("Error removing post: ", error);
    //     })
    // }


    render() {
        return (
            <div className="postContainer">
                <h2 className="h2post">Create a new Post</h2>
                <form onSubmit={this.uploadPost}>
                    <textarea className="postBox" placeholder="What is in you mind?" type="text" onChange={this.renderPost} value={this.state.post} required />                    
                    <input className="postbutton1" type='submit' value="Post" />
                    <input className="postbutton2" type='button' value='Delete post' onClick={this.deletePost} /> 
                </form>      
                {/* <div>
                    {() => this.postArray((post) => {
                        return (
                            <div>
                                <h2>post.post</h2>
                                <h3>post.id</h3>
                                <button onClick={this.deletePost(post.id)} />
                            </div>
                        )
                    })}
                </div>             */}
            </div>
        );
    }
}

////////////////Mehran code//////////////


// class Post extends Component {
//     constructor() {
//         super();
//         this.state = {
//             description: null
//         }
        
//         this.uploadProps = {
//             name: 'file',
//             action: this.uploadFile,
//             headers: {
//                 authorization: 'authorization-text'
//             },
//             onChange(info) {
//                 if (info.file.status !== 'uploading') {
//                     console.log(info.file, info.fileList);
//                 }
//                 message.success(`${info.file.name} is uploaded successfully!`)
//             }
//         }
//         this.getDocData = this.getDocData.bind(this)
//     }

    

//     saveActivity = (data) => {
//         //todo
//     }

//     _handleSubmit = () => {
//         const { description } = this.state;
//         if (!description) {
//             message.error("Please fill in required fields");
//             return
//         }
//         this.saveActivity(this.state);
//         this.props.history.push('/home');
//     }

//     _handeDiscription = (event) => {
//         this.setState({description: event.target.value});
//     }


//     getDocData(){

//         // db.collection("users").get().then((querySnapshot) => {
//         //     querySnapshot.forEach((doc) => {
//         //         // doc.data() is never undefined for query doc snapshots
//         //         console.log(doc.id, " => ", doc.data());
//         //     });
//         // });
//         var docRef = db.collection("users").doc("I1wLEfqIhfkcdi4itfRw");
//         docRef.get().then((doc) => {
//             if (doc.exists) {
//                 console.log("Document data:", doc.data());
//                 this.whatevermethod
//             } else {
//                 // doc.data() will be undefined in this case
//                 console.log("No such document!");
//             }
//         }).catch((error) => {
//             console.log("Error getting document:", error);
//         });
//         console.log('executed')

//     }
// ////////////////////////////JJJ
//     render() {
//         return (
//             <div>
//                 <form onSubmit={this._handleSubmit}>
//                     <h2>Create a new Post</h2>
//                     <label>What is in your mind?</label> <TextArea placeholder="What is in you mind?" onChange={this._handeDiscription} type="text" />

//                     <Upload {...this.uploadProps}>
//                         <Button icon={<UploadOutlined />}>Upload Photos</Button>
//                     </Upload>

//                     <Button onClick={this._handleSubmit}>Post</Button>
//                 </form>
//                     <button onClick={this.getDocData}>ali click here</button>
//             </div>
//         )
//     }
// }

export default Post;