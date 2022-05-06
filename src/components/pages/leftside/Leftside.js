import React, { Component } from "react";
import "./leftside.css"
import {getCurrentUser} from "../../Users/auth";
import {fsDb} from "../../../Firebase/firebase"


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

   
    b = getCurrentUser //this is for debugging
   

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
                    <div className="leftsideUser" key={index}>
                         <p>{user.userName ? user.name : user.userEmail}</p> 
                        
                    </div>
                )
            })
    }

    render() {
        return (
            <div className="leftSide">
                <h2 className="leftsideh2">All Users</h2>
                {this.renderUsers()}
                
            </div>
        )
    }
}

export default Leftside;