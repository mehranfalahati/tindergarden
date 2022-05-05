import React, { Component } from "react";
import searchbar from "./searchbar.css";
import {Search, Person, Chat, Notifications} from "@mui/icons-material";
import { Routes, Route, Link } from "react-router-dom";
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
                    <span className="appName">TinderGarden</span>
                </div>
            
                <div className="searchCenter">
                    <div className="search">
                        <Search className="searchIcon" />
                        <input className="searchInput" placeholder="Search For Friend"/>
                    </div>
                </div>

                <div className="searchRight">
                    <div className="links">
                    <span className="homeLink"><Link to="/home">Home</Link></span>
                    </div>

                    <div className="rightIcons">
                        <div className="iconItem">
                            <Person />
                            <span className="iconNumber">1</span>
                        </div>
                        <div className="iconItem">
                            <Chat />
                            <span className="iconNumber">1</span>
                        </div>
                        <div className="iconItem">
                            <Notifications />
                            <span className="iconNumber">1</span>
                        </div>
                    </div>
                    <Link to="/profile">
                        <img src={this.state.userImage} alt="profile-picture" className="searchImg"/>  
                    </Link>
                    
                    <Link  onClick={this._handleLogOut}>
                        Sign out
                    </Link>
                    <Link to="/edit">Edit</Link>
                    <Link to="/profile">Profile</Link>
                </div>
            </div>
        )
    }
}

export default Searchbar;