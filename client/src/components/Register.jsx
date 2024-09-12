import React, { useState, useContext } from 'react';
import { AuthContext } from '../src/context/Authcontext';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    register(username, password);
    setUsername('');
    setPassword('');
  };

  return (
    <div className="register-container">
    <form className="register-form" onSubmit={handleSubmit}>
      <h2 className="register-title">Register</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="register-input"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="register-input"
      />
      <button type="submit" className="register-button">Register</button>
    </form>
  </div>
  );
};

export default Register;
