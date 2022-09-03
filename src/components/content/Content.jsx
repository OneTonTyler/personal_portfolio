import './content.css';
import React, { useState, useEffect } from 'react';
import {
    FaAt,
    FaBolt,
    FaCode,
    FaFingerprint,
    FaGalacticRepublic,
    FaHiking,
    FaLinkedin,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaReact,
    FaRegCalendarAlt
} from 'react-icons/fa';

// Necessary imports for doughnut graph
import { Doughnut } from 'react-chartjs-2'
import { ArcElement, Chart as ChartJS, Legend } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'

// Helper functions
import { DisplayEntryBlock, GetColumnNames, GetPageData, SendPageData } from './HelperFunction';

// Required for chart
ChartJS.register(ArcElement, Legend, ChartDataLabels)

// Loading screen for the initial render
const InitialRender = () => {
    return (
        <div>
            <h1>Please wait while the page is loading...</h1>
        </div>
    )
}

// Display appropriate icon
function Icon(props) {
    const icon_list = {
        FaAt: <FaAt/>,
        FaBolt: <FaBolt/>,
        FaCode: <FaCode/>,
        FaFingerprint: <FaFingerprint/>,
        FaGalacticRepublic: <FaGalacticRepublic/>,
        FaHiking: <FaHiking/>,
        FaLinkedin: <FaLinkedin/>,
        FaMapMarkerAlt: <FaMapMarkerAlt/>,
        FaPhoneAlt: <FaPhoneAlt/>,
        FaReact: <FaReact/>,
        FaRegCalendarAlt: <FaRegCalendarAlt/>,
    }

    return icon_list[props.icon]
}

// Standalone components that need to be added to the database
function MyTime() {
    const data = {
        labels: ['A', 'B', 'C', 'D'],
        datasets: [
            {
                data: [40, 30, 20, 10],
                backgroundColor: [
                    'hsl(207, 44%, 49%)',
                    'hsl(207, 44%, 60%)',
                    'hsl(207, 44%, 70%)',
                    'hsl(207, 44%, 80%)'
                ],
                borderColor: 'white',
                borderWidth: 5,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false
            },
            datalabels: {
                formatter: (value, ctx) => {
                    return ctx.chart.data.labels[ctx.dataIndex];
                },
                color: '#fff',
                backgroundColor: '#404040',
                borderRadius: 3,
                borderWidth: 10,
            },
        },
        responsive: true,
    }

    return (
        <div className='resume__time'>
            <Doughnut data={data} options={options}/>

            <div>
                <p>A</p>
                <p>Rewriting programs to optimize code for readability and reusability</p>

                <p>B</p>
                <p>Learning new languages</p>

                <p>C</p>
                <p>Studying for finals</p>

                <p>D</p>
                <p>Spending time outdoors with my dog</p>
            </div>
        </div>
    )
}
function Passions() {
    return (
        <div>
            <div className='resume__passions-body'>
                <h3><FaHiking/></h3>
                <p>I love to explore and try to hike a new trail every month.</p>
            </div>

            <div className='resume__passions-body'>
                <h3><FaGalacticRepublic/></h3>
                <p>Meeting new people, joining different clubs to help stay active and involved.</p>
            </div>

            <div className='resume__passions-body'>
                <h3><FaFingerprint/></h3>
                <p>Studying machine learning and AI algorithms, as they are becoming more common within our daily lives.</p>
            </div>
        </div>
    )
}
function ContactMe() {
    return (
        <div>
            <div className='resume__passions-body'>
                <h3><FaPhoneAlt/></h3>
                <p>(901) 498-9869</p>
            </div>

            <div className='resume__passions-body'>
                <h3><FaAt/></h3>
                <p>TylerAllenSingleton@pm.me</p>
            </div>

            <div className='resume__passions-body'>
                <h3><FaLinkedin/></h3>
                <p><a href='www.linkedin.com/in/tyler-a-singleton'>www.linkedin.com/in/tyler-a-singleton</a></p>
            </div>

            <div className='resume__passions-body'>
                <h3><FaMapMarkerAlt/></h3>
                <p>Littleton, CO 80127</p>
            </div>
        </div>
    )
}

// Components
function Editor(props) {
    const id = `${props.form_id}`

    return (
        <div className={props.className}>
            <label form={id} className='form-label'/>
            <textarea id={id} className='form-control' defaultValue={props.content} rows={props.rows}/>
        </div>
    )
}
function TitleBlock(props) {
    const [header, set_header] = useState(props.header)

    // Editor View
    const display_editor = header.map((subsection, idx) => {
        return (
            <div key={`Header_${idx}`}>
                <Editor content={subsection['TITLE']} form_id='TITLE' className='title' rows={1}/>
                <Editor content={subsection['SUBTITLE']} form_id='SUBTITLE' className='subtitle' rows={1}/>
                <Editor content={subsection['OBJECTIVE']} form_id='OBJECTIVE' className='objective' rows={6}/>
            </div>
        )
    })

    // Normal View
    const display_render = header.map((subsection, idx) => {
        return (
            <div key={`Header_${idx}`}>
                <h1>{subsection['TITLE']}</h1>
                <h2>{subsection['SUBTITLE']}</h2>
                <p>{subsection['OBJECTIVE']}</p>
            </div>
        )
    })

    return (props.editor) ? display_editor : display_render
}
function ExperienceBlock(props) {
    const [experience, set_experience] = useState(props.experience)

    const display_editor = experience.map((subsection, idx) => {
        return (
            <div key={`Experience_${idx}`}>
                <Editor content={subsection['JOB_TITLE']} form_id='JOB_TITLE' className='job_title' rows={1}/>
                <Editor content={subsection['JOB_DESCRIPTION']} form_id='JOB_DESCRIPTION' className='job_description' rows={6}/>
                <Editor content={subsection['JOB_LOCATION']} form_id='JOB_LOCATION' className='job_location' rows={1}/>
                <Editor content={subsection['JOB_EMPLOYER']} form_id='JOB_EMPLOYER' className='job_employer' rows={1}/>
                <Editor content={subsection['DUTIES']} form_id='DUTIES' className='duties' rows={6}/>
                <Editor content={subsection['DATE_STARTED']} form_id='DATE_STARTED' className='date_started' rows={1}/>
                <Editor content={subsection['DATE_ENDED']} form_id='DATE_ENDED' className='date_ended' rows={1}/>
            </div>
        )
    })

    const display_render = experience.map((subsection, idx) => {
        return (
            <div key={`Experience_${idx}`}>
                <h3>{subsection['JOB_TITLE']}</h3>
                <h4>{subsection['JOB_EMPLOYER']}</h4>
                <p>{subsection['DATE_STARTED']} - {subsection['DATE_ENDED']}</p>
                <p>{subsection['JOB_LOCATION']}</p>
                <p>{subsection['JOB_DESCRIPTION']}</p>
                <p>{subsection['DUTIES']}</p>
            </div>
        )
    })

    return (props.editor) ? display_editor : display_render

}
function EducationBlock(props) {
    const [education, set_education] = useState(props.education)

    const display_editor = education.map((subsection, idx) => {
        return (
            <div key={`Education_${idx}`}>
                <Editor content={subsection['DEGREE']} form_id='DEGREE' className='degree'/>
                <Editor content={subsection['SCHOOL']} form_id='SCHOOL' className='school'/>
                <Editor content={subsection['DATE_STARTED']} form_id='DATE_STARTED' className='date_started'/>
                <Editor content={subsection['DATE_ENDED']} form_id='DATE_ENDED' className='date_ended'/>
            </div>
        )
    })

    const display_render = education.map((subsection, idx) => {
        return (
            <div key={`Education_${idx}`}>
                <h3>{subsection['DEGREE']}</h3>
                <h4>{subsection['SCHOOL']}</h4>
                <p>{subsection['DATE_STARTED']} - {subsection['DATE_ENDED']}</p>
            </div>
        )
    })

    return (props.editor) ? display_editor : display_render
}
function SkillsAndAttributes(props) {
    const [achievements, set_achievements] = useState(props.achievements)
    const icon_list = [
        <FaCode/>, <FaBolt/>, <FaGalacticRepublic/>
    ]

    const display_editor = achievements.map((subsection, idx) => {
        return (
            <div key={`SkillsAndAttributes_${idx}`}>
                <Editor content={subsection['TITLE']} form_id='TITLE' className='title' rows={1}/>
                <Editor content={subsection['CONTENT']} form_id='CONTENT' rows={3}/>
            </div>
        )
    })

    const display_render = achievements.map((subsection, idx) => {
        return (
            <div className='achievements_wrapper' key={`SkillsAndAttributes_${idx}`}>
                <h3>{icon_list[idx]}</h3>
                <div className='achievements'>
                    <h3>{subsection['TITLE']}</h3>
                    <p>{subsection['CONTENT']}</p>
                </div>
            </div>
        )
    })

    return (props.editor) ? display_editor : display_render
}

// Display Components
function Form(props) {
    const [table_headers] = useState(props.table_headers)
    const [data, set_data] = useState(props.data)
    const [editor, set_editor] = useState(false)

    function ToggleEditor(event) {
        if(editor) {
            let page_data = data

            // Get the column names from each table
            const column_names = table_headers.map(header => {
                return Object.keys(data[header][0]).slice(1)
            })

            // Get all values associated with its respective div
            column_names.map((subsection, idx) => {
                const subsection_data = subsection.map(header => {
                    const form = event.target.form
                    const container = form.querySelector(`[id^=${table_headers[idx]}]`)

                    return Array.from(container.querySelectorAll(`[id^=${header}]`), ({ value }) => value)
                })

                // Update values
                subsection_data.map((values, index) => {
                    for (let i = 0; i < values.length; i++) {
                        page_data[`${table_headers[idx]}`][i][`${subsection[index]}`] = values[i]
                    }
                })
            })

            set_data(page_data)
        }

        set_editor(!editor)
    }

    // Form submission
    async function submitHandler(event) {
        const table_columns = GetColumnNames(data)
        const raw_page_data = GetPageData(event, table_columns)

        await SendPageData(raw_page_data, table_headers, table_columns, '/api')
        event.preventDefault();
    }

    return (
        <div>
            <form className='form_container' onDoubleClick={ToggleEditor}>
                <div className='title_wrapper' id='resume_header'>
                    <TitleBlock header={data['resume_header']} editor={editor}/>
                </div>

                <div className='left_column' >
                    {/* Experience */}
                    <div className='section_wrapper' id='resume_experience'>
                        <h2>Experience</h2>
                        <ExperienceBlock experience={data['resume_experience']} editor={editor}/>
                    </div>

                    {/* Education */}
                    <div className='section_wrapper' id='resume_education'>
                        <h2>Education</h2>
                        <EducationBlock education={data['resume_education'].slice(0, 1)} editor={editor}/>
                    </div>

                    {/* Certifications */}
                    <div className='section_wrapper' id='resume_education_certifications'>
                        <h2>Certifications</h2>
                        <EducationBlock education={data['resume_education'].slice(1)} editor={editor}/>
                    </div>
                </div>

                <div className='right_column'>
                    <div className='section_wrapper' id='resume_skills'>
                        <h2>Achievements</h2>
                        <SkillsAndAttributes achievements={data['resume_skills']} editor={editor} label='resume_skills'/>
                    </div>

                    <div className='section_wrapper'>
                        <h2>My Time</h2>
                        <MyTime/>
                    </div>

                    <div className='section_wrapper'>
                        <h2>Passions</h2>
                        <Passions/>
                    </div>

                    <div className='section_wrapper'>
                        <h2>Contact Me</h2>
                        <ContactMe/>
                    </div>
                </div>
            </form>
        </div>
    )
}
function Render(props) {

}

// Main Component
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
    return <Form data={data} table_headers={table_headers}/>
}

export default FormEditor;
