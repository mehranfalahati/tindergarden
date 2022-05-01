import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link} from "react-router-dom";




class Login extends Component {
    constructor(props) {
        super(props);
        this.state ={
            error: null,
            email: "",
            password: "",            
        };
        this._handleChange = this._handleChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
    }

    _handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }    
    _handleSubmit(event) {
        event.preventDefault();
        this.setState({error: ""});
    }
    
    render() {
        return(
           
            <div>
                <form onSubmit={this._handleSubmit}>
                    <h1>
                        Login to{' '}
                        
                    </h1>
                    <p>
                        Enter your username and password to Login
                    </p>
                    <div>
                        <input type="email" name="email" placeholder="Email" onChange={this._handleChange} value={this.state.email} />
                        <input type="password" name="password" onChange={this._handleChange} value={this.state.password} />
                    </div>
                    <div>
                        {this.state.error ? (<p>{this.state.error}</p>) : null}
                        <button type="submit">Login</button>
                    </div>
                    
                    <p>Don't have an account?  </p>
                </form>
            </div>
            
        );
    }
    
}
export default Login;