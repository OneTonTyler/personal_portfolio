import React, { Component } from 'react';
import './resume.css';

const RenderView = props => {
    // Initialize variables
    const data = props.data;

    // Create views for each job posting
    const job_view = data.map(job => {
        const {
            ID: id,
            JOB_TITLE: job_title,
            JOB_DESCRIPTION: job_description,
            DUTIES: duties,
            DATE_STARTED: started,
            DATE_ENDED: ended
        } = job;

        return (
            <div key={id}>
                <h1>{job_title}</h1>
                <h2>{job_description}</h2>
            </div>
        );
    })

    return job_view
}

class Resume extends Component {
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
                this.setState({data: res.message});
            })
            .catch(err => console.log(err))
    }

    callBackendApi = async () => {
        const response = await fetch('/api/list_all?table=resume');
        const body = await response.json()

        if (response.status !== 200) {
            this.setState({hasError: true})  // Bad request
            throw Error(body.errorMessage);
        }
        return body;
    }

    render() {
        if (!this.state.data[0]) {
            return (
                <div>
                    <p>Hello World</p>
                </div>
            )
        }
        else {
            return (
                <RenderView data={this.state.data}/>
            )
        }
    }

}

export default Resume;