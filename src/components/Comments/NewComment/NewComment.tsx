import React, { useState } from 'react'
import { addComment } from '../../../slices/postSlice';
import { useAppDispatch } from '../../../store';
import { BaseButton } from '../../UI/BaseButton/BaseButton'
import TextField from '../../UI/TextField/TextField';
import './NewComment.css'

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
        <form className="NewComment" onSubmit={submitComment}>
            <TextField placeholder="user name" value={userName}  onChange={setUserName}/>
            <TextField placeholder="comment" textarea={true} value={commentText} onChange={setCommentText}/>
            <BaseButton type="submit">Comment</BaseButton>
        </form>
    )
}

export default NewComment
