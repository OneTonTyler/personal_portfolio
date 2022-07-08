import React, { Component } from 'react';
import './resume.css';

const RenderView = props => {
    // Initialize variables
    const experience = props.experience;

    // Create views for each job posting
    const job_view = experience.map(job => {
        const {
            ID: id,
            JOB_TITLE: job_title,
            JOB_DESCRIPTION: job_description,
            DUTIES: duties,
            DATE_STARTED: date_started,
            DATE_ENDED: date_ended
        } = job;

        const options = { year: 'numeric', month: 'short' }
        const started = new Date(date_started).toLocaleString('en-US', options);
        const ended = new Date(date_ended).toLocaleString('en-US', options);

        return (
            <div key={id} className='resume__experience'>
                <div className='resume__experience-header'>
                    <h2>City of Wheat Ridge Police Department</h2>
                    <h2>Wheat Ridge, CO</h2>
                </div>

                <div className='resume__experience-title'>
                    <h3>{job_title}</h3>
                    <h3>{started} - {ended}</h3>
                </div>

                <div>
                    <ul>
                        <li>Some duties</li>
                        <li>More Duties</li>
                        <li>And more duties</li>
                    </ul>
                </div>

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
            header: {},
            skills: {},
            workExperience: {}
        }
    }

    async componentDidMount() {
        const responses = {};
        for (const table of ['resume_header', 'resume_skills', 'resume_experience']) {
            await this.callBackendApi(table)
                .then(res => {
                    responses[table] = res.message
                })
                .catch(err => {
                    console.log(err)
                })
        }

        this.setState({
            header: responses['resume_header'],
            skills: responses['resume_skills'],
            workExperience: responses['resume_experience']
        });
    }

    callBackendApi = async (table) => {
        const response = await fetch(`/api/list_all?table=${table}`);
        const body = await response.json()

        if (response.status !== 200) {
            this.setState({hasError: true})  // Bad request
            throw Error(body.errorMessage);
        }
        return body;
    }

    render() {
        if (!this.state.header[0]) {
            return (
                <div>
                    <p>Hello World</p>
                </div>
            )
        }
        else {
            return (
                <div className='resume__container'>
                    <RenderView
                        header={this.state.header}
                        skills={this.state.skills}
                        experience={this.state.workExperience}
                    />
                </div>
            )
        }
    }

}

export default Resume;