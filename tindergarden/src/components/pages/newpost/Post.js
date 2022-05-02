import React, { Component } from "react";
import { getCurrentUser, signInWithGoogle, signup } from "../../Users/auth";
import { Input, Button, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';



const { TextArea } = Input
class Post extends Component {
    constructor() {
        super();
        this.state = {
            description: null
        }
        
        this.uploadProps = {
            name: 'file',
            action: this.uploadFile,
            headers: {
                authorization: 'authorization-text'
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                message.success(`${info.file.name} is uploaded successfully!`)
            }
        }
    }

    

    saveActivity = (data) => {
        //todo
    }

    _handleSubmit = () => {
        const { description } = this.state;
        if (!description) {
            message.error("Please fill in required fields");
            return
        }
        this.saveActivity(this.state);
        this.props.history.push('/home');
    }

    _handeDiscription = (event) => {
        this.setState({description: event.target.value});
    }


    render() {
        return (
            <div>
                <form onSubmit={this._handleSubmit}>
                    <h2>Create a new Post</h2>
                    <label>What is in your mind?</label> <TextArea placeholder="What is in you mind?" onChange={this._handeDiscription} type="text" />

                    <Upload {...this.uploadProps}>
                        <Button icon={<UploadOutlined />}>Upload Photos</Button>
                    </Upload>

                    <Button onClick={this._handleSubmit}>Post</Button>
                </form>
            </div>
        )
    }
}

export default Post;