import React, { Component } from "react";
import { getCurrentUser, signInWithGoogle, signup } from "../Users/auth";
import {Link} from "react-router-dom"
import {fsDb} from "../../Firebase/firebase"




class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            email: '',
            password: '',
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
        this.setState({ error: ''});
        try {
            await signup(this.state.email, this.state.password);
            await fsDb.collection('users').doc().set({name: '', email: this.state.email, user_id: getCurrentUser().uid})
            //await fsDb.collection('user_profiles').doc().set({hello: 'world'});
            //current user here
        } catch(error) {
            this.setState({error: error.message});
        }
       
        console.log('Error message: ', this.state.error);
    }

    googleSignin = async() => {
        try {
            await signInWithGoogle();
        }catch(error) {
            this.setState({error: error.message});
        }
    }


    render() {
        return (
            <div>
                <form onSubmit={this._handleSubmit} >
                    <h1>
                        Sign Up to {''}
                    </h1>
                    <p>Fill in the form to create an account</p>
                    <div>
                        <input type="email" name="email" placeholder="Email" onChange={this._handleChange} value={this.state.email} />
                        <input type="password" name="password" placeholder="Password" onChange={this._handleChange} value={this.state.password} />
                            {this.state.error ? <p>{this.state.error}</p> : null}
                        <button type="submit">Sign Up</button>
                        <button onClick={this.googleSignin} type='button'>Sign up with google</button>
                    </div>
                    <br/>
                    <p>Already have an account? <Link to='/'>Login</Link></p>
                </form>
            </div>
        );
    }
}

export default SignUp;
