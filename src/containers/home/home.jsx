import React, { Component } from 'react';
import './home.css';


const RenderView = props => {
    let {
        PROFILE_IMG: profile_img,
        TITLE: title,
        CONTENT: content } = props.data;

    if (!profile_img) {
        profile_img = 'portfolio.jpg'
    }

    return (
        <div className='home__render-view'>
            <h1>Guest View</h1>

            <div className='home__render-view__content'>
                <img src={require(`../../assests/profile/${profile_img}`)} alt='profile'/>
            </div>

            <div className='home__render-view__content'>
                <h1>{title}</h1>
            </div>

            <div className='home__render-view__content'>
                <p>{content}</p>
            </div>
        </div>
    )
}

const EditorView = props => {
    let {
        PROFILE_IMG: profile_img,
        TITLE: title,
        CONTENT: content } = props.data;

    if (!profile_img) {
        profile_img = 'portfolio.jpg'
    }

    return (
        <div className='home__container-content'>
            <form onSubmit={props.submit}>
                <h1>Content Editor</h1>

                {/* Profile image path */}
                <div className='mb-3'>
                    <label form='home_img' className='form-label'>Profile Image</label>
                    <input type='text' id='home_img' className='form-control' defaultValue={profile_img}/>
                </div>

                {/* Title */}
                <div className='mb-3'>
                    <label form='home_title' className='form-label'>Title</label>
                    <input type='text' id='home_title' className='form-control' defaultValue={title}/>
                </div>

                {/* About Me */}
                <div className='mb-3'>
                    <label form='home_content' className='form-label'>Content</label>
                    <textarea className='form-control' id='home_content' defaultValue={content} />
                </div>

                {/* Upload content to sql database */}
                <div className='btn-group' role='group'>
                    <button type='submit' className='btn btn-primary'>Submit</button>
                    <button type='submit' className='btn btn-outline-primary'>Render</button>
                    <button type='submit' className='btn btn-outline-primary'>Cancel</button>
                </div>

            </form>
            {/* Guest View */}
            <RenderView data={props.data} />
        </div>
    )
}

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            editorActive: true,
            data: {}
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.callBackendApi()
            .then(res => {
                if (!res.message) {
                    this.setState({hasError: true});  // Basic error handling
                }
                else {
                    this.setState({data: res.message});
                }
            })
            .catch(err => console.log(err));
    }

    // Connect to mySQL database
    callBackendApi = async () => {
        const response = await fetch('/api?table=HomePage&id=0');
        const body = await response.json()

        if (response.status !== 200) {
            this.setState({hasError: true})  // Bad request
            throw Error(body.errorMessage);
        }
        return body;
    }

    async handleSubmit(event) {
        console.log('Test');
    }

    async handleRender(event) {

    }

    async handleCancel(event) {

    }


    render() {
        let { CONTENT: content } = this.state.data;

        if (this.state.editorActive) {
            return (
                <EditorView
                    data={this.state.data} submit={this.handleSubmit}/>
            )
        }

        return (
            <div>
                <p>{content}</p>
            </div>
        );
    }
}

export default HomePage;