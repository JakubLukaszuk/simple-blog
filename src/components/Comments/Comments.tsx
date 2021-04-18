import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  deleteCommentsFromState,
  getCommentsInRange,
} from "../../slices/postSlice";
import { RootState, useAppDispatch } from "../../store";
import Comment from "./Comment/Comment";
import NewComment from "./NewComment/NewComment";

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
    console.log(postId);

    dispatch(
      getCommentsInRange({ startIndex: 0, endIndex: 4, postId: postId })
    );
    return () => {
      deleteCommentsFromState(postId);
    };
  }, []);

  return (
    <section>
      <h3>Comments</h3>
      <NewComment postId={postId} />
      <ul>
      {commentsError? <span>{commentsError.error}</span> : null}
        {areCommetsLoading
          ? "Loading"
          : comments[postId]?.map((postComment, index) => (
              <li key={index}>
                <Comment
                  text={postComment.text}
                  username={postComment.username}
                />
              </li>
            ))}
      </ul>
    </section>
  );
};

export default Comments;
