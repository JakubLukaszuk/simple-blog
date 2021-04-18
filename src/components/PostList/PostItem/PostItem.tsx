import React, { useState } from "react";
import { IEnchencedPost } from "../../../slices/postSlice";
import { BaseButton } from "../../UI/BaseButton/BaseButton";
import PostContent from "./PostContent/PostContent";

interface IPostItem{
  post: IEnchencedPost;
}

const PostItem: React.FC<IPostItem> = (props) => {
  const { id, isLoading, text, title } = props.post;
  const [isContentVisible, setIsContentVisible] = useState(false);

  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible);
  };

  return (
    <li>
      {isLoading ? (
        "Loading..."
      ) : (
        <React.Fragment>
          <h2>{title}</h2>
          {isContentVisible? <PostContent text={text} />: null}
          <BaseButton onClick={toggleContentVisibility}>Show</BaseButton>
        </React.Fragment>
      )}
    </li>
  );
};

export default PostItem;
