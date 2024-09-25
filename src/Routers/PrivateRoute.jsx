import React, { Suspense, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Auth/index';
import { Loader } from '../components/Loader';
import { PrivateLayout } from '../layout';

const PrivateRoute = ({ Component, ...rest }) => {
  const { loggedIn } = useAuth();
  useEffect(() => {
    const timer = setTimeout(() => {}, 10000);
    return () => clearTimeout(timer);
  }, []);
  return loggedIn ? (
    <PrivateLayout>
      <Suspense fallback={<Loader type="circular" />}>
        <Component {...rest} />
      </Suspense>
    </PrivateLayout>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
