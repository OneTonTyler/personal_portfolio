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
                ID: null,
                TITLE: null,
                DESCRIPTION: null,
                CONTENT: null,
                DATE_CREATED: null,
                DATE_EDITED: null
            }]
        };
    };

    componentDidMount() {
        this.callBackendApi()
            .then(res => {
                this.setState({data: res.message});
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
                    <form>
                        {/* Project Title */}
                        <div className={'mb-3'}>
                            <label form={'projectTitle'} className={'form-label'}>Project Title</label>
                            <input type={'text'} className={'form-control'} id={'projectTitle'} />
                            <div id={'titleHelpBlock'} className={'form-text'}>150 characters remaining</div>
                        </div>

                        {/* Description */}
                        <div className={'mb-3'}>
                            <label form={'projectDescription'} className={'form-label'}>Description</label>
                            <textarea className={'form-control'} rows={3}></textarea>
                            <div id={'descriptionHelpBlock'} className={'form-text'}>150 characters remaining</div>
                        </div>

                        {/* Content */}
                        <div className={'mb-3'}>
                            <label form={'projectContent'} className={'form-label'}>Content</label>
                            <textarea className={'form-control'} rows={6}></textarea>
                            <div id={'contentHelpBlock'} className={'form-text'}>250 characters remaining</div>
                        </div>
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