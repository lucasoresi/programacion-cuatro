const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const vulnerabilityController = require('../controllers/vulnerabilityController');
const { uploadMiddleware, uploadFile } = require('../controllers/uploadController');

// Agregar cookie-parser (necesario para csurf con cookies)
router.use(cookieParser());

// Middleware de validación de Origin/Referer
const validateOrigin = (req, res, next) => {
  // Solo validar en métodos que modifican estado
  if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
    const allowedOrigins = ['http://localhost:3000', 'http://localhost:5000'];
    const origin = req.get('origin') || req.get('referer');

    if (origin) {
      const isAllowed = allowedOrigins.some(allowed => origin.startsWith(allowed));
      if (!isAllowed) {
        return res.status(403).json({
          error: 'Invalid Origin. CSRF protection activated.'
        });
      }
    }
  }
  next();
};

// Aplicar validación de Origin a todas las rutas
router.use(validateOrigin);

// Configurar protección CSRF con cookies que tienen SameSite
const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    sameSite: 'strict',
    secure: false // true en producción con HTTPS
  }
});

// Endpoint para obtener token CSRF
router.get('/csrf-token', csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Command Injection
router.post('/ping', vulnerabilityController.ping);

// CSRF - Transferencia PROTEGIDA
router.post('/transfer', csrfProtection, vulnerabilityController.transfer);

// Local File Inclusion
router.get('/file', vulnerabilityController.readFile);

// File Upload
router.post('/upload', uploadMiddleware, uploadFile);

// Manejador de errores CSRF (debe estar al final)
router.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    // Token CSRF inválido o ausente
    return res.status(403).json({
      error: 'Invalid CSRF token. CSRF protection activated.'
    });
  }
  next(err);
});

module.exports = router;
