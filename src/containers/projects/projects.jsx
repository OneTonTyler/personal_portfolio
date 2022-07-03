import React, { Component } from 'react';
import DOMPurify from 'dompurify';
import './projects.css';

class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            editorActive: true,
            sections: {},
            data: {}
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.callBackendApi()
            .then(res => {
                if (!res.message) {
                    this.setState({hasError: true});  // Basic error handling for empty responses
                }
                else {
                    this.setState({data: res.message});
                }
            })
            .catch(err => console.log(err))
    }

    // Connect to mySQL database
    callBackendApi = async () => {
        const response = await fetch('/api?table=Projects&id=0');
        const body = await response.json();

        if (response.status !== 200) {
            this.setState({hasError: true})  // Bad request
            throw Error(body.errorMessage);
        }
        return body;
    }

    // Send patch request to mySQL database
    async handleSubmit(event) {
        const values = [];
        const cols = [];

        // Get new values
        ['title', 'description', 'content'].forEach(element => {
            let newValue = event.target.querySelector(`#${element}`).value;
            let currentValue = this.state.data[element.toUpperCase()];

            if (currentValue !== newValue) {
                values.push(newValue);
                cols.push(element.toUpperCase());
            }
        });

        // Only submit request if values changed
        if (values[0]) {
            let date_edited = new Date().toISOString()
                .replace('T', ' ')
                .slice(0, -5);

            values.push(date_edited);
            cols.push('DATE_EDITED');

            await fetch('/api', {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    table: 'projects',
                    id: this.state.data['ID'],
                    values: values,
                    cols: cols
                })
            });
        } else return;

        event.preventDefault();
    }

    render() {
        // Initialize constants
        const project = this.state.data;
        const {
            ID: id,
            TITLE: title,
            DESCRIPTION: description,
            CONTENT: content,
            DATE_CREATED: date_created,
            DATE_EDITED: date_edited } = project;

        // Check for error
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>
        }

        // Render components
        else if (this.state.editorActive) {
            return (
                <div key='id' className='project__container-content'>
                    <form onSubmit={this.handleSubmit}>
                        {/* Project Title */}
                        <div className='mb-3'>
                            <label form='title' className='form-label'>Project Title</label>
                            <input type='text' className='form-control' id='title' defaultValue={title}/>
                        </div>

                        {/* Description Block */}
                        <div className='mb-3'>
                            <label form='description' className='form-label'>Description</label>
                            <textarea className='form-control' id='description' defaultValue={description} rows='6'/>
                        </div>

                        {/*Content Block*/}
                        <div className='mb-3'>
                            <label form='content' className='form-label'>Content</label>
                            <textarea className='form-control' id='content' defaultValue={content} rows='12'/>
                        </div>

                        {/*Submit content to sql database*/}
                        <button type='submit' className='btn btn-primary'>Submit</button>
                    </form>
                </div>
            )
        }

        return (
            <div>
                <p>{id}</p>
                <p>{title}</p>
                <p>{description}</p>
                <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}/>
                <p>{date_created}</p>
                <p>{date_edited}</p>
            </div>
        );
    }
}

export default Projects;