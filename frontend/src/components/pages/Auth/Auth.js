import React, { useState, useContext } from 'react'
import AuthForm from './AuthForm'
import { UserContext } from '../../../context/UserProvider'
import './auth.css'

export default function Auth() {
    const { signup, login, errMsg, resetAuthError } = useContext(UserContext)

    const initInputs = { username: '', password: ''}

    const [inputs, setInputs] = useState(initInputs)
    const [toggle, setToggle] =useState(false)

    function handleChange(e){
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleSignup(e){
        e.preventDefault()
        signup(inputs)
    }

    function handleLogin(e){
        e.preventDefault()
        login(inputs)
    }

    function toggleForm(){
        setToggle(prev => !prev)
        resetAuthError()
    }

    return (
        <div className='auth-container'>
            <div className='auth'>
                <h1>Rock the Vote!!</h1>
                { !toggle ?
                    <>
                        <AuthForm
                            topText='Register'
                            handleChange={handleChange}
                            handleSubmit={handleSignup}
                            inputs={inputs}
                            btnText='Sign up'
                            errMsg={errMsg}
                        />
                        <p onClick={toggleForm}>Already a member?</p>
                    </>
                    :
                    <>
                        <AuthForm
                            topText='User Login'
                            handleChange={handleChange}
                            handleSubmit={handleLogin}
                            inputs={inputs}
                            btnText='Login'
                            errMsg={errMsg}
                        />
                        <p onClick={toggleForm}>Not a member?</p>
                    </>
                }
            </div>
        </div>
    )
}
