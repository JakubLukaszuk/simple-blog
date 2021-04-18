import React from 'react'

interface IComment{
    username: string
    text: string
}

const Comment:React.FC<IComment> = (props) => {
    const {username, text} = props;
    return (
        <div>
            <strong>{username}</strong>
            <span>{text}</span>
        </div>
    )
}

export default Comment
