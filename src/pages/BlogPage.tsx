import React, { useState } from "react";
import { useSelector } from "react-redux";
import HandlePost from "../components/NewPost/HandlePost";
import PostContent from "../components/PostList/PostItem/PostContent/PostContent";
import PostList from "../components/PostList/PostList";
import { BaseButton } from "../components/UI/BaseButton/BaseButton";
import { addPost, getPostsInRange } from "../slices/postSlice";
import { RootState } from "../store";

const BlogPage = () => {
  const [isAddPost, setIsAddPost] = useState(false);
  const { isLoggedIn, isLoggingIn } = useSelector(
    (state: RootState) => state.user
  );

  const toggleIsAddPost= () =>{
      setIsAddPost(!isAddPost);
  }

  return (
    <div>
      {isLoggedIn && !isLoggingIn?
          <section>
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
