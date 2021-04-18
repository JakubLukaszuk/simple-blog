import { AnyAction } from "@reduxjs/toolkit";
import { title } from "process";
import React, { useState } from "react";
import { IAddPost } from "../../../../services/postService";
import { useAppDispatch } from "../../../../store";
import { BaseButton } from "../../../UI/BaseButton/BaseButton";
import TextField from "../../../UI/TextField/TextField";

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
