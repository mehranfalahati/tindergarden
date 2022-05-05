import React, { Component } from "react";
import leftside from "./leftside.css"
import {currentUser, getCurrentUser} from "../../Users/auth";
import {fsDb, auth} from "../../../Firebase/firebase"


class Leftside extends Component {
    constructor() {
        super();
        this.state = {
          users: []           
        }        
    }

    componentDidMount = () => {
        this.fetchUsers();
    }

   

    fetchUsers = () => {
        fsDb.collection('users').get()
        .then((snapshot) => {
            let users = [];
            snapshot.forEach((user) => {                
                const userObj = user.data();             
                const userName = user.data().name;
                const userEmail= user.data().email;                    
                               
                users.push({...userObj, userName, userEmail})                               
            });
            this.setState({users: users});        
        });
    };

    renderUsers = () => {
        const users = this.state.users;
            return users.map((user, index) => {
                return (
                    <div key={index}>
                         <p>{user.userName ? user.name : user.userEmail}</p> 
                        
                    </div>
                )
            })
    }

    render() {
        return (
            <div className="leftSide">
                {this.renderUsers()}
                
            </div>
        )
    }
}

export default Leftside;