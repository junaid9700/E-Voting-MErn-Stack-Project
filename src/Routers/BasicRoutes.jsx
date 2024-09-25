import React, { Suspense, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Auth/index';
import { Loader } from '../components/Loader';
import { PublicLayout } from '../layout';

const BasicRoutes = ({ Component, args }) => {
  const { loggedIn, isAdmin } = useAuth();
  //make artifical delay
  useEffect(() => {
    const timer = setTimeout(() => {}, 1000);
    return () => clearTimeout(timer);
  }, []);
  return loggedIn   ? (
    <Navigate to={isAdmin ? '/admin' : '/e-voting-system'} />
  ) : (
    <PublicLayout>
      <Suspense fallback={<Loader />}>
        <Component {...args} />
      </Suspense>
    </PublicLayout>
  );
};

export default BasicRoutes;
