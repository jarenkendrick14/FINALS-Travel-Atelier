const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-that-is-long-and-secure';

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.options('*', cors()); // Handle preflight requests
app.use(bodyParser.json());

// --- Mock Databases (Server Memory) ---
const users = [
  { id: 1, email: 'admin@example.com', password: 'admin123', firstName: 'Admin', lastName: 'User', role: 'admin' },
  { id: 2, email: 'user@example.com', password: 'password', firstName: 'John', lastName: 'Doe', role: 'user' },
];
let bookings = [];
let messages = [
  { id: 201, name: "Alice Johnson", email: "alice.j@example.com", message: "Initial test message.", dateSent: "2023-10-28T10:30:00Z" }
];

// --- JWT Authentication Middleware ---
const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];
    jwt.verify(bearerToken, JWT_SECRET, (err, authData) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }
      req.user = authData;
      next();
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
};

const verifyAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.sendStatus(403); // Forbidden
  }
};


// --- API Endpoints ---

// POST /api/login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (user && user.password === password) {
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, message: 'Invalid email or password.' });
  }
});

// POST /api/register
app.post('/api/register', (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }
  if (users.some(user => user.email === email)) {
    return res.status(409).json({ success: false, message: 'An account with this email already exists.' });
  }
  const newUser = { id: Date.now(), firstName, lastName, email, password, role: 'user' };
  users.push(newUser);
  console.log('New user registered:', newUser);
  const token = jwt.sign({ id: newUser.id, email: newUser.email, role: newUser.role }, JWT_SECRET, { expiresIn: '1h' });
  res.status(201).json({ success: true, token });
});

// POST /api/bookings (Protected)
app.post('/api/bookings', verifyToken, (req, res) => {
  const userId = req.user.id;
  const newBooking = { bookingId: `BK-${Date.now()}`, userId, ...req.body, bookingDate: new Date().toISOString() };
  bookings.push(newBooking);
  console.log('New booking made:', newBooking);
  res.status(201).json({ success: true, message: 'Booking confirmed!', booking: newBooking });
});

// GET /api/messages (Admin only)
app.get('/api/messages', verifyToken, verifyAdmin, (req, res) => {
  const sortedMessages = messages.sort((a, b) => new Date(b.dateSent) - new Date(a.dateSent));
  res.json(sortedMessages);
});

// GET /api/customers (Admin only)
app.get('/api/customers', verifyToken, verifyAdmin, (req, res) => {
  const safeUsers = users.map(({ password, ...user }) => user);
  res.json(safeUsers);
});

// POST /api/contact-messages
app.post('/api/contact-messages', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }
  const newMessage = { id: Date.now(), name, email, message, dateSent: new Date().toISOString() };
  messages.push(newMessage);
  console.log('New contact message received:', newMessage);
  res.status(201).json({ success: true, message: 'Your message has been sent successfully!' });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});