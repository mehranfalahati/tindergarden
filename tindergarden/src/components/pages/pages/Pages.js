import React, { Component } from "react";
import {BrowserRouter as Router, Switch, Redirect, Route, Link} from "react-router-dom"
import Home from "../home/Home";
import SignUp from "../../RegoPage/SignUp";
import Edit from "../edit/Edit";
import Profile from "../profile/Profile"
import Login from "../../RegoPage/Login";
import Post from "../newpost/Post";
import PrivateDir from "../../PrivateDir";
import PublicDir from "../../PublicDir";
import {auth} from "../../../Firebase/firebase";
import { Layout } from 'antd';
import Searchbar from "../../searchbar/Searchbar";


const {Content} = Layout;

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
                    <Searchbar isLoggedIn={this.state.authenticated} />
                    <Content>
                    <div>
                        <Switch>
                            <PrivateDir exact path="/home" authenticated={this.state.authenticated} component={<Home />} /><PrivateDir/>                            
                            <PrivateDir path="/edit" authenticated={this.state.authenticated} component={<Edit />} /><PrivateDir/>
                            <PrivateDir path="/profile" authenticated={this.state.authenticated} component={<Profile />} /><PrivateDir/>
                            <PrivateDir path="/" authenticated={this.state.authenticated} component={<Login />} /><PrivateDir/>
                            <PrivateDir path="/newpost" authenticated={this.state.authenticated} component={<Post />} /><PrivateDir/>
                            <PublicDir path="/login" authenticated={this.state.authenticated} component={<Login/>} /><PublicDir/>
                            <PublicDir path="/signup" authenticated={this.state.authenticated} component={<SignUp />} /> <PublicDir/>
                        </Switch>
                    </div>
                        
                    </Content>                  
                    
                        
                                       
                </Router>
            </Layout>
                
            
        )

    }
}

export default Pages;