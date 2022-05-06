import React, { Component } from "react";
import {BrowserRouter as Router, Switch} from "react-router-dom"
import Home from "../home/Home";
import SignUp from "../../RegoPage/SignUp";
import Edit from "../edit/Edit";
import Profile from "../profile/Profile"
import Login from "../../RegoPage/Login";
import Post from "../newpost/Post";
import {auth} from "../../../Firebase/firebase";
import { Layout } from "antd";
import Searchbar from "../../searchbar/Searchbar";
import PrivateDir from "./PrivateDir";
import PublicDir from "./PublicDir";

import "./pages.css"

const {Content} = Layout

class Pages extends Component {
    constructor() {
        super();
        this.state ={
            authenticated: false,
            loading: true,
        };
    }

    componentDidMount() {
        auth().onAuthStateChanged((user) => {
          if (user) {
            this.setState({
              user: user,  
              authenticated: true,
              loading: false,
            });
          } else {
            this.setState({
              authenticated: false,
              loading: false,
            });
          }
        })
      }
   
    render() {
        return this.state.loading === true ? <h2>Loading...</h2> : (
            <Layout>
                <Router>                    
                    {this.state.authenticated ? <Searchbar authenticated={this.state.authenticated} /> : null}
                    <Content>
                      <div>
                          <Switch>
                              <PrivateDir path="/home" authenticated={this.state.authenticated} component={Home} />                           
                              <PrivateDir path="/edit" authenticated={this.state.authenticated} component={Edit} />
                              <PrivateDir path="/profile" authenticated={this.state.authenticated} component={Profile}  />
                              <PublicDir exact path="/" authenticated={this.state.authenticated} component={Login} />
                              <PrivateDir path="/newpost" authenticated={this.state.authenticated} component={Post} />
                              <PublicDir path="/signup" authenticated={this.state.authenticated} component={SignUp}  />
                          </Switch>
                      </div>                        
                    </Content>           
                  </Router>
            </Layout>        
        )
    }
}

export default Pages;