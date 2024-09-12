const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const app = express();
const port = process.env.PORT || 5001;
const SECRET_KEY = 'jhgjhgh'; 

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/notes', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Note Schema
const noteSchema = new mongoose.Schema({
  content: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Associate note with a user
});

const Note = mongoose.model('Note', noteSchema);

// Middleware for Authentication


function authenticateToken(req, res, next) {
  // console.log("BEFORE TOKEN", req.headers)
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split("Bearer")[1];
 // console.log("MIDDLE TOKEN",token)

  if (token == null) return res.sendStatus(401); 
  // console.log("AFTER TOKEN")

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403); 
    req.user = user;
    next();
  });
}


app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const isExistUser = await User.findOne({ username });
  if (isExistUser) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const user = new User({ username, password: hashedPassword });
  await user.save();
  res.json({ message: 'User registered' });
});


app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});


app.get('/note', authenticateToken, async (req, res) => {
  const notes = await Note.find({ user: req.user._id }); 
  res.json(notes);
});

app.post('/note', authenticateToken, async (req, res) => {
  console.log(req.headers); 
  const newNote = new Note({
    content: req.body.content,
    user: req.user._id
  });
  await newNote.save();
  res.json(newNote);
});


app.delete('/notes/:id', authenticateToken, async (req, res) => {
  const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user._id }); 
  if (note) {
    res.json({ message: 'Note deleted' });
  } else {
    res.status(404).json({ message: 'Note not found or not authorized' });
  }
});

app.put('/notes/:id', authenticateToken, async (req, res) => {
  const { content } = req.body;
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id }, 
      { content },
      { new: true } 
    );
    if (note) {
      res.json(note);
    } else {
      res.status(404).json({ message: 'Note not found or not authorized' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update note' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
