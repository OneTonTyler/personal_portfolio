import React, { Component } from 'react';
import './projects.css';

class Projects extends Component {
    state = {
        data: []
    };

    componentDidMount() {
        this.callBackendApi()
            .then(res => this.setState({ data: res.message }))
            .catch(err => console.log(err));
    };

    callBackendApi = async () => {
        const response = await fetch('http://localhost:8000/api?table=Projects');
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body
    };

    render() {
        return (
            <div>
                <p>New State!</p>
                { this.state.data.map(element =>
                    <p key={element['ID']}>
                        {element['TITLE']}, {element['DESCRIPTION']}, {element['CONTENT']}
                    </p>)
                }
                <p>End</p>
            </div>
        );
    };
}

export default Projects;