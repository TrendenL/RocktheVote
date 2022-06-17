import React, {useContext} from 'react'
import IssueForm from './FormIssue'
import { UserContext } from '../../../context/UserProvider'

export default function NewIssue() {
    const { addIssue } = useContext(UserContext)
  return (
    <>
        <IssueForm addIssue={addIssue} />
    </>
  )
}
