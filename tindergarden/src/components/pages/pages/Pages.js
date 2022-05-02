import React, { Component } from "react";
import {Routes, Route, Link} from "react-router-dom"
import Home from "../home/Home";
import SignUp from "../../RegoPage/SignUp";
import Edit from "../edit/Edit";
import Profile from "../profile/Profile"
import Login from "../../RegoPage/Login";

class Pages extends Component {
    render() {
        return (
            <div>
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/edit" element={<Edit />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
        )

    }
}

export default Pages;