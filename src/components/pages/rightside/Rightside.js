import React, { Component } from "react";
import Pokiapi from "../../pokiapi/Pokiapi";
import "./rightside.css"

class Rightside extends Component {
    render() {
        return (
            <div className="rightSide">
                <Pokiapi />
            </div>
        )
    }
}

export default Rightside;