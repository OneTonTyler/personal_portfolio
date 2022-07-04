import React from 'react';
import './App.css';

import { Navbar } from './components/index';
import { Blog, Home, Projects, Resume } from './containers';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
    return (
        <div className='App'>
            <div>
                <Navbar />
            </div>

            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/projects/edit" element={<Projects />} />
                    <Route path="/resume" element={<Resume />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App;