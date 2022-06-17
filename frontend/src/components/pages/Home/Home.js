import React, { useContext } from 'react'
import PublicIssue from './PublicIssue'
import { UserContext } from '../../../context/UserProvider'

export default function Home() {
    const { publicIssues } = useContext(UserContext)
return (
    <div>Home
        {publicIssues.map(issue => <PublicIssue {...issue} key={issue._id} />)}
    </div>
)
}
