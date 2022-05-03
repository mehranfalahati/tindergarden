import React, { Component } from "react";
import {Link} from "react-router-dom";
import { signin, signInWithGoogle } from "../Users/auth";




class Login extends Component {
    constructor(props) {
        super(props);
        this.state ={
            error: null,
            email: "",
            password: "",
            isLogIn: false,            
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
            this.setState({isLogIn: true});
            
        } catch(error) {
            this.setState({error: error.message})
        }        
    }
    
    render() {
        return(
           
            <div>           
             
                <form autoComplete="off" onSubmit={this._handleSubmit}>
                    <h1>
                        Login to{' '}
                        <Link to='/' >Tindergarden</Link>                        
                    </h1>
                    <p>
                        Enter your username and password to Login
                    </p>
                    <div>
                        <input type="email" name="email" placeholder="Email" onChange={this._handleChange} value={this.state.email} />
                        <input type="password" name="password" placeholder="password" onChange={this._handleChange} value={this.state.password} />
                    </div>
                    <div>
                        {this.state.error ? (<p>{this.state.error}</p>) : null}
                        <button type="submit">Login</button>
                    </div>
                    
                    <p>Don't have an account? <Link to="/signup">Sign Up</Link> </p>
                </form>
            </div>
            
        );
    }
    
}
export default Login;