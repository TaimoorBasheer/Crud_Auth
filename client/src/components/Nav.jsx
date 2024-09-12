import React, { useContext } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { AuthContext } from '../src/context/Authcontext';

const Nav = () => {
    const {  logout } = useContext(AuthContext);
    const navigate = useNavigate()
    function logOut(){
      logout();
      navigate('/')

    }
  return (
    <div className='nav'>
        
        <ul>
            <li><Link to='/' className='link'>SignIn</Link></li>
            <li><Link to='/list' className='link'>Tasks</Link></li>
            <li><Link to='/form' className='link'>Add Task</Link></li>
            <li><Link to='/register' className='link'>Register</Link></li>
        </ul>
        <button onClick={logOut}>Logout</button>
    </div>
  )
}

export default Nav