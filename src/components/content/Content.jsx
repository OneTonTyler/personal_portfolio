import './content.css';
import React, { Component } from 'react';

// TODO: Save in separate file
// Helper Functions

// Editor
function DisplaySectionTitle(section_title, id) {
    if (section_title !== '') return <h4>{section_title} {id}</h4>
}

// Returns an input field a given key, value pair
function DisplayInputField(data_entry) {
    const columns = Object.keys(data_entry)  // Get column names

    return columns.map(column_name => {
        let value = data_entry[column_name]
        let label = `${column_name} ${data_entry['ID']}`
        let rows = 1

        // Increase the row size when the length of text exceeds 90 characters
        if (value.length > 90) rows = 6

        return (
            <div className='mb-3' key={label}>
                <label form={label} className='form-label'>{column_name}</label>
                <textarea id={label} className='form-control' defaultValue={value} rows={rows}/>
            </div>
        )
    })
}

// Return a collection of input fields for each section
function DisplayEntryBlock(input_fields, section_headers) {
    const input_block = input_fields.map((data_entry, idx) => {
        // Unique key for div
        const label = `${section_headers} ${idx}`

        // Check for blank section headers
        if (section_headers === '') return DisplayInputField(data_entry)

        return (
            <div key={label}>
                <h4>{label}</h4>
                {DisplayInputField(data_entry)}
            </div>
        )
    })

    return input_block
}

// Render


// Loading screen for the initial render
const InitialRender = props => {
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

class StandardComponent extends Component {

    // Connect to the server
    callBackendApi = table_name => {
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

    // Check component mounted
    async componentDidMount() {
        const table_headers = this.state.table_headers
        const data = table_headers.map((table_name, idx) => {
            return this.callBackendApi(table_name)
                .catch(err => console.log('Table not found'))
        })

        // Resolve promises and update state
        Promise.all(data).then(results => this.setState({data: results, initial_loading_screen: false}))
    }


    render() {
        return <InitialRender />
    }
}


class Content extends StandardComponent {
    constructor(props) {
        super(props);
        this.state = {
            // API request
            data: null,
            table_headers: ['resume_header', 'resume_skills', 'resume_experience', 'resume_education'],

            // Check loading state
            initial_loading_screen: true,
            hasPageLoaded: null,

            // Errors
            hasError: false,
        }
    }

    render() {
        if (this.state.initial_loading_screen) return <InitialRender />

        return (
            <EditorView
                data={this.state.data}
                section_headers={['', '', 'Job', 'Certification']}
                section_titles={['Title Block', 'Skills Block', 'Work Experience', 'Education Block']}
            />
        )
    }

}

export default Content;
