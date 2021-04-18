import React, { useState } from "react";
import { useSelector } from "react-redux";
import HandlePost from "../components/NewPost/HandlePost";
import PostList from "../components/PostList/PostList";
import { BaseButton } from "../components/UI/BaseButton/BaseButton";
import { addPost } from "../slices/postSlice";
import { RootState } from "../store";
import './BlogPage.css'

const BlogPage = () => {
  const [isAddPost, setIsAddPost] = useState(false);
  const { isLoggedIn, isLoggingIn, error } = useSelector(
    (state: RootState) => state.user
  );

  const toggleIsAddPost= () =>{
      setIsAddPost(!isAddPost);
  }

  return (
    <div className="BlogPage">
      {error? <span>{error.error}</span> : null}
      {isLoggedIn && !isLoggingIn?
          <section className="BlogPage BlogPage__PostsHandleContainer">
            {!isAddPost ? <BaseButton onClick={toggleIsAddPost}>Add new Post</BaseButton>: null}
            {isAddPost? <HandlePost sendPost={addPost} unmount={toggleIsAddPost} isEditPost={false}/>: null}
          </section>
        : null
      }
      {!isAddPost ? <PostList />: null}
    </div>
  );
};

export default BlogPage;
