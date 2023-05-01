import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import type { RegisterProps } from '../../interfaces';

const Register = ({ authService }: RegisterProps) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registrationStatusMessage, setRegistrationStatusMessage] = useState('');

  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setRegistrationStatusMessage('Passwords do not match');
      return;
    }
    const result = await authService.signup({ username, password, email });
    if (result) {
      navigate(`/verify-code?username=${username}`);
    } else {
      setRegistrationStatusMessage('Registration failed. Please check your details');
    }
  };

  return (
    <section className="full-container">
      <h2>Create an account</h2>
      <form onSubmit={handleSubmit}>
        <label>User name</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
        <label>Password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
        <label>Confirm password</label>
        <input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
        />
        <input type="submit" value="Register" />
      </form>
      <label className="error">{registrationStatusMessage}</label>
      <div>
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </section>
  );
};

export default Register;
