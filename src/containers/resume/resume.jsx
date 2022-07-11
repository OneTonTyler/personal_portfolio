import React, { Component } from 'react';
import { FaPhoneAlt, FaAt, FaLinkedin, FaMapMarkerAlt, FaRegCalendarAlt } from "react-icons/fa";
import './resume.css';

const HeaderView = props => {
    const {
        TITLE: title,
        SUBTITLE: subtitle,
        OBJECTIVE: objective
    } = props.header[0];

    return (
        <section className='resume__header'>
            <h1>{title}</h1>
            <p>{subtitle}</p>
            <div className='resume__header-contact'>
                <div><FaPhoneAlt /> <p>(901) 498-9869</p></div>
                <div><FaAt /> <p>OneTonTyler@pm.me</p></div>
                <div><FaLinkedin /> <p>www.linkedin.com/tyler-a-singleton</p></div>
                <div><FaMapMarkerAlt /> <p>Littleton, CO 80127</p></div>
            </div>
        </section>
    )
}

const SkillsView = props => {
    const {
        LANGUAGES: language,
        STUDIES: studies,
        ATTRIBUTES: attributes
    } = props.skills[0];

    return (
        <section>
            <h2>Skills and Qualifications</h2>
            <div className='resume__skills'>
                <div>
                    <p>Tools and Languages</p>
                    <p>{language}</p>
                </div>

                <div>
                    <p>Studies of Interest</p>
                    <p>{studies}</p>
                </div>

                <div>
                    <p>Attributes</p>
                    <p>{attributes}</p>
                </div>
            </div>
        </section>
    )
}

const JobView = props => {
    const experience = props.experience;
    const view = experience.map(job => {

        let {
            ID: id,
            JOB_TITLE: job_title,
            JOB_DESCRIPTION: job_description,
            JOB_LOCATION: job_location,
            JOB_EMPLOYER: job_employer,
            DUTIES: duties,
            DATE_STARTED: date_started,
            DATE_ENDED: date_ended
        } = job;

        // Get all duties
        duties = JSON.parse(duties)['roles'].map((role, idx) => {
            return <li key={idx}>{role}</li>;
        });

        // Normalize dates
        const options = { year: 'numeric', month: 'short' }
        date_started = new Date(date_started).toLocaleString('en-US', options);
        date_ended = new Date(date_ended).toLocaleString('en-US', options);

        return (
            <div key={id} className='resume__experience'>
                <h3>{job_title}</h3>
                <h4>{job_employer}</h4>
                <div className='resume__experience-header'>
                    <p><FaRegCalendarAlt /> {date_started} - {date_ended}</p>
                    <p><FaMapMarkerAlt /> {job_location}</p>
                </div>

                <div className='resume__experience-description'>
                    <p>{job_description}</p>
                    <ul>{duties}</ul>
                </div>
            </div>
        );
    });

    return (
        <section>
            <h2>Experience</h2>
            {view}
        </section>
    )
}

const EducationView = props => {

    const education = props.education.map(element => {
        let {
            ID: id,
            SCHOOL: school,
            DEGREE: degree,
            DATE_STARTED: date_started,
            DATE_ENDED: date_ended
        } = element;

        // Normalize dates
        const options = { year: 'numeric', month: 'short' }
        date_started = new Date(date_started).toLocaleString('en-US', options);
        date_ended = new Date(date_ended).toLocaleString('en-US', options);

        return (
            <div className='resume__education-degree' key={id}>
                <p>{school}</p>
                <div className='resume__education-degree__cluster'>
                    <p>{degree}</p>
                    <p>{date_ended}</p>
                </div>
            </div>
        )
    })

    return (
        <section>
            <h2>Education</h2>
            {education}
        </section>
    )
}

const RenderView = props => {
    // Initialize variables
    return (
        <div className='resume__container'>
            <HeaderView header={props.header} />
            <SkillsView skills={props.skills} />
            <JobView experience={props.experience}/>
            <EducationView education={props.education}/>
        </div>
    )
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
        for (const table of [
            'resume_header',
            'resume_skills',
            'resume_experience',
            'resume_education'
        ]) {
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
            workExperience: responses['resume_experience'],
            education: responses['resume_education']
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
                <RenderView
                    header={this.state.header}
                    skills={this.state.skills}
                    experience={this.state.workExperience}
                    education={this.state.education}
                />
            )
        }
    }

}

export default Resume;