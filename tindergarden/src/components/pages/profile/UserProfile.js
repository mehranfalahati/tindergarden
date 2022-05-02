import React,{Component} from "react";
import { fsDb } from "../../../Firebase/firebase";
import { getCurrentUser } from "../../Users/auth";
import Events from "../Events/Events"


class UserProfile extends Component {
    constructor() {
        super();
        this.state = {
            events: []
        }
    }

    componentDidMount() {
        this.fetchEvents()
    }
    
    // Fetch events from database//////
    fetchEvents= () => {
        fsDb
        .collection('events').where('user_id', '==', this.props.userId) // userId should pass to Profile
        .get().then((snapshots) => {
            let events = [];
            events.forEach((event) => {
                const docId = event.id;
                const eventObj = event.data();
                events.push({...eventObj, docId});
            });
            this.setState({events: events}); 
        });
    }

    renderEvents = () => {
        const events = this.state.events;
        if(this.props.userId === getCurrentUser().uid) {
            return events.map((event, index) => {
                return (
                    <div>
                        <Events title={event.title}>
                            <p>{event.location}</p>
                        </Events>
                    </div>
                )
            })
        }
    }

    render() {
        return (
            <div>
                {this.renderEvents()}
            </div>
        );
    }
}

export default UserProfile;