import React, { useState } from "react";
import { useSelector } from "react-redux";
import { deletePost, IEnchencedPost, updatePost } from "../../../slices/postSlice";
import { RootState } from "../../../store";
import HandlePost from "../../NewPost/HandlePost";
import { BaseButton } from "../../UI/BaseButton/BaseButton";
import PostContent from "./PostContent/PostContent";

interface IPostItem{
  post: IEnchencedPost;
}

const PostItem: React.FC<IPostItem> = (props) => {
  const { id, isLoading, text, title, error } = props.post;
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [isEditPost, setIsEditPost] = useState(false);

  const { isLoggedIn } = useSelector(
    (state: RootState) => state.user
  );

  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible);
  };

  const toggleIsEditPost = () => {
    setIsEditPost(!isEditPost);
  }

  return (
    <li>
      {isLoading ? (
        "Loading..."
      ) : (
        <React.Fragment>
          {error? <span>{error.error}</span> : null}
          <h2>{title}</h2>
          {isContentVisible? <PostContent isComments={!isEditPost} postId = {id} text={text} />: null}
          {isEditPost ?  null : <BaseButton onClick={toggleContentVisibility}>{isContentVisible? 'Hide':'Show'}</BaseButton>}
          {isLoggedIn && !isEditPost ? <BaseButton onClick={toggleIsEditPost}>Edit Post</BaseButton> : null }
          {isLoggedIn && isEditPost ? <HandlePost unmount={toggleIsEditPost} isEditPost={true} deletePost={deletePost} postId={id} updatePost={updatePost} text={text} title={title}/> : null }
        </React.Fragment>
      )}
    </li>
  );
};

export default PostItem;
