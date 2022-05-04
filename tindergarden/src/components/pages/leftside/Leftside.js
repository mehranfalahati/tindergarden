import React, { Component } from "react";
import leftside from "./leftside.css"
import Chat from "../../chat/Chat";

class Leftside extends Component {
    render() {
        return (
            <div className="leftSide">
                <Chat />
            </div>
        )
    }
}

export default Leftside;