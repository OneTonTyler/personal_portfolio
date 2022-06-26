import React, { Component } from 'react';
import './App.css';

import { Blog, Home, Projects, Resume } from './containers';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

class App extends Component {
    state = {
        data: null
    };

    componentDidMount() {
        this.callBackendAPI()
            .then(res => this.setState({ data: res.express }))
            .catch(err => console.log(err));
    };

    callBackendAPI = async () => {
        const response = await fetch('/express_backend');
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body
    };

    render() {
        return (
            <div className='App'>
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/resume" element={<Resume />} />
                    </Routes>
                </Router>

                <p className="App-intro">{this.state.data}</p>
            </div>
        )
    }
}

export default App;