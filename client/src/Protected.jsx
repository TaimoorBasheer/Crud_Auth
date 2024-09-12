import React from 'react'
import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthContext } from './src/context/Authcontext';

const Protected = () => {
    const { token, logout } = useContext(AuthContext);
  return (
    <div>{
        token? <Outlet/> : "please Login first"
    }</div>
  )
}

export default Protected