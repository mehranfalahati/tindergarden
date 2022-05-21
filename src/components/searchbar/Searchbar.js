import React, { Component } from "react";
import "./searchbar.css";
import {Search, Person, Chat, Notifications} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { signOut } from "../Users/auth";
import {fsDb} from "../../Firebase/firebase";
import {getCurrentUser} from "../Users/auth"

class Searchbar extends Component {
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
    }

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



    _handleLogOut = () => {
        signOut().then(() => {
            window.location.href = '/';
        })
    }

    render() {
        return (
            <div className="searchContainer"> 

                <div className="searchLeft">
                    {/* <span className="appName">TinderGarden</span> */}
                    <img alt="applogo" className="appName" src="/pictures/logo.jpg" />
                </div>
            
                <div className="searchCenter">
                    <div className="search">
                        <Search className="searchIcon" />
                        <input className="searchInput" placeholder="Search For Friend"/>
                    </div>
                </div>

                <div className="searchRight">
                    <div className="links">
                    <span className="homeLink"><Link className="link" to="/home">Home</Link></span>
                    </div>
                    <Link className="link" to="/edit">Edit</Link>


                    <div className="rightIcons">
                        <div className="iconItem">
                            <Person />
                            <span className="iconNumber">?</span>  
                        </div>
                        <div className="iconItem">
                            <Chat />
                            <span className="iconNumber">?</span>  
                        </div>
                        <div className="iconItem">
                            <Notifications />
                            <span className="iconNumber">?</span>  
                        </div>
                    </div>
                    <Link to="/profile">
                        <img src={this.state.userImage || "/pictures/profile/d1.jpg"} alt="profilepic" className="searchImg"/>  
                    </Link>
                    
                    <Link to='/' className="link" onClick={this._handleLogOut}>
                        Sign out
                    </Link>
                    {/* <Link to="/profile">Profile</Link> */}
                </div>
            </div>
        )
    }
}

export default Searchbar;