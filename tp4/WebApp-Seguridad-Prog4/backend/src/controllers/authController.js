const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('../config/database');


const MAX_ATTEMPTS_PER_IP = 5;
const WINDOW_MS = process.env.NODE_ENV === 'test' ? 1000 : 15 * 60 * 1000;
const MAX_DELAY_MS = 8000;


const loginAttempts = new Map();   
const failedAttempts = new Map();  


const cleanupInterval = setInterval(() => {
  const now = Date.now();
  for (const [key, data] of loginAttempts.entries()) {
    if (now - data.firstAttempt > WINDOW_MS) loginAttempts.delete(key);
  }
  for (const [key, data] of failedAttempts.entries()) {
    if (now - data.firstAttempt > WINDOW_MS) failedAttempts.delete(key);
  }
}, 1000);
cleanupInterval.unref();


const now = () => Date.now();

const calculateDelayMs = (attemptCount) => {
  if (!attemptCount || attemptCount <= 0) return 0;
  return Math.min(Math.pow(2, attemptCount - 1) * 1000, MAX_DELAY_MS);
};

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

const normalizeIP = (req) => {
  return (req.ip || req.headers['x-forwarded-for'] || req.connection?.remoteAddress || '127.0.0.1').toString();
};


const login = async (req, res) => {
  const { username = '', password = '', captcha } = req.body || {};
  const ip = normalizeIP(req);


  let ipRecord = loginAttempts.get(ip) || { count: 0, firstAttempt: now() };
  const ipElapsed = now() - ipRecord.firstAttempt;

  if (ipElapsed >= WINDOW_MS) {
    ipRecord = { count: 0, firstAttempt: now() };
  }

  ipRecord.count++;
  loginAttempts.set(ip, ipRecord);

  if (ipRecord.count > MAX_ATTEMPTS_PER_IP) {
    return res.status(429).json({ error: 'Too many requests' });
  }


  const key = ip;

  let userRecord = failedAttempts.get(key) || { count: 0, firstAttempt: now() };
  const userElapsed = now() - userRecord.firstAttempt;

  if (userElapsed >= WINDOW_MS) {
    userRecord = { count: 0, firstAttempt: now() };
  }

 
  if (userRecord.count >= 3 && !captcha) {
    return res.status(400).json({ error: 'captcha required' });
  }

  const delayMs = calculateDelayMs(userRecord.count);
  if (delayMs > 0) await sleep(delayMs);

 
  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], async (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Server error' });
    }


    if (!results || results.length === 0) {
      userRecord.count++;
      failedAttempts.set(key, userRecord);


      if (userRecord.count >= 3 && !captcha) {
        return res.status(400).json({ error: 'captcha required' });
      }

      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = results[0];
    const isValid = await bcrypt.compare(password || '', user.password || '');


    if (!isValid) {
      userRecord.count++;
      failedAttempts.set(key, userRecord);


      if (userRecord.count >= 3 && !captcha) {
        return res.status(400).json({ error: 'captcha required' });
      }

      return res.status(401).json({ error: 'Invalid credentials' });
    }

    failedAttempts.delete(key);

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || 'supersecret123'
    );

    return res.json({ token, username: user.username });
  });
};

const register = async (req, res) => {
  const { username, password, email } = req.body || {};
  const hashed = await bcrypt.hash(password || '', 10);
  const q = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
  db.query(q, [username, hashed, email], (err) => {
    if (err) return res.status(500).json({ error: 'Server error' });
    res.json({ message: 'Registered' });
  });
};

const verifyToken = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecret123');
    req.session = req.session || {};
    req.session.userId = decoded.id;
    res.json({ valid: true, user: decoded });
  } catch (e) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

const checkUsername = (req, res) => {
  const { username } = req.body || {};
  const q = 'SELECT COUNT(*) as count FROM users WHERE username = ?';
  db.query(q, [username], (err, results) => {
    if (err) return res.status(500).json({ error: 'Server error' });
    const exists = results && results[0] && results[0].count > 0;
    res.json({ exists });
  });
};

module.exports = {
  login,
  register,
  verifyToken,
  checkUsername
};
