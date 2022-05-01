import React, { Component } from "react";



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

    _handleSubmit(event) {
        event.preventDefault();
        this.setState({ error: ''});
        console.log('Error message: ', this.state.error);
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
                            {this.state.error ? console.log(this.state.error) : null}
                        <button type="submit">Sign Up</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignUp;
