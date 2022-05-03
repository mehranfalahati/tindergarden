import React, { Component } from "react";
import {Routes, Route, Link} from "react-router-dom"
import Home from "../home/Home";
import SignUp from "../../RegoPage/SignUp";
import Edit from "../edit/Edit";
import Profile from "../profile/Profile"
import Login from "../../RegoPage/Login";
import Post from "../newpost/Post";

class Pages extends Component {
   
    render() {
        return this.state.loading === true ? <h2>Loading...</h2> : (
            <Layout>
                <Router>
                    <Searchbar  />
                    <Content>
                    <div>
                        <Switch>
                            <Route path="/home" authenticated={this.state.authenticated} component={Home} />                           
                            <Route path="/edit" authenticated={this.state.authenticated} component={Edit} />
                            <Route path="/profile" authenticated={this.state.authenticated} component={Profile}  />
                            <Route path="/" authenticated={this.state.authenticated} component={Login} />
                            <Route path="/newpost" authenticated={this.state.authenticated} component={Post} />
                            <Route path="/signup" authenticated={this.state.authenticated} component={SignUp} />
                        </Switch>
                    </div>
                        
                    </Content>                  
                    
                        
                                       
                </Router>
            </Layout>
                
            
        )

    }
}

export default Pages;