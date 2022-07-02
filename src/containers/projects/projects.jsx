import React, { Component } from 'react';
import DOMPurify from 'dompurify';
import './projects.css';

class NewProjects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            editorActive: false,
            sections: {},
            data: {}
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.callBackendApi()
            .then(res => {
                this.setState({data: res.message})
            })
            .catch(err => console.log(err))
    }

    callBackendApi = async () => {
        const response = await fetch('/api?table=Projects&id=0');
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.errorMessage);
        }
        return body;
    }

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

        // Render components
        if (this.state.editorActive) {
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


class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            editorActive: true,
            index: 0,
            data: [{
                ID: '',
                TITLE: '',
                DESCRIPTION: '',
                CONTENT: '',
                DATE_CREATED: '',
                DATE_EDITED: ''
            }],
            title: '',
            content: '',
            description: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    };

    async handleSubmit(event) {
        const title = this.state.title;
        const description = this.state.description;
        const content = this.state.content;

        await fetch('/api', {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                table: 'projects',
                id: 0,
                values: [title, description, content],
                cols: ['TITLE', 'DESCRIPTION', 'CONTENT']
            })
        });

        event.preventDefault();
    };

    handleChange(event) {
        const state = event.target.id;
        const value = event.target.value;

        if (state === 'projectTitle') this.setState({title: value});
        if (state === 'projectDescription') this.setState({description: value});
        if (state === 'projectContent') this.setState({content: value});

        console.log(state);
        console.log(value);
    };

    componentDidMount() {
        this.callBackendApi()
            .then(res => {
                this.setState({data: res.message});

                const project = res.message.at(this.state.index);
                this.setState({title: project['TITLE']});
                this.setState({description: project['DESCRIPTION']});
                this.setState({content: project['CONTENT']});
            })
            .catch(err => console.log(err));
    };

    callBackendApi = async () => {
        const response = await fetch('/api?table=Projects');
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.errorMessage);
        }
        return body
    };

    renderProjects = () => {
        const projects = this.state.data;
        const project = projects.at(this.state.index);

        const {
            ID: id,
            TITLE: title,
            DESCRIPTION: description,
            CONTENT: content,
            DATE_CREATED: date_created,
            DATE_EDITED: date_edited } = project;

        // Display when in editor mode
        if (this.state.editorActive) {
            return (
                <div key={id} className={'project__container-content'}>
                    <form onSubmit={this.handleSubmit}>
                        {/* Project Title */}
                        <div className={'mb-3'}>
                            <label form={'projectTitle'} className={'form-label'}>Project Title</label>
                            <input type={'text'} className={'form-control'} id={'projectTitle'} defaultValue={title} onChange={this.handleChange}/>
                            <div id={'titleHelpBlock'} className={'form-text'}>150 characters remaining</div>
                        </div>

                        {/* Description */}
                        <div className={'mb-3'}>
                            <label form={'projectDescription'} className={'form-label'}>Description</label>
                            <textarea className={'form-control'} id={'projectDescription'} defaultValue={description} rows={6} onChange={this.handleChange}></textarea>
                            <div id={'descriptionHelpBlock'} className={'form-text'}>150 characters remaining</div>
                        </div>

                        {/* Content */}
                        <div className={'mb-3'}>
                            <label form={'projectContent'} className={'form-label'}>Content</label>
                            <textarea className={'form-control'} id={'projectContent'} defaultValue={content} rows={12} onChange={this.handleChange}></textarea>
                            <div id={'contentHelpBlock'} className={'form-text'}>250 characters remaining</div>
                        </div>

                        {/* Submit Content to SQL Database */}
                        <button type={'submit'} className={'btn btn-primary'}>Submit</button>
                    </form>
                </div>
            );
        }

        // Guest view
        return (
            <div key={id} className={'project__container-content'}>
                <h1>Title: {title}</h1>
                <p>Description: {description}</p>
                <p>Content: {content}</p>
                <p>Date Created: {date_created}</p>
                <p>Date Edited: {date_edited}</p>
                <br />
            </div>
        );
    };

    render() {
        return (
            <div className={'project__container'}>
                <div className={'project__container-sidebar'}>
                    <p>Section 1</p>
                    <p>Section 2</p>
                    <p>Section 3</p>
                </div>

                {this.renderProjects()}
            </div>
        );
    };
}

export default NewProjects;