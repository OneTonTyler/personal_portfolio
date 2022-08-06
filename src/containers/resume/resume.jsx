import './resume.css';
import React, {Component} from 'react';
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
import {Doughnut} from 'react-chartjs-2';
import {ArcElement, Chart as ChartJS, Legend} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Required for chart
ChartJS.register(ArcElement, Legend, ChartDataLabels);

const RenderView = props => {

    // Normalize dates
    function convertDateTime(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {month: 'long', year: 'numeric'})
    }

    // Bulletize JSON Objects
    function normalizeJsonList(jsonString, key) {
        return JSON.parse(jsonString)['roles'].map((element, idx) => {
            return <li key={`${key}-${idx}`}>{element}</li>
        })
    }

    // Header block
    const Header = () => {
        const {
            OBJECTIVE,
            SUBTITLE,
            TITLE } = props.header[0];

        return (
            <div className='resume__header'>
                <h1>{TITLE}</h1>
                <h2>{SUBTITLE}</h2>
                <p>{OBJECTIVE}</p>
            </div>
        )
    }

    const WorkExperience = () => {
        const entries = props.experience.map(element => {
            let {
                ID,
                JOB_TITLE,
                JOB_DESCRIPTION,
                JOB_LOCATION,
                JOB_EMPLOYER,
                DUTIES,
                DATE_STARTED,
                DATE_ENDED
            } = element;

            DATE_STARTED = convertDateTime(DATE_STARTED);
            DATE_ENDED = convertDateTime(DATE_ENDED);
            DUTIES = normalizeJsonList(DUTIES, `${ID}__duties`);

            return (
                <div className='resume__experience' key={`${ID}__experience`}>
                    <div className='resume__experience-header'>
                        <h3>{JOB_TITLE}</h3>
                        <h4>{JOB_EMPLOYER}</h4>
                        <p className='resume__experience-dates'>
                            <span><FaRegCalendarAlt/> {DATE_STARTED} - {DATE_ENDED}</span>
                            <span><FaMapMarkerAlt/> {JOB_LOCATION}</span>
                        </p>
                    </div>

                    <div className='resume__experience-description'>
                        <p>{JOB_DESCRIPTION}</p>
                    </div>

                    <div>
                        <ul>{DUTIES}</ul>
                    </div>

                </div>
            )
        })

        return (
            <div className='resume__experience-container'>
                <h2>Experience</h2>
                {entries}
            </div>
        )
    }

    const Education = () => {
        let {
            SCHOOL,
            DEGREE,
            DATE_STARTED,
            DATE_ENDED
        } = props.education[0];

        DATE_STARTED = convertDateTime(DATE_STARTED);
        DATE_ENDED = convertDateTime(DATE_ENDED);

        return (
            <div className='resume__education'>
                <h2>Education</h2>
                <h3>{DEGREE}</h3>
                <h4>{SCHOOL}</h4>
                <p><FaRegCalendarAlt/> {DATE_STARTED} - {DATE_ENDED}</p>
            </div>
        )
    }

    const SkillsAndAttributes = () => {
        const {
            LANGUAGES,
            STUDIES,
            ATTRIBUTES
        } = props.skills[0];

        return (
            <div className='resume__skills'>
                <h2>Achievements</h2>
                <div className='resume__skills-body'>
                    <h3><FaCode/></h3>
                    <div>
                        <h3>Languages</h3>
                        <p>{LANGUAGES}</p>
                    </div>
                </div>

                <div className='resume__skills-body'>
                    <h3><FaBolt/></h3>
                    <div>
                        <h3>Studies</h3>
                        <p>{STUDIES}</p>
                    </div>
                </div>

                <div className='resume__skills-body'>
                    <h3><FaReact/></h3>
                    <div>
                        <h3>Attributes</h3>
                        <p>{ATTRIBUTES}</p>
                    </div>
                </div>
            </div>
        )
    }

    const MyTime = () => {
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
                <h2>My Time</h2>
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

    const Certifications = () => {
        const entries = props.education.map(element => {
            let {
                ID,
                SCHOOL,
                DEGREE,
                DATE_STARTED,
                DATE_ENDED
            } = element;

            DATE_STARTED = convertDateTime(DATE_STARTED);
            DATE_ENDED = convertDateTime(DATE_ENDED);

            // Return a value if and only if it's not the first result
            if (ID) {
                return (
                    <div className='resume__education' key={`${ID}__education`}>
                        <h3>{DEGREE}</h3>
                        <h4>{SCHOOL}</h4>
                        <p><FaRegCalendarAlt/> {DATE_STARTED} - {DATE_ENDED}</p>
                    </div>
                )
            }
        })

        return (
            <div>
                <h2>Certifications</h2>
                {entries}
            </div>
        )
    }

    const Passions = () => {
        return (
            <div>
                <h2>Passions</h2>

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

    const ContactMe = () => {
        return (
            <div>
                <h2>Contact Me</h2>
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

    return (
        <div>
            <Header/>

            <div className='resume__container-body'>
                {/* Left Column */}
                <div>
                    <WorkExperience/>
                    <Education/>
                    <Certifications/>
                </div>

                {/* Right Column */}
                <div>
                    <SkillsAndAttributes/>
                    <MyTime/>
                    <Passions/>
                    <ContactMe/>
                </div>
            </div>
        </div>
    )
}

const EditorView = props => {
    /* Displays the Section Title with Headers and Values
     *
     * Params:
     * DefaultView - Adds empty blocks to its respective block (int)
     * SectionTitle - The blue title for each block
     * Block - properties
     */
    function Display(DefaultView, SectionTitle, Block, BlockTitle) {
        // Make a copy else Block gets changed
        const BlockCopy = Block.map(element => element);

        // Helper function for creating headers
        function DisplaySectionTitle(ID) {
            if (SectionTitle !== '') return <h4>{SectionTitle} {ID}</h4>
        }

        // Helper function to display more visually pleasing rows
        function DisplayInputField(labelID, defaultValue, header) {
            let rows = 2;
            if (defaultValue.length > 90) {
                rows = 6;
            }

            // Normalize Dates
            if (header === 'DATE_STARTED' || header === 'DATE_ENDED') defaultValue = defaultValue.slice(0, 10);

            return (
                <div className='mb-3' key={labelID}>
                    <label form={labelID} className='form-label'>{header}</label>
                    <textarea id={labelID} className='form-control' defaultValue={defaultValue} rows={rows}/>
                </div>
            )
        }

        // Create empty objects
        if (DefaultView) {
            for (let i = 0; i < DefaultView; i++) {
                const Default = {};
                Object.keys(Block[0]).map(element => {
                    return (element === 'ID') ? Default[element] = Block.length : Default[element] = '';
                });

                BlockCopy.push(Default);
            }
        }

        // Returns a section for each block
        return BlockCopy.map(element => {
            const Headers = Object.keys(element);
            const ID = element[Headers.shift()];

            // Creates a form entry for each element
            const View = Headers.map(header => {
                return DisplayInputField(`${BlockTitle}__${header.toLowerCase()}__${ID}`, element[header], header);
            });

            return (
                <div key={`${ID}__${SectionTitle}`}>
                    <div className='resume__editor-section'>
                        {DisplaySectionTitle(ID)}
                        {View}
                    </div>
                </div>
            );
        })
    }

    const HeaderView = Display(0, '', props.header, 'resume_header');
    const SkillsView = Display(0, '',  props.skills, 'resume_skills');
    const ExperienceView = Display(1,  'Job Number', props.experience, 'resume_experience');
    const EducationView = Display(1, 'Certificate Number', props.education, 'resume_education');

    return (
        <div className='resume__container'>
            <h1>Editor View</h1>
            <form onSubmit={props.submit} onReset={props.cancel}>
                <h2>Title Block</h2>
                <section>{HeaderView}</section>

                <h2>Skills Block</h2>
                <section>{SkillsView}</section>

                <h2>Work Experience</h2>
                <section>{ExperienceView}</section>

                <h2>Education</h2>
                <section>{EducationView}</section>

                <div className='button-group'>
                    <button type='submit' name='submit' className='btn btn-outline-primary active'>Submit</button>
                    <button type='submit' name='render' className='btn btn-outline-primary'>Render</button>
                    <button type='reset' className='btn btn-outline-primary'>Cancel</button>
                    <button type='button' className='btn btn-outline-primary' onClick={props.editor}>Editor</button>
                </div>
            </form>
        </div>
    )
}

export class ResumeEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            editorActive: true,
            header: {}, original_header: {},
            skills: {}, original_skills: {},
            workExperience: {}, original_workExperience: {},
            education: {}, original_education: {},
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.toggleEditor = this.toggleEditor.bind(this);
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
            header: responses['resume_header'], original_header: responses['resume_header'],
            skills: responses['resume_skills'], original_skills: responses['resume_skills'],
            workExperience: responses['resume_experience'], original_workExperience: responses['resume_experience'],
            education: responses['resume_education'], original_education: responses['resume_education']
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

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    async handleSubmit(event) {
        const education_cols = ['SCHOOL', 'DEGREE', 'DATE_STARTED', 'DATE_ENDED'];
        const experience_cols = ['JOB_TITLE', 'JOB_LOCATION', 'JOB_EMPLOYER', 'JOB_DESCRIPTION', 'DUTIES', 'DATE_STARTED', 'DATE_ENDED'];
        const header_cols = ['TITLE', 'SUBTITLE', 'OBJECTIVE'];
        const skills_cols = ['LANGUAGES', 'STUDIES', 'ATTRIBUTES'];

        const tables = {
            resume_education: education_cols,
            resume_experience: experience_cols,
            resume_header: header_cols,
            resume_skills: skills_cols
        };

        // Cycle through the tables
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
                    if (sections[column][id].value !== '') values.push(sections[column][id].value);
                }

                // Submit request to SQL server
                // Render
                if (event.nativeEvent.submitter.name === 'render' && values.length) {
                    ClearRequest(table_name + '_render')
                        .then(() => FetchRequest(id, values, cols, table_name + '_render', 'POST', '/api/render'))
                }

                // Final
                if (values.length) {
                    FetchRequest(id, values, cols, table_name, 'PATCH', '/api');
                }
            }
        })

        // Request
        async function FetchRequest(id, values, cols, table_name, method, path) {
            await fetch(path, {
                method: method,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    table: table_name,
                    id: id,
                    values: values,
                    cols: cols
                })
            })
        }

        // Clear table
        async function ClearRequest(table_name) {
            await fetch('/api/render', {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    table: table_name
                })
            })
        }

        event.preventDefault();
    }

    handleCancel() {
        this.setState(
            {
                header: this.state.original_header,
                skills: this.state.original_skills,
                workExperience: this.state.original_workExperience,
                education: this.state.original_education
            }
        );
    }

    toggleEditor() {
        this.setState({editorActive: !this.state.editorActive});
    }

    render() {
        if (!this.state.header[0] || this.state.hasError) {
            return (
                <div>
                    <p>Something went wrong</p>
                </div>
            )
        }

        if (this.state.editorActive) {
            return (
                <EditorView
                    header={this.state.header}
                    skills={this.state.skills}
                    experience={this.state.workExperience}
                    education={this.state.education}
                    submit={this.handleSubmit}
                    cancle={this.handleCancel}
                    editor={this.toggleEditor}
                />
            )
        }

        return (
            <div className='resume__container'>
                <RenderView header={this.state.header}
                            skills={this.state.skills}
                            experience={this.state.workExperience}
                            education={this.state.education}
                            editor={this.toggleEditor}
                />
                <button type='button' className='btn btn-outline-primary' onClick={this.toggleEditor}>Editor</button>
            </div>
        );
    }
}

export class ResumeRender extends Component {
    constructor(props) {
        super(props);
        this.state = {
            header: {},
            skills: {},
            workExperience: {},
            education: {}
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
        const response = await fetch(`/api/list_all?table=${table}_render`);
        const body = await response.json()

        if (response.status !== 200) {
            this.setState({hasError: true})  // Bad request
            throw Error(body.errorMessage);
        }
        return body;
    }

    render() {
        console.log(this.state)
        if (!this.state.header[0]) {
            return (
                <div>
                    <p>Something went wrong</p>
                </div>
            )
        }

        return (
            <div className='resume__container'>
                <RenderView header={this.state.header}
                            skills={this.state.skills}
                            experience={this.state.workExperience}
                            education={this.state.education}
                            editor={this.toggleEditor}
                />
            </div>
        );
    }
}