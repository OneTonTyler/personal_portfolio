import React, { Component } from 'react';
import './home.css';


const RenderView = props => {
    let {
        PROFILE_IMG: profile_img,
        TITLE: title,
        CONTENT: content } = props.data;

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
                <button type='button' className='btn btn-outline-primary' onClick={props.editor}>Editor</button>
            </div>
        </div>
    )
}

const EditorView = props => {
    let {
        PROFILE_IMG: profile_img,
        TITLE: title,
        CONTENT: content } = props.data;

    return (
        <div className='home__container-content'>
            <form onSubmit={props.submit} onReset={props.cancel}>
                <h1>Content Editor</h1>

                {/* Profile image path */}
                <div className='mb-3'>
                    <label form='profile_img' className='form-label'>Profile Image</label>
                    <input type='text' id='profile_img' className='form-control' defaultValue={profile_img}/>
                </div>

                {/* Title */}
                <div className='mb-3'>
                    <label form='title' className='form-label'>Title</label>
                    <input type='text' id='title' className='form-control' defaultValue={title}/>
                </div>

                {/* About Me */}
                <div className='mb-3'>
                    <label form='content' className='form-label'>Content</label>
                    <textarea className='form-control' id='content' defaultValue={content} />
                </div>

                {/* Upload content to sql database */}
                <div className='button-group'>
                    <button type='submit' className='btn btn-outline-primary active'>Submit</button>
                    <button type='button' className='btn btn-outline-primary' onClick={props.render}>Render</button>
                    <button type='reset' className='btn btn-outline-primary'>Cancel</button>
                    <button type='button' className='btn btn-outline-primary' onClick={props.editor}>Editor</button>
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
            data: {PROFILE_IMG: 'portfolio.jpg'},  // Default image
            original: {}
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRender = this.handleRender.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.toggleEditor = this.toggleEditor.bind(this);
    }

    componentDidMount() {
        this.callBackendApi()
            .then(res => {
                if (!res.message) {
                    this.setState({hasError: true});  // Basic error handling
                } else {
                    this.setState({
                        data: res.message,
                        original: res.message
                    });
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

    // Set profile image to default img
    componentDidCatch(error, errorInfo) {
        if (error.code === 'MODULE_NOT_FOUND') {
            this.setState({data: {PROFILE_IMG: 'portfolio.jpg'}})
        }
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    // Form submission
    async handleSubmit(event) {
        const values = [];
        const cols = [];

        // Get values
        ['title', 'content', 'profile_img'].forEach(element => {
            let newValue = event.target.querySelector(`#${element}`).value;
            let currentValue = this.state.data[element.toUpperCase()];

            // Only push values that changed
            if (currentValue !== newValue) {
                values.push(newValue);
                cols.push(element.toUpperCase());
            }
        });

        // Only submit request if values change
        if (values[0]) {
            await fetch('/api', {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    table: 'homepage',
                    id: 0,
                    values: values,
                    cols: cols
                })
            });
        } else return;

        event.preventDefault();
    }

    handleRender(event) {
        const render = {};
        ['TITLE', 'CONTENT', 'PROFILE_IMG'].forEach(element => {
            render[`${element}`] = document.body.querySelector(`#${element.toLowerCase()}`).value;
        });

        this.setState({data: render});
        event.preventDefault();
    }

    handleCancel() {
        this.setState({data: this.state.original});
    }

    toggleEditor() {
        this.setState({editorActive: !this.state.editorActive})
    };

    render() {
        let { CONTENT: content } = this.state.data;

        if (this.state.editorActive) {
            return (
                <EditorView
                    hasError = {this.state.hasError}
                    data = {this.state.data}
                    submit = {this.handleSubmit}
                    render = {this.handleRender}
                    cancel = {this.handleCancel}
                    editor = {this.toggleEditor}
                />
            )
        }

        return (
            <RenderView
                data = {this.state.data}
                editor = {this.toggleEditor}
            />
        );
    }
}

export default HomePage;