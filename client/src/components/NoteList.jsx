import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import NoteItem from './NoteItem';
import { AuthContext } from '../src/context/Authcontext';

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const { token } = useContext(AuthContext); // Get the token from AuthContext

  useEffect(() => {
    axios.get('http://localhost:5001/note', {
      headers: { Authorization:`Bearer${token}` } // Include token in request headers
    })
    .then(response => setNotes(response.data))
    .catch(error => console.error('Error fetching notes:', error));
  }, [notes]); // Use token as a dependency to re-fetch if it changes

  return (
    <div>
      {notes.length > 0 ? (
        notes.map(note => (
          <NoteItem key={note._id} note={note} />
        ))
      ) : (
        <p>No notes found.</p>
      )}
    </div>
  );
};

export default NoteList;
