import { ResetTvRounded, TripOriginSharp } from "@mui/icons-material";
import { render } from "@testing-library/react";
import React, { Component }  from "react";
import { Routes, Route, Link } from "react-router-dom";

class Edit extends Component {
    constructor() {
        super();
        this.state = {
            showForm: false,
            name: 'Mehran',
            family: 'Falahati'
        } 
    }

    
 //// Update
 saveChanges () {

 }


 //// handler
    _handleSubmit = (event) => {
        event.preventDefault();
        this.saveChanges(this.state)
        this.setState({showForm: false})
    }

    _handleName = (event) => {
        this.setState({name: event.target.value});
    }

    _handleFamilyname = (event) => {
        this.setState({family: event.target.value})
    }

     
 //// From
    showForm() {
        return (
            <div>
                <form className="editPage">
                    <label className="labelOne">First Name:</label> <input onChange={this._handleName} type="text" value={this.state.name} required />
                    <label className="labelTwo">Family Name:</label> <input onChange={this._handleFamilyname} type="text" value={this.state.family} required />

                    <button onClick={this._handleSubmit}>Save</button>
                    <button onClick={() => this.setState({showForm: false})}>Cancel</button>
                </form>
            </div>
        )
    }


    //// Render
    render() {
        return(
            <div>
                <button onClick={() => this.setState({showForm: true})} type="primary" >Edit Profile</button>
                <button><Link to="/postfeed">New Post</Link></button>
                {this.state.showForm ? this.showForm() : null}
            </div>
        )
    }
}

export default Edit;