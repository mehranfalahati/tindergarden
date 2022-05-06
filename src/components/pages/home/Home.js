import React, { Component } from "react";
import "./home.css";
import Leftside from "../leftside/Leftside";
import Mainpage from "../mainpage/Mainpage";
import Rightside from "../rightside/Rightside";
import Searchbar from "../../searchbar/Searchbar";


class Home extends Component {
    render() {
        return (
            <>
                <div className="mainContainer">
                    <Leftside />
                    <Mainpage />
                    <Rightside />
                </div>

            </>
        )
    }
}

export default Home;