import React, { Component } from "react";
import searchbar from "./searchbar.css";
import {Search, Person, Chat, Notifications} from "@mui/icons-material";
import { Routes, Route, Link } from "react-router-dom";
import { signOut } from "../Users/auth";

class Searchbar extends Component {
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
                    <img className="appName" src="/pictures/logo.jpg" />
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
                        <img src="/pictures/profile/1.jpeg" alt="profile-picture" className="searchImg"/>  
                    </Link>
                    
                    <Link className="link" onClick={this._handleLogOut}>
                        Sign out
                    </Link>
                    {/* <Link to="/edit">Edit</Link> */}
                    {/* <Link to="/profile">Profile</Link> */}
                </div>
            </div>
        )
    }
}

export default Searchbar;