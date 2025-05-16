const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { verifyToken, isAdmin } = require('../auth/authMiddleware');

const router = express.Router();

// Middleware per tutte le rotte
router.use(verifyToken);

// Ottieni tutti gli utenti (solo admin)
router.get('/', isAdmin, async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Errore durante il recupero degli utenti' });
  }
});

// Ottieni un singolo utente
router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Verifica che l'utente richiedente sia admin o stia accedendo al proprio profilo
    if (req.user.role !== 'admin' && req.user.userId != userId) {
      return res.status(403).json({ message: 'Non autorizzato ad accedere a questo profilo' });
    }
    
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] }
    });
    
    if (!user) {
      return res.status(404).json({ message: 'Utente non trovato' });
    }
    
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Errore durante il recupero dell\'utente' });
  }
});

// Aggiorna un utente
router.put('/:id', [
  body('username').optional().isLength({ min: 3, max: 30 }),
  body('email').optional().isEmail(),
  body('role').optional().isIn(['user', 'admin'])
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const userId = req.params.id;
    
    // Verifica che l'utente richiedente sia admin o stia modificando il proprio profilo
    if (req.user.role !== 'admin' && req.user.userId != userId) {
      return res.status(403).json({ message: 'Non autorizzato a modificare questo profilo' });
    }
    
    // Solo gli admin possono cambiare ruoli
    if (req.body.role && req.user.role !== 'admin') {
      delete req.body.role;
    }
    
    const user = await User.findByPk(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'Utente non trovato' });
    }
    
    await user.update(req.body);
    
    // Escludi la password dalla risposta
    const { password, ...userWithoutPassword } = user.get({ plain: true });
    
    res.json({
      message: 'Utente aggiornato con successo',
      user: userWithoutPassword
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Errore durante l\'aggiornamento dell\'utente' });
  }
});

// Cambia password
router.put('/:id/change-password', [
  body('currentPassword').notEmpty(),
  body('newPassword').isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const userId = req.params.id;
    
    // Verifica che l'utente richiedente stia cambiando la propria password
    if (req.user.userId != userId) {
      return res.status(403).json({ message: 'Non autorizzato a cambiare la password di un altro utente' });
    }
    
    const { currentPassword, newPassword } = req.body;
    
    const user = await User.findByPk(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'Utente non trovato' });
    }
    
    // Verifica la password corrente
    const isPasswordValid = await user.validatePassword(currentPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Password corrente non valida' });
    }
    
    // Aggiorna la password
    await user.update({ password: newPassword });
    
    res.json({
      message: 'Password aggiornata con successo'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Errore durante l\'aggiornamento della password' });
  }
});

// Elimina un utente (solo admin o l'utente stesso)
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Verifica che l'utente richiedente sia admin o stia eliminando il proprio profilo
    if (req.user.role !== 'admin' && req.user.userId != userId) {
      return res.status(403).json({ message: 'Non autorizzato a eliminare questo profilo' });
    }
    
    const user = await User.findByPk(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'Utente non trovato' });
    }
    
    await user.destroy();
    
    res.json({ message: 'Utente eliminato con successo' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Errore durante l\'eliminazione dell\'utente' });
  }
});

module.exports = router; 