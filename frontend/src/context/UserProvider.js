import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const UserContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function UserProvider(props) {
    const initState = { 
        user: JSON.parse(localStorage.getItem('user')) || {}, 
        token: localStorage.getItem('token') || '', 
        issues: [],
        error: ''
    }

    const [ userState, setUserState ] = useState(initState)

    const [ publicState, setPublicState ] = useState({publicIssues: [], users: ''})

    const [ comments, setCommments ] = useState([])


// AUTHENTICATION
    function signup(credentials){
        axios.post('/auth/signup', credentials)
        .then(res => {
            const { user, token } = res.data
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            setUserState(prevUserState => ({
                ...prevUserState,
                user,
                token
            }))
        })
        .catch(err => handleAuthError(err.response.data.errMsg))
    }

    function login(credentials){
        axios.post('/auth/login', credentials)
        .then(res => {
            const { user, token } = res.data
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            getUserIssues()
            setUserState(prevUserState => ({
                ...prevUserState,
                user,
                token
            }))
        })
        .catch(err => handleAuthError(err.response.data.errMsg))
    }

    function handleAuthError(errMsg){
        setUserState(prevUserState => ({
            ...prevUserState,
            errMsg
        }))
    }

    function resetAuthError(errMsg){
        setUserState(prevUserState => ({
            ...prevUserState,
            errMsg: ''
        }))
    }

    function logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUserState({
            user: {},
            token: '',
            issues: []
        })
    }

 // ISSUES
    function getAllIssues(){
        userAxios.get('/api/issues')
        .then(res => {
            setPublicState(prevPublicState => ({
                ...prevPublicState,
                publicIssues: res.data
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    function getUserIssues(){
        userAxios.get('/api/issues/user')
        .then(res => {
            setUserState(prevUserState => ({
                ...prevUserState,
                issues: res.data
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    

    function addIssue(newIssue){
        userAxios.post('/api/issues', newIssue)
        .then(res => {
            setUserState(prevUserState => ({
                ...prevUserState,
                issues: [...prevUserState.issues, res.data]
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }


// COMMENTS
    function getAllComments(issueId){
        userAxios.get(`/api/comments/${issueId}`)
        .then( res => {(
            setCommments(res.data)
        )})
        .catch(err => console.log(err))
    }

    function addComment(newComment, issueId){
        userAxios.post(`/api/comments/${issueId}`, newComment)
        .then(res => {
            setCommments(prevComments => 
                [...prevComments, res.data]
            )
        })
        .catch(err => console.log(err))
        // getAllComments()
    }

    useEffect(() => {
        getAllIssues()
        getUserIssues()
        // getAllComments()
    },[])

    return (
        <UserContext.Provider value={{
            ...userState,
            signup,
            login,
            logout,
            addIssue,
            resetAuthError,
            ...publicState,
            addComment,
            getAllComments,
            comments
        }}>
            {props.children}
        </UserContext.Provider>
    )
}
