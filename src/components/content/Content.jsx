import './content.css';
import React, { Component } from 'react';

// Helper function
import { DisplayEntryBlock, GetColumnNames, GetPageData, FetchRequest, FormatPageData } from './HelperFunction';

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
    constructor(props) {
        super(props);

        this.submitHandler = this.submitHandler.bind(this)
    }

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

    async submitHandler(event) {
        const table_headers = this.state.table_headers
        const table_columns = GetColumnNames(this.state.data)
        const raw_page_data = GetPageData(event, table_columns)

        await FormatPageData(raw_page_data, table_headers, table_columns, '/api')

        event.preventDefault();
    }

    // TODO: Add error handling

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

        this.submitHandler = this.submitHandler.bind(this)
    }

    render() {
        if (this.state.initial_loading_screen) return <InitialRender />

        return (
            <form onSubmit={this.submitHandler}>
                <EditorView
                    data={this.state.data}
                    section_headers={['', '', 'Job', 'Certification']}
                    section_titles={['Title Block', 'Skills Block', 'Work Experience', 'Education Block']}
                />

                <div className='button-group'>
                    <button type='submit' className='btn btn-outline-primary active'>Submit</button>
                    <button type='submit' name='render' className='btn btn-outline-primary'>Render</button>
                    <button type='reset' className='btn btn-outline-primary'>Cancel</button>
                    <button type='button' className='btn btn-outline-primary'>Editor</button>

                    <div className='button-group__view'>
                        <button type='button' onClick={() => window.open('/resume/render')} className='btn btn-primary'>View</button>
                    </div>
                </div>
            </form>
        )
    }

}

export default Content;
