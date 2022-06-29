import React, { Component } from 'react';
import './projects.css';

class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] }
    };

    componentDidMount() {
        this.callBackendApi()
            .then(res => this.setState({ data: res.message }))
            .catch(err => console.log(err));
    };

    callBackendApi = async () => {
        const response = await fetch('/api?table=Projects');
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body
    };

    renderProjects = () => {
        const projects = this.state.data;

        return projects.map(project => {
            return [
                <div key={project['ID']}>
                    <p>Title: {project['TITLE']}</p>
                    <p>Description: {project['DESCRIPTION']}</p>
                    <p>Content: {project['CONTENT']}</p>
                    <br />
                </div>
            ];
        });
    }

    render() {
        const renderProjects = this.renderProjects();

        return (
            <div>
                {renderProjects}
            </div>
        );
    };
}

export default Projects;