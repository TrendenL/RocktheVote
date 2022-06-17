import React, {useState} from 'react'

import './issue.css'

export default function IssueForm(props) {
    const initInputs = {
        title: '',
        content: ''
    }

    const [inputs, setInputs] = useState(initInputs)

    function handleChange(e){
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleSubmit(e){
        e.preventDefault()
        props.addIssue(inputs)
        setInputs(initInputs)
    }

    const { title, content } = inputs
    return (
        <div className='form-container'>
            <div className='issue-post'>
                <div className='issue-head'>
                    <h1>New Issue</h1>
                </div>
                <form className='issue-form' onSubmit={handleSubmit}>
                    <h3>Title:</h3>
                    <p>Be as specific as possible.</p>
                    <input type='text' name='title' value={title} onChange={handleChange} placeholder='Title'/>

                    <h3>Body:</h3>
                    <p>Include as much information as possible.</p>
                    <textarea type='text' name='content' value={content} onChange={handleChange} placeholder="What's your issues?"/>
                    <button>SUBMIT</button>
                </form>
            </div>
        </div>
    
    )
}
