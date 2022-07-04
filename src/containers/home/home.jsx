import React, { Component } from 'react';
import './home.css';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            editorActive: true,
            data: {}
        }
    }

    componentDidMount() {
        this.callBackendApi()
            .then(res => {
                if (!res.message) {
                    this.setState({hasError: true});  // Basic error handling
                }
                else {
                    this.setState({data: res.message});
                }
            })
            .catch(err => console.log(err));
    }

    // Connect to mySQL database
    callBackendApi = async () => {
        const response = await fetch('/api?table=HomePage&id=0');
        const body = await response.json()

        if (response.status !== 200) {
            this.setState({hasError: true})  // Bad request
            throw Error(body.errorMessage);
        }
        return body;
    }


    render() {
        const {CONTENT: content} = this.state.data;

        return (
            <div>
                <p>{content}</p>
            </div>
        );
    }
}

export default HomePage;