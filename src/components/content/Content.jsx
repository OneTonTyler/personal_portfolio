import './content.css';
import React, { Component, useState, useEffect } from 'react';

// Helper functions
import { DisplayEntryBlock, GetColumnNames, GetPageData, SendPageData } from './HelperFunction';

// Loading screen for the initial render
const InitialRender = () => {
    return (
        <div>
            <h1>Please wait while the page is loading...</h1>
        </div>
    )
}

// Editor view
const EditorView = props => {
    const data = props.data
    const section_titles = props.section_titles
    const section_headers = props.section_headers

    return data.map((data_entry, idx) => {
        const section = DisplayEntryBlock(data_entry, section_headers[idx])
        const section_title = section_titles[idx]

        return (
            <div key={section_title}>
                <h2>{section_title}</h2>
                {section}
            </div>
        )
    })
}

// Render View
function Editor(props) {
    return (
        <div className={props.className}>
            <label form={props.form_id} className='form-label'/>
            <textarea id={props.form_id} className='form-control' defaultValue={props.content} rows={props.rows}/>
        </div>
    )
}

function TitleBlock(props) {
    const [editor, set_editor] = useState(false)

    const [title] = useState(props.header['TITLE'])
    const [subtitle] = useState(props.header['SUBTITLE'])
    const [objective] = useState(props.header['OBJECTIVE'])

    function ToggleEditor() {
        set_editor(!editor)
    }

    // Editor View
    if (editor) {
        return (
            <div onDoubleClick={ToggleEditor}>
                <Editor content={title} form_id='title' className='title' rows={1}/>
                <Editor content={subtitle} form_id='subtitle' className='subtitle' rows={1}/>
                <Editor content={objective} form_id='objective' className='objective' rows={6}/>
            </div>
        )
    }

    // Normal View
    return (
        <div onDoubleClick={ToggleEditor}>
            <h1>{title}</h1>
            <h2>{subtitle}</h2>
            <p>{objective}</p>
        </div>
    )
}

function ExperienceBlock(props) {
    const [job_title] = useState(props.experience['JOB_TITLE'])
    const [job_description] = useState(props.experience['JOB_DESCRIPTION'])
    const [job_location] = useState(props.experience['JOB_LOCATION'])
    const [job_employer] = useState(props.experience['JOB_EMPLOYER'])
    const [duties] = useState(props.experience['DUTIES'])
    const [date_started] = useState(props.experience['DATE_STARTED'])
    const [date_ended] = useState(props.experience['DATE_ENDED'])

    const [editor, set_editor] = useState(false)

    function ToggleEditor() {
        set_editor(!editor)
    }

    if (editor) {
        return (
            <div onDoubleClick={ToggleEditor}>
                <Editor content={job_title} form_id='job_title' className='job_title' rows={1}/>
                <Editor content={job_description} form_id='job_subtitle' className='job_description' rows={6}/>
                <Editor content={job_location} form_id='job_location' className='job_location' rows={1}/>
                <Editor content={job_employer} form_id='job_employer' className='job_employer' rows={1}/>
                <Editor content={duties} form_id='duties' className='duties' rows={6}/>
                <Editor content={date_started} form_id='date_started' className='date_started' rows={1}/>
                <Editor content={date_ended} form_id='date_ended' className='date_ended' rows={1}/>
            </div>
        )
    }

    return (
        <div onDoubleClick={ToggleEditor}>
            <h3>{job_title}</h3>
            <h4>{job_employer}</h4>
            <p>{date_started} - {date_ended}</p>
            <p>{job_location}</p>
            <p>{job_description}</p>
            <p>{duties}</p>
        </div>
    )

}

function EducationBlock(props) {
    const [editor, set_editor] = useState(false)

    const [school] = useState(props.education['SCHOOL'])
    const [degree] = useState(props.education['DEGREE'])
    const [date_started] = useState(props.education['DATE_STARTED'])
    const [date_ended] = useState(props.education['DATE_ENDED'])

    function ToggleEditor() {
        set_editor(!editor)
    }

    if (editor) {
        return (
            <div onDoubleClick={ToggleEditor}>
                <Editor content={degree} from_id='degree' className='degree'/>
                <Editor content={school} from_id='school' className='school'/>
                <Editor content={date_started} from_id='date_started' className='date_started'/>
                <Editor content={date_ended} from_id='date_ended' className='date_ended'/>
            </div>
        )
    }

    return (
        <div onDoubleClick={ToggleEditor}>
            <h3>{degree}</h3>
            <h4>{school}</h4>
            <p>{date_started} - {date_ended}</p>
        </div>
    )
}

function FormEditor() {
    // Initializing state variables
    const [table_headers] = useState(['resume_header', 'resume_skills', 'resume_experience', 'resume_education'])
    const [initial_loading_screen, set_initial_loading_screen] = useState(true)
    const [data, set_data] = useState([])

    // API request
    function callBackendApi(table_name) {
        return new Promise(async (resolve, reject) => {
            const response = await fetch(`./api/list_all?table=${table_name}`)
            const body = await response.json()

            if (response.status !== 200) {
                reject(body.errorMessage);
            } else {
                resolve(body.message)
            }
        })
    }

    // Form submission
    async function submitHandler(event) {
        const table_columns = GetColumnNames(data)
        const raw_page_data = GetPageData(event, table_columns)

        await SendPageData(raw_page_data, table_headers, table_columns, '/api')

        event.preventDefault();
    }

    // Fetch data from api
    useEffect(() => {
        const response = table_headers.map(table_name => {
            return callBackendApi(table_name)
                .catch(err => console.log(err))
        })

        // Resolve promises and update state
        Promise.all(response).then(values => {
            // Create a key value pair
            let results = {}
            table_headers.forEach((header, idx) => results[header] = values[idx])

            // Update state
            set_data(results)
            set_initial_loading_screen(false)
        })

    }, [table_headers])

    // Display while fetching data from api
    if (initial_loading_screen) return <InitialRender />

    // Form
    return (
        <div>
            <form className='form_container'>
                <div className='title_wrapper'>
                    <TitleBlock header={data['resume_header'][0]}/>
                </div>

                <div className='left_column' >
                    {/* Experience */}
                    <div className='section_wrapper'>
                        <h2>Experience</h2>
                        <ExperienceBlock experience={data['resume_experience'][0]}/>
                        <ExperienceBlock experience={data['resume_experience'][1]}/>
                        <ExperienceBlock experience={data['resume_experience'][2]}/>
                    </div>

                    {/* Education */}
                    <div className='section_wrapper'>
                        <h2>Education</h2>
                        <EducationBlock education={data['resume_education'][0]}/>
                    </div>

                    {/* Certifications */}
                    <div className='section_wrapper'>
                        <h2>Certifications</h2>
                        <EducationBlock education={data['resume_education'][1]}/>
                        <EducationBlock education={data['resume_education'][2]}/>
                    </div>
                </div>

                <div className='right_column'>
                    <div className='section_wrapper'>
                        <h2>Achievements</h2>
                    </div>

                    <div className='section_wrapper'>
                        <h2>My Time</h2>
                    </div>

                    <div className='section_wrapper'>
                        <h2>Passions</h2>
                    </div>

                    <div className='section_wrapper'>
                        <h2>Contact Me</h2>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default FormEditor;
