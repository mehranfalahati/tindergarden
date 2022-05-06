import React, { Component } from "react";
import "./mainpage.css"
import Post from "../newpost/Post";
import Feeds from "../feeds/Feeds";

class Mainpage extends Component {

    render() {
        return (
            <div className="feed">
                <Post />
                <Feeds />
            </div>
        )
    }
}

export default Mainpage;