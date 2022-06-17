import React from 'react'

export default function AuthForm(props) {
    const { handleChange, handleSubmit, topText, btnText, inputs: {username, password}, errMsg } = props
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>{ topText }</h2>
                <input type='text' value={username} name='username' onChange={handleChange} placeholder='Enter username...' />
                <input type='password' value={password} name='password' autoComplete='on' onChange={handleChange} placeholder='Enter password...' />
                <button>{ btnText }</button>
                <p style={{color: 'red'}}>{ errMsg }</p>
            </form>
        </div>
    )
}
