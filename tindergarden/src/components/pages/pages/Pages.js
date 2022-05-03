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
                            <Route path="/edit" authenticated={this.state.authenticated}  ><Edit /></Route>
                            <Route path="/profile" authenticated={this.state.authenticated} component={Profile}  />
                            <Route path="/" authenticated={this.state.authenticated}  ><Login /></Route>
                            <Route path="/newpost" authenticated={this.state.authenticated}  ><Post /></Route>
                            <Route path="/login" authenticated={this.state.authenticated}  ><Login/></Route>
                            <Route path="/signup" authenticated={this.state.authenticated}  ><SignUp /></Route>
                        </Switch>
                    </div>
                        
                    </Content>                  
                    
                        
                                       
                </Router>
            </Layout>
                
            
        )

    }
}

export default Pages;