import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Header } from './components';
import MainPage from '@/pageContainer/MainPage';

function App() {
  const location = useLocation();
  const isSignIn = location.pathname === '/signin';
  return (
    <>
      <Header EndPoint={isSignIn} />
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </>
  );
}

export default App;
