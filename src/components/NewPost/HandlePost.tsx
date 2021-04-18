import React, { useState } from "react";
import {
  IAddPost,
  IDeletePost,
  IUpdatePost,
} from "../../services/postService";
import { useAppDispatch } from "../../store";
import { BaseButton } from "../UI/BaseButton/BaseButton";
import TextField from "../UI/TextField/TextField";
import './HandlePost.css';

interface HandlePost {
  sendPost?: (args: IAddPost) => any;
  updatePost?: (args: IUpdatePost) => any;
  deletePost?: (args: IDeletePost) => any;
  unmount: () => void;
  text?: string;
  title?: string;
  postId?: number;
  isEditPost: boolean;
}

const NewPost: React.FC<HandlePost> = (props) => {
  const {
    sendPost,
    unmount,
    isEditPost,
    text = "",
    title = "",
    deletePost,
    updatePost,
    postId,
  } = props;
  const [postTitle, setPostTitle] = useState(text);
  const [postText, setPostText] = useState(title);

  const dispatch = useAppDispatch();

  const subbmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isEditPost && sendPost) {
      dispatch(
        sendPost({
          title: postTitle,
          text: postText
        })
      ).then(() => unmount());
      return;
    }
    if(isEditPost && postId && updatePost)
    {
      dispatch(
        updatePost({
          id: postId,
          title: postTitle,
          text: postText
        })
      ).then(() => unmount());
      return;
    }
  };

  const close = () => {
    unmount();
  };

  return (
    <section className="HandlePost">
      <h3>{isEditPost? "Edit Post": "AddPost"}</h3>
      <form className="HandlePost HandlePost__Form" onSubmit={subbmitForm}>
        <TextField placeholder="title" value={postTitle} onChange={setPostTitle} />
        <TextField placeholder="post text" value={postText} onChange={setPostText} textarea={true} />
        <div>
          <BaseButton type="submit">
            {isEditPost ? "Update" : "Post"}
          </BaseButton>
          {isEditPost && deletePost && postId ? (
            <BaseButton
              onClick={() => dispatch(deletePost({ postId: postId }))}>
                Delete Post
            </BaseButton>
          ) : null}
          <BaseButton onClick={close}>Cancel</BaseButton>
        </div>
      </form>
    </section>
  );
};

export default NewPost;
