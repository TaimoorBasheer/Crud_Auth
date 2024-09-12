import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../src/context/Authcontext'; 

const NoteItem = ({ note }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(note.content);
  const { token } = useContext(AuthContext); 

  const handleDelete = () => {
    axios.delete(`http://localhost:5001/notes/${note._id}`, {
      headers: { Authorization:`Bearer${token}`}
    })
      .then(() => {
        
        alert('Note deleted successfully');
      })
      .catch(error => {
        console.error('Error deleting note:', error);
        alert('Failed to delete note');
      });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    axios.put(`http://localhost:5001/notes/${note._id}`, { content: editedContent }, {
      headers: { Authorization: `Bearer${token}` } 
    })
      .then(() => {
        setIsEditing(false);
        alert('Note updated successfully');
      })
      .catch(error => {
        console.error('Error updating note:', error);
        alert('Failed to update note');
      });
  };

  const handleChange = (e) => {
    setEditedContent(e.target.value);
  };

  return (
    <div className="note-item">
      {isEditing ? (
        <div className="note-edit">
          <input
            type="text"
            value={editedContent}
            onChange={handleChange}
            className="note-edit-input"
          />
          <button onClick={handleSave} className="note-save-button">Save</button>
          <button onClick={() => setIsEditing(false)} className="note-cancel-button">Cancel</button>
        </div>
      ) : (
        <div className="note-view">
          <p className="note-content">{note.content}</p>
          <div className='edit-del'>
          <button onClick={handleEdit} className="note-edit-button">Edit</button>
          <button onClick={handleDelete} className="note-delete-button">Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteItem;
