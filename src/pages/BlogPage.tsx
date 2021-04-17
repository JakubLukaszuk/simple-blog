import React from "react";
import { useSelector } from "react-redux";
import PostContent from "../components/PostList/PostItem/PostContent/PostContent";
import PostList from "../components/PostList/PostList";
import { addPost } from "../slices/postSlice";
import { RootState } from "../store";

const BlogPage = () => {
  const { isLoggedIn, isLoggingIn } = useSelector(
    (state: RootState) => state.user
  );
  return (
    <div>
      <PostList />
      {isLoggingIn ? (
        "Loading..."
      ) : isLoggedIn && !isLoggingIn ? (
        <PostContent addingNewPost={isLoggedIn} sentPost={addPost} />
      ) : null}
    </div>
  );
};

export default BlogPage;
