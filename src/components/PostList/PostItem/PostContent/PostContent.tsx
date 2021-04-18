import React, { useState } from "react";
import { useSelector } from "react-redux";

interface IPostContent {
  text?: string;
}

const PostContent: React.FC<IPostContent> = (props) => {
  const { text, } = props;

  return (
    <section>
        <article>
          {text}
        </article>
    </section>
  );
};

export default PostContent;
