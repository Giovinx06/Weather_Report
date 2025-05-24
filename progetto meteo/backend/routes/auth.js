const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret_key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

// Validazione input
const loginValidation = [
  body('username').notEmpty().withMessage('Username richiesto'),
  body('password').notEmpty().withMessage('Password richiesta')
];

const registerValidation = [
  body('username').isLength({ min: 3, max: 30 }).withMessage('Username deve essere tra 3 e 30 caratteri'),
  body('email').isEmail().withMessage('Email non valida'),
  body('password').isLength({ min: 6 }).withMessage('Password deve essere almeno 6 caratteri')
];

// Registrazione utente
router.post('/register', registerValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, email, password } = req.body;
    
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email già registrata' });
    }

    const user = await User.create({
      username,
      email,
      password
    });

    // Escludi la password dalla risposta
    const { password: _, ...userWithoutPassword } = user.get({ plain: true });
    
    res.status(201).json({
      message: 'Utente registrato con successo',
      user: userWithoutPassword
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Errore durante la registrazione' });
  }
});

// Login utente
router.post('/login', loginValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, password } = req.body;
    
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: 'Credenziali non valide' });
    }

    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenziali non valide' });
    }

    // Crea token JWT
    const token = jwt.sign(
      { 
        userId: user.id, 
        username: user.username,
        role: user.role
      }, 
      JWT_SECRET, 
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({
      message: 'Login effettuato con successo',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Errore durante il login' });
  }
});

module.exports = router; 