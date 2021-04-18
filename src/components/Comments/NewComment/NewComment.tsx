import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { addComment } from '../../../slices/postSlice';
import { RootState, useAppDispatch } from '../../../store';
import { BaseButton } from '../../UI/BaseButton/BaseButton'
import TextField from '../../UI/TextField/TextField'

interface INewComment{
    postId: number
}

const NewComment : React.FC<INewComment> = (props) => {
    const {postId} = props;
    const [userName, setUserName] = useState("");
    const [commentText, setCommentText] = useState("");

    const dispatch = useAppDispatch();

    const submitComment = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        if(commentText && userName)
        {
            dispatch(addComment({"postId": postId, "text": commentText, "username":  userName})).then(
                ()=> setCommentText("")
            )
        }
    }

    return (
        <form onSubmit={submitComment}>
            <TextField value={userName}  onChange={setUserName}/>
            <TextField textarea={true} value={commentText} onChange={setCommentText}/>
            <BaseButton type="submit">Comment</BaseButton>
        </form>
    )
}

export default NewComment
