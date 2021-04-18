import React, { useState } from "react";
import { useSelector } from "react-redux";
import Comments from "../../../Comments/Comments";

interface IPostContent {
  text?: string;
  postId: number
  isComments: boolean
}

const PostContent: React.FC<IPostContent> = (props) => {
  const { text,postId,isComments} = props;

  return (
    <section>
        <article>
          {text}
        </article>
        {isComments? <Comments postId={postId}/>: null}
    </section>
  );
};

export default PostContent;
