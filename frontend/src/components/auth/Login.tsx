import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CognitoUser } from '@aws-amplify/auth';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';
import { config } from '../../services/config';
import type { LoginProps } from '../../interfaces';

const Login = ({ authService }: LoginProps) => {
  const { auth, setAuth } = useContext(AuthContext);

  const [userName, setUserName] = useState(config.TEST_USER_NAME);
  const [password, setPassword] = useState(config.TEST_USER_PASSWORD);
  const [loginStatusMessage, setLoginStatusMessage] = useState('');
  const [user, setUser] = useState<CognitoUser | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isInit && auth?.token) {
      navigate('/token');
    }
  }, [auth.token]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = await authService.login(userName, password);

    if (!user) {
      return setLoginStatusMessage('Login failed. Please check your credentials');
    }

    const jwtToken = user.getSignInUserSession()?.getAccessToken().getJwtToken();
    setUser(user);
    setAuth({ isInit: true, user: user.getUsername, token: jwtToken });
    console.log({ isInit: true, user: user.getUsername, token: jwtToken });
    navigate('/verify-code');
  };

  return (
    <section className="full-container">
      <h2>Please login</h2>
      <form onSubmit={handleSubmit}>
        <label>User name</label>
        <input value={userName} onChange={(e) => setUserName(e.target.value)} />
        <label>Password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
        <input type="submit" value="Login" />
      </form>
      <label className="error">{loginStatusMessage}</label>
      <div>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
    </section>
  );
};

export default Login;
