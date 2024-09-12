import React, { useState, useContext } from 'react';
import { AuthContext } from '../src/context/Authcontext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const { token, logout } = useContext(AuthContext);
  
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
    setUsername('');
    setPassword('');
    if(login){
   return navigate('/list')
    }
  };

  return (
    <div className="register-container">
    <form className="register-form" onSubmit={handleSubmit}>
      <h2 className="register-title">Login</h2>
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
      <button type="submit" className="register-button">Login</button>
    </form>
  </div>
  );
};

export default Login;
