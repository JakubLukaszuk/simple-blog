import React, { useState } from "react";
import { IAddPost, IGetPostsInRange, IUpdatePost } from "../../services/postService";
import { useAppDispatch } from "../../store";
import { BaseButton } from "../UI/BaseButton/BaseButton";
import TextField from "../UI/TextField/TextField";

interface INewPost {
  sendPost?: (args: IAddPost) => any
  updatePost?: (args: IUpdatePost) => any
  unmount: () => void;
  text?: string,
  title?: string,
  isUpdatePost: boolean
}


const NewPost: React.FC<INewPost> = (props) => {
  const { sendPost, unmount, isUpdatePost, text="", title="" } = props;
  const [postTitle, setPostTitle] = useState(text);
  const [postText, setPostText] = useState(title);

  const dispatch = useAppDispatch();

  const subbmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isUpdatePost && sendPost)
    {
      dispatch(
        sendPost({
          title: postTitle,
          text: postText,
        })
      ).then(
        ()=> unmount()
      )
    }
  };

  const close = () =>{
    unmount();
  }

  return (
    <section>
      <form onSubmit={subbmitForm}>
        <TextField value={postTitle} onChange={setPostTitle} />
        <TextField value={postText} onChange={setPostText} textarea={true} />
        <BaseButton type="submit">Post</BaseButton>
        <BaseButton onClick={close}>Cancel</BaseButton>
      </form>
    </section>
  );
};

export default NewPost;
