import React from 'react';
import './App.css';
import { configureFakeBackend } from './helpers/fakeBackend';
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
