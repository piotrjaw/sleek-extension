import React, { memo, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import Dashboard from '../Dashboard';
import SignInUp from '../SignInUp';

const Wrapper = () => {
  const { user } = useContext(UserContext);

  return user ? <Dashboard /> : <SignInUp />;
};

export default memo(Wrapper);
