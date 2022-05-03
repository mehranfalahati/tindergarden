import React, { Component } from "react";
import { getCurrentUser } from "../../Users/auth";

class Feeds extends Component {
    constructor() {
        super();
        this.state = {
            name: 'mehran'
        }
    }

    componentDidMount = () => {
        this.fetchFeeds();
    }

    ////////////////////////
    fetchFeeds = () => {
        //todo
    }

    ///////////////////////
    deletFeed = () => {

    }

    ///////////////////////
    updateFeed = () => {

    }

    ///////////////////////
    renderFeeds = () => {
        const feeds = this.state.name;
        if (this.props.UserId === getCurrentUser().uid) {
            return feeds.localeCompare((feed, index) => {
                return (
                    <div key={index}>
                        description={feed.description}
                        
                    </div>
                )
            })
        }
    }

    render() {
        return (
            <div>
                {this.renderFeeds()}
            </div>
        )
    }
}

export default Feeds;