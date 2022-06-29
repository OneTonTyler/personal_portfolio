import React, { Component } from 'react';
import './projects.css';

class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] }
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

        return projects.map(project => {

            const {
                ID: id,
                TITLE: title,
                DESCRIPTION: description,
                CONTENT: content,
                DATE_CREATED: date_created,
                DATE_EDITED: date_edited } = project;

            return [
                <div key={id} className={'project__container-content'}>
                    <h1>Title: {title}</h1>
                    <p>Description: {description}</p>
                    <p>Content: {content}</p>
                    <p>Date Created: {date_created}</p>
                    <p>Date Edited: {date_edited}</p>
                    <br />
                </div>
            ];
        });
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