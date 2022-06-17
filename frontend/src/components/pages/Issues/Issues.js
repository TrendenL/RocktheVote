import React, {useContext} from 'react'
import IssueList from './ListIssue'
import { UserContext } from '../../../context/UserProvider'

export default function Issues() {
  const { issues } = useContext(UserContext)
  return (
    <div>
      <IssueList issues={issues}/>
    </div>
  )
}
