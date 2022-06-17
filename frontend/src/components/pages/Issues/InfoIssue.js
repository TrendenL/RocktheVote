import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../../../context/UserProvider'
import FormComment from '../../Comments/FormComment'
import ListComments from '../../Comments/ListComments'

import './issue.css'

export default function InfoIssue() {
    const { issueId } = useParams()
    const { issues, getAllComments, comments } = useContext(UserContext)

    const thisIssue = issues.find(issue => issue._id === issueId)
    // console.log(thisIssue)
    console.log(comments)

    useEffect(() => {
      getAllComments(thisIssue._id)
    },[] )

    const mappedComments = comments.map(comment => <ListComments {...comment} key={comment._id} />)
    
  return (
    <div className='info-section'>InfoIssue
      <div className='post-section'>
            <h1>{thisIssue.title}</h1>
            <p>{thisIssue.content}</p>
      </div>
      
      <div className='comment-section'>
            <FormComment {...thisIssue} id={thisIssue._id}/>
            {mappedComments}
      </div>
    </div>
  )
}
