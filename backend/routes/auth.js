import { Router } from 'express'
import { login, logout, session, signup } from '../controllers/auth.js';
const router = Router()

// sign up
router.get('/api/auth/signup', signup);

// login
router.get('/api/auth/login', login);

// session
router.get('/api/auth/session', session);

// logout
router.get('/api/auth/logout', logout);

export default router;