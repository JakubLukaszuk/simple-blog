import { AnyAction } from "@reduxjs/toolkit";
import { title } from "process";
import React, { useState } from "react";
import { IAddPost } from "../../../../services/postService";
import { useAppDispatch } from "../../../../store";
import { BaseButton } from "../../../UI/BaseButton/BaseButton";

interface IPostContent {
  text?: string;
  title?: string;
  addingNewPost: boolean;
  sentPost?: (args?: any)=>any;
}

const PostContent: React.FC<IPostContent> = (props) => {
  const { text, title, addingNewPost, sentPost } = props;
  const [titleToPost, setTitleToPost] = useState("");
  const [textToPost, setTextToPost] = useState("");

  const dispatch = useAppDispatch();

  return (
    <div>
      {addingNewPost ? <input value={titleToPost}></input> : null}
      <textarea>
        {addingNewPost ? textToPost : text}
      </textarea>
      {addingNewPost ? <BaseButton onClick={addingNewPost && sentPost ? ()=> dispatch(sentPost({title: titleToPost, text: textToPost})) : undefined}>Post</BaseButton> : null}
    </div>
  );
};

export default PostContent;
