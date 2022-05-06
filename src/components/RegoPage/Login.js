import React, { Component } from "react";
import {Link} from "react-router-dom";
import { signin, signInWithGoogle } from "../Users/auth";
import login from "./login.css";


class Login extends Component {
    constructor(props) {
        super(props);
        this.state ={
            error: null,
            email: "",
            password: "",
            isLogedIn: false,            
        };
        this._handleChange = this._handleChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
    }

    _handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }    
    async _handleSubmit(event) {
        event.preventDefault();
        this.setState({error: ""});
        try {
            await signin(this.state.email, this.state.password);
            this.setState({isLogedIn: true});
            window.location.href = '/home';
            
        } catch(error) {
            this.setState({error: error.message})
        }        
    }
    
    render() {
        return(
           
            <div className="background">           
             
                <form className="signupdiv" autoComplete="off" onSubmit={this._handleSubmit}>
                    <h1>
                        Log In                       
                    </h1>
                    <p className="p3">
                        Enter your username and password to Login
                    </p>
                    <div>
                        <input className="input1" type="email" name="email" placeholder="Email" onChange={this._handleChange} value={this.state.email} />
                        <input className="input1" type="password" name="password" placeholder="Password" onChange={this._handleChange} value={this.state.password} />
                    </div>
                    <div>
                        
                        <button className="button1" type="submit">Login</button>
                        <p className="p2">Don't have an account? <Link to="/signup">Sign Up</Link> </p>

                        {this.state.error ? (<p>{this.state.error}</p>) : null}

                    </div>
                    
                </form>
            </div>
            
        );
    }
    
}
export default Login;