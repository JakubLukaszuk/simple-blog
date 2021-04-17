import React, { useEffect } from 'react';
import logo from './logo.svg';
import {userService} from './services/userService';
import './App.css';
import { configureFakeBackend } from './helpers/fakeBackend';
import { postService } from './services/postService';

const App = () => {
  configureFakeBackend();
  useEffect(() => {
    async function testService() {
      const user= await userService.login('user', '123');
      console.log(user);
      const addedPost = await postService.addPost('test1');
      const addedPost2 = await postService.addPost('test2');
      const addedPost3 = await postService.addPost('test3');
      console.log(addedPost);
      const comment = await postService.addComment({text: "comment", username: "user2", postId: addedPost.id});
      const comments = await postService.getCommentsInRange(0, 4, addedPost.id);
      console.log(comments);
      addedPost.text="xxxxxxx";
      const modifedPost = await postService.modifyPost(addedPost);
      console.log(modifedPost);
      const posts = await postService.getPostsInRange(0,4);
      console.log(posts);
      postService.deletePost(addedPost.id);
      postService.deletePost(addedPost2.id);
      postService.deletePost(addedPost3.id);
    }

  }, [])
  return (
    <div>App</div>
  );
}

export default App;
