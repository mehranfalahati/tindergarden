import React, { Component } from "react";
import searchbar from "./searchbar.css"

class Searchbar extends Component {
    render() {
        return (
            <div className="searchContainer"> 

                <div className="searchLeft">
                    <span className="appName">TinderGarden</span>
                </div>
            
                <div className="searchCenter">
                    <div className="search">
                        <input className="searchInput" placeholder="Search For Friend"/>
                    </div>
                </div>

                <div className="searchRight">
                    <div className="links">
            <span className="homeLink">Home</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Searchbar;