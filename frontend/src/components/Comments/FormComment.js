import React, {useState, useContext} from 'react'
import { UserContext } from '../../context/UserProvider'

export default function FormComment(props) {
    const initInputs = {
        comment: ''
    }

    const { addComment } = useContext(UserContext)

    // console.log(props)
    
    
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
        addComment(inputs, props._id)
        setInputs(initInputs)
    }

    const { comment } = inputs

return (
    <div>FormComment
        <form onSubmit={handleSubmit}>
            <textarea
                        type='text'
                        name='comment'
                        value={comment}
                        onChange={handleChange}
                        placeholder='comment...'
                    />
            <button>add comment</button>
        </form>
    </div>
    )
}
