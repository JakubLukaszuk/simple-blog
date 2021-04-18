import React from "react";
import Comments from "../../../Comments/Comments";
import './PostContent.css'

interface IPostContent {
  text?: string;
  postId: number
  isComments: boolean
}

const PostContent: React.FC<IPostContent> = (props) => {
  const { text,postId,isComments} = props;

  return (
    <section className="PostContent">
        <article>
          {text}
        </article>
        {isComments? <Comments postId={postId}/>: null}
    </section>
  );
};

export default PostContent;
