import React from 'react';
import './App.css';

import { Navbar } from './components/index';
import { Blog, Home, Projects, ResumeEditor, ResumeRender } from './containers';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
    return (
        <div className='App'>
            <div>
                <Navbar />
            </div>

            <Router>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/blog" element={<Blog/>}/>
                    <Route path="/projects" element={<Projects/>}/>
                    <Route path="/projects/edit" element={<Projects/>}/>
                    <Route path="/resume/editor" element={<ResumeEditor/>}/>
                    <Route path="/resume/render" element={<ResumeRender/>}/>
                </Routes>
            </Router>
        </div>
    )
}

export default App;