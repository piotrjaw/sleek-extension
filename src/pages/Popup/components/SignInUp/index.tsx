import React, {
  memo,
  ReactElement,
  useCallback,
  useContext,
  useState,
} from 'react';
import Button from '../Button';
import Input from '../Input';
import useService from '../../hooks/useService';
import UsersService from '../../services/UsersService';
import { UserContext } from '../../contexts/UserContext';

const SignInUp = (): ReactElement => {
  const userContext = useContext(UserContext);
  const [email, setEmail] = useState('');

  const handleSignUp = useCallback(() => {
    if (userContext) {
      userContext.register(email);
    }
  }, [email, userContext]);

  const handleLogIn = useCallback(() => {
    if (userContext) {
      userContext.login(email);
    }
  }, [email, userContext]);

  return (
    <>
      <label>User name</label>
      <Input style={{ marginBottom: '20px' }} onChange={setEmail} />
      <Button
        style={{ marginBottom: '20px' }}
        disabled={!email}
        onClick={handleSignUp}
      >
        Sign up
      </Button>
      <Button disabled={!email} onClick={handleLogIn}>
        Log in
      </Button>
    </>
  );
};

export default memo(SignInUp);
