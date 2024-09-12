import React, { useContext, useEffect } from 'react';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import Register from './components/Register';
import Login from './components/Login';
import Nav from './components/Nav';
import { AuthContext,AuthProvider } from './src/context/Authcontext';
import { BrowserRouter,Routes,Route, useNavigate } from 'react-router-dom';
import Protected from './Protected';
import './components/style.css'
const AppContent = () => {
  const { token, logout } = useContext(AuthContext);
 
    
  

  return (
    <div className="App">
        
       
          
        <BrowserRouter>
      { token?<Nav/> :null} 
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route element={<Protected/>}>
          <Route path='/form' element={<NoteForm/>}/>
          <Route path='/list' element={<NoteList/>}/>
          
          </Route>
          </Routes>
        </BrowserRouter>
      
    </div>
  );
};

function App() {
   
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
