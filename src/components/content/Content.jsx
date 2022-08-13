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

// Transferring from class components into functional components
function Content(props) {

    // Initializing state variables
    const [initial_loading_screen, set_initial_loading_screen] = useState(true)
    const [data, set_data] = useState([])
    const [table_headers] = useState(props.table_headers)

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
        Promise.all(response).then(results => {
            set_data(results)
            set_initial_loading_screen(false)
        })
    }, [table_headers])

    // Display while fetching data from api
    if (initial_loading_screen) return <InitialRender />

    // Form
    return (
        <form onSubmit={submitHandler}>
            <EditorView
                data={data}
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

export default Content;
