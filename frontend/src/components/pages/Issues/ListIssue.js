import React from 'react'
import Issue from './Issue'
import { Link } from 'react-router-dom'

import './issue.css'

export default function IssueList(props) {
    const { issues } = props
    return (
        <div className='issue-list'>
            { issues.map(issue => <Link to={`/issues/${issue._id}`} key={issue._id}><Issue {...issue} key={issue._id} /></Link>) }
        </div>
    )
}
