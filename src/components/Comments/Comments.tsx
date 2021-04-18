import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  deleteCommentsFromState,
  getCommentsInRange,
} from "../../slices/postSlice";
import { RootState, useAppDispatch } from "../../store";
import { BaseButton } from "../UI/BaseButton/BaseButton";
import Comment from "./Comment/Comment";
import NewComment from "./NewComment/NewComment";
import './Comments.css'

interface IComments {
  postId: number;
}

const Comments: React.FC<IComments> = (props) => {
  const { postId } = props;
  const { comments, areCommetsLoading, commentsError } = useSelector(
    (state: RootState) => state.post
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      getCommentsInRange({ startIndex: 0, endIndex: 4, postId: postId })
    );
    return () => {
      deleteCommentsFromState(postId);
    };
  }, []);

  const loadMoreComments =()=>{
      debugger
      if(comments[postId]?.length)
      {
        dispatch(getCommentsInRange({ startIndex: comments[postId].length, endIndex: comments[postId].length+4, postId: postId }))
      }
  }

  return (
    <section className="Comments">
      <h3>Comments</h3>
      <NewComment postId={postId} />
      <ul className="Comments Comments__List">
        {commentsError ? <span>{commentsError.error}</span> : null}
        {areCommetsLoading ? (
          "Loading"
        ) : (
          <React.Fragment>
            {comments[postId]?.map((postComment, index) => (
              <li key={index} >
                <Comment
                  text={postComment.text}
                  username={postComment.username}
                />
              </li>
            ))}
            <BaseButton onClick={loadMoreComments}>Load more comments</BaseButton>
          </React.Fragment>
        )}
      </ul>
    </section>
  );
};

export default Comments;
