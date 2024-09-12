import React, { createContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(null);
 

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:5001/login', { username, password });
      const { token } = response.data;
      setToken(token);
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer${token}`;
     
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const register = async (username, password) => {
    try {
      await axios.post('http://localhost:5001/register', { username, password });
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const logout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ token, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
