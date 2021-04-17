import React, { useEffect } from 'react';
import logo from './logo.svg';
import {userService} from './services/userService';
import './App.css';
import { configureFakeBackend } from './helpers/fakeBackend';
import { postService } from './services/postService';
import MainLayout from './components/layouts/MainLayout';
import BlogPage from './pages/BlogPage';
import Header from './components/Header/Header';

const App = () => {
  configureFakeBackend();
  return (
    <MainLayout>
      <Header/>
      <BlogPage/>
    </MainLayout>
  );
}

export default App;
