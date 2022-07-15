import React, { Component } from 'react';
import { FaPhoneAlt, FaAt, FaLinkedin, FaMapMarkerAlt, FaRegCalendarAlt } from "react-icons/fa";
import './resume.css';

const HeaderView = props => {
    const {
        TITLE: title,
        SUBTITLE: subtitle,
    } = props.header[0];

    if (props.editor) {
        return (
            <section className='resume__header'>
                <div>
                    <h2>Header</h2>

                    {/* Title */}
                    <div className='mb-3'>
                        <label form='resume_header__title' className='form-label'>Resume Title</label>
                        <input type='text' id='resume_header__title' className='form-control' defaultValue={title}/>
                    </div>

                    {/* Subtitle */}
                    <div className='mb-3'>
                        <label form='resume_header__subtitle' className='form-label'>Subtitle</label>
                        <input type='text' id='resume_header__subtitle' className='form-control' defaultValue={subtitle}/>
                    </div>
                </div>
            </section>
        )
    }

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
        LANGUAGES: languages,
        STUDIES: studies,
        ATTRIBUTES: attributes
    } = props.skills[0];

    if (props.editor) {
        return (
            <section>
                <h2>Skills and Qualifications</h2>
                <div>
                    {/* Tools and Languages */}
                    <div className='mb-3'>
                        <label form='resume_skills__languages' className='form-label'>Languages</label>
                        <input type='text' id='resume_skills__languages' className='form-control' defaultValue={languages}/>
                    </div>

                    {/* Studies of Interest */}
                    <div className='mb-3'>
                        <label form='resume_skills__studies' className='form-label'>Studies of Interest</label>
                        <input type='text' id='resume_skills__studies' className='form-control' defaultValue={studies}/>
                    </div>

                    {/* Attributes */}
                    <div className='mb-3'>
                        <label form='resume_skills__attributes' className='form-label'>Attributes</label>
                        <input type='text' id='resume_skills__attributes' className='form-control' defaultValue={attributes}/>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section>
            <h2>Skills and Qualifications</h2>
            <div className='resume__skills'>
                <div>
                    <p>Tools and Languages</p>
                    <p>{languages}</p>
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
    function View(experience) {
        return experience.map(job => {

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

            // Normalize dates
            date_started = date_started.slice(0, 10);
            date_ended = date_ended.slice(0, 10);

            // Get all duties
            let duties_list = JSON.parse(duties)['roles'].map((role, idx) => {
                return <li key={`${role}_${idx}`}>{role}</li>;
            });

            if (props.editor) {
                return (
                    <div key={id}>
                        <h4>{`Job number ${id}`}</h4>

                        {/* Job Title */}
                        <div className='mb-3'>
                            <label form={`resume_experience__job_title_${id}`} className='form-label'>Job Title</label>
                            <input type='text' id={`resume_experience__job_title_${id}`} className='form-control'
                                   defaultValue={job_title}/>
                        </div>

                        {/* Employer */}
                        <div className='mb-3'>
                            <label form={`resume_experience__job_employer_${id}`}
                                   className='form-label'>Employer</label>
                            <input type='text' id={`resume_experience__job_employer_${id}`} className='form-control'
                                   defaultValue={job_employer}/>
                        </div>

                        {/* Job Location */}
                        <div className='mb-3'>
                            <label form={`resume_experience__job_location_${id}`}
                                   className='form-label'>Location</label>
                            <input type='text' id={`resume_experience__job_location_${id}`} className='form-control'
                                   defaultValue={job_location}/>
                        </div>

                        {/* Job Description */}
                        <div className='mb-3'>
                            <label form={`resume_experience__job_description_${id}`}
                                   className='form-label'>Description</label>
                            <textarea id={`resume_experience__job_description_${id}`} className='form-control' rows='6'
                                      defaultValue={job_description}/>
                        </div>

                        {/* Duties */}
                        <div className='mb-3'>
                            <label form={`resume_experience__duties_${id}`} className='form-label'>Duties</label>
                            <textarea id={`resume_experience__duties_${id}`} className='form-control' rows='6'
                                      defaultValue={duties}/>
                        </div>

                        {/* Date Started */}
                        <div className='mb-3'>
                            <label form={`resume_experience__date_started_${id}`} className='form-label'>Date
                                Started</label>
                            <input type='text' id={`resume_experience__date_started_${id}`} className='form-control'
                                   defaultValue={date_started}/>
                        </div>

                        {/* Date Ended */}
                        <div className='mb-3'>
                            <label form={`resume_experience__date_ended_${id}`} className='form-label'>Dated
                                Ended</label>
                            <input type='text' id={`resume_experience__date_ended_${id}`} className='form-control'
                                   defaultValue={date_ended}/>
                        </div>
                    </div>
                )
            }

            return (
                <div className='resume__experience'>
                    <h3>{job_title}</h3>
                    <h4>{job_employer}</h4>
                    <div className='resume__experience-header'>
                        <p><FaRegCalendarAlt/> {date_started} - {date_ended}</p>
                        <p><FaMapMarkerAlt/> {job_location}</p>
                    </div>

                    <div className='resume__experience-description'>
                        <p>{job_description}</p>
                        <ul>{duties_list}</ul>
                    </div>
                </div>
            );
        });
    }

    const defaultView = View(props.experience)

    const addView = [{
        ID: 'NEW',
        JOB_TITLE: '',
        JOB_DESCRIPTION: '',
        JOB_LOCATION: '',
        JOB_EMPLOYER: '',
        DUTIES: JSON.stringify({"roles": ['Insert text here.']}),
        DATE_STARTED: '2021-04-01',
        DATE_ENDED: '2021-04-01'
    }]

    return (
        <section>
            <h2>Experience</h2>
            {defaultView}
            {/*<div>{View(addView)}</div>*/}
            {/*<div>{View(addView)}</div>*/}
            {/*<div>{View(addView)}</div>*/}
        </section>
    )
}

const EducationView = props => {

    const education = props.education.map(element => {
        let {
            ID: id,
            SCHOOL: school,
            DEGREE: degree,
            DATE_ENDED: date_ended
        } = element;

        // Normalize date
        date_ended = date_ended.slice(0, 10);

        if (props.editor) {
            return(
                <div key={id}>
                    <h4>{`Certification ${id}`}</h4>
                    {/* School */}
                    <div className='mb-3'>
                        <label form={`resume_education__school_${id}`} className='form-label'>School Name</label>
                        <input type='text' id={`resume_education__school_${id}`} className='form-control' defaultValue={school}/>
                    </div>

                    {/* Degree */}
                    <div className='mb-3'>
                        <label form={`resume_education__degree_${id}`} className='form-label'>Degree</label>
                        <input type='text' id={`resume_education__degree_${id}`} className='form-control' defaultValue={degree}/>
                    </div>

                    {/* Date Ended */}
                    <div className='mb-3'>
                        <label form={`resume_education__date_ended_${id}`} className='form-label'>Date Received</label>
                        <input type='text' id={`resume_education__date_ended_${id}`} className='form-control' defaultValue={date_ended}/>
                    </div>
                </div>
            )
        }

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
    if (props.editorActive) {
        return (
            <form className='resume__container' onSubmit={props.submit}>
                <HeaderView header={props.header} editor={props.editorActive}/>
                <SkillsView skills={props.skills} editor={props.editorActive}/>
                <JobView experience={props.experience} editor={props.editorActive}/>
                <EducationView education={props.education} editor={props.editorActive}/>

                <div className='button-group'>
                    <button type='submit' className='btn btn-outline-primary active'>Submit</button>
                    <button type='button' className='btn btn-outline-primary' onClick={props.render}>Render</button>
                    <button type='reset' className='btn btn-outline-primary'>Cancel</button>
                    <button type='button' className='btn btn-outline-primary' onClick={props.editor}>Editor</button>
                </div>
            </form>
        )
    }

    return (
        <div className='resume__container'>
            <HeaderView header={props.header} editor={props.editorActive}/>
            <SkillsView skills={props.skills} editor={props.editorActive}/>
            <JobView experience={props.experience} editor={props.editorActive}/>
            <EducationView education={props.education} editor={props.editorActive}/>
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
            workExperience: {},
            education: {},
        }

        this.handleSubmit = this.handleSubmit.bind(this);
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

    async handleSubmit(event) {
        const education_cols = ['SCHOOL', 'DEGREE', 'DATE_ENDED'];
        const experience_cols = ['JOB_TITLE', 'JOB_LOCATION', 'JOB_EMPLOYER', 'JOB_DESCRIPTION', 'DUTIES', 'DATE_STARTED', 'DATE_ENDED'];
        const header_cols = ['TITLE', 'SUBTITLE'];
        const skills_cols = ['LANGUAGES', 'STUDIES', 'ATTRIBUTES'];

        const tables = {
            resume_education: education_cols,
            resume_experience: experience_cols,
            resume_header: header_cols,
            resume_skills: skills_cols
        };

        Object.keys(tables).forEach(table_name => {
            let cols = [];
            let sections = [];

            // Get a list of all sections
            tables[table_name].forEach(col => {
                let id = `${table_name}__${col.toLowerCase()}`;
                let value = event.target.querySelectorAll(`[id^=${id}]`);

                // Push to columns and sections
                cols.push(col);
                sections.push(value);
            });

            // Send a PATCH request for each section
            for (let id  = 0; id < sections[0].length; id++) {
                let values = [];

                // Load column values into columns
                for (let column = 0; column < sections.length; column++) {

                    console.log(cols[column])
                    // Ensure Duties column is a json object
                    if (cols[column] === 'DUTIES') {
                        console.log(JSON.parse(sections[column][id].value))
                        values.push(JSON.stringify(sections[column][id].value))
                    } else {
                        values.push(sections[column][id].value);
                    }
                }

                // Submit request to SQL server
                FetchRequest(id, values, cols, table_name)
            }
        })

        // Check for empty fields
        function isFilled(values) {
            let filled = true;

            values.forEach(value => {
                if (value === '') filled = false;
            });

            return filled
        }

        // Patch request
        async function FetchRequest(id, values, cols, table_name) {
            // if (!isFilled(values)) return;

            await fetch('/api', {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    table: table_name,
                    id: id,
                    values: values,
                    cols: cols
                })
            })
        }

        event.preventDefault();
    }

    render() {
        if (!this.state.header[0]) {
            return
        }

        return (
            <RenderView
                editorActive={this.state.editorActive}
                header={this.state.header}
                skills={this.state.skills}
                experience={this.state.workExperience}
                education={this.state.education}
                submit={this.handleSubmit}
            />
        )
    }

}

export default Resume;