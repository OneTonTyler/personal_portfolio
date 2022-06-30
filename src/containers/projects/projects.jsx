import React, { Component } from 'react';
import './projects.css';

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

export default Projects;