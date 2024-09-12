import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../src/context/Authcontext'; 

const NoteForm = () => {
  const [note, setNote] = useState('');
  const { token } = useContext(AuthContext);

if (!token) {
  console.error('No token found');
  
} 
else{
    console.log('available')}
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post('http://localhost:5001/note', { content: note }, {
        headers: { Authorization: `Bearer${token}` } 
      })
      .then(() => {
        setNote('');
        setError('');
        alert('Note added successfully')
      })
      .catch(error => {
        console.error('Error creating note:', error);
        setError('Failed to add note. Please try again.');
        alert(error)
      });
      
    }
  return (
    <div className="note-form-container">
      <form onSubmit={handleSubmit} className="note-form">
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a new note"
          className="note-input"
        />
        <button type="submit" className="note-submit-button">Add</button>
      </form>
      
    </div>
  );
};

export default NoteForm
