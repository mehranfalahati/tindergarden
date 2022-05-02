import React, { Component } from "react";
import "./profile.css"
import Leftside from "../leftside/Leftside";
import Rightside from "../rightside/Rightside";
import Searchbar from "../../searchbar/Searchbar";
import { Routes, Route, Link } from "react-router-dom";
import {Edit} from "@mui/icons-material"
import UserProfile from "./UserProfile";
import {currentUser, getCurrentUser} from "../../Users/auth"


class Profile extends Component {
    render() {
        return (
            <>
                <Searchbar />
                <div className="mainContainer">
                    <Leftside />
                    <div className="profilePicture">
                        <img className="profilePic" src="/pictures/profile/1.jpeg" />
                        <img className="profileCover" src="/pictures/cover/1.jpeg"/>
                        <div className="userInfo">
                            <UserProfile userId={getCurrentUser().uid}/>
                        </div>
                        <Link className="edit" to="/edit"><Edit /></Link>
                    </div>

                    
                    <Rightside />
                </div>

            </>
        )
    }
}

export default Profile;