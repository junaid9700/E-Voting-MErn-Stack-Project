import React from 'react';
import { ErrorPage } from '@/pages';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Home, Login, SignUp, About } from '@/pages';
export const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/about" element={<About />} />
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
};
export default MainRoutes;
