import express, { Router } from 'express';
import passport from 'passport';
import validate from '../../middlewares/validate.js';
import { authValidation } from '../../validations/index.js';
import { authController } from '../../controllers/index.js';
import { auth } from '../../middlewares/auth.js';

const router: Router = express.Router();

router.post('/register', validate(authValidation.register), authController.register);
router.post('/login', validate(authValidation.login), authController.login);
router.post('/logout', authController.logout);
router.post('/refresh-token', authController.refreshToken);
router.post('/send-verification-email', auth, authController.sendVerificationEmail);
router.get('/verify-email', validate(authValidation.verifyEmail), authController.verifyEmail);
router.get('/protectAuth', authController.protectAuth);

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  authController.googleCallback
);

export default router;

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: budianduk
 *               email:
 *                 type: string
 *                 example: menak3421@gmail.com
 *               password:
 *                 type: string
 *                 example: budianduk#123
 *     responses:
 *       201:
 *         description: registered is successfully
 *       400:
 *         description: Email already taken
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login with email and password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: menak3421@gmail.com
 *               password:
 *                 type: string
 *                 example: budianduk#123
 *     responses:
 *       200:
 *         description: Login is successfully
 *       401:
 *         description: You dont have an account yet, please register!
 *       400:
 *         description: Failed to login!
 */

/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Redirect to Google login
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirect to Google OAuth
 */

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Google OAuth callback
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Google login successful
 *       401:
 *         description: Failed login google
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     security:
 *       - refreshCookie: []
 *     responses:
 *       200:
 *         description: Logout is successfully
 *       404:
 *         description: Token not found, you are logged out!
 */

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Refresh token user
 *     tags: [Auth]
 *     security:
 *       - refreshCookie: []
 *     responses:
 *       200:
 *         description: Refresh Token is successfully
 *       400:
 *         description: Please authenticate!
 */

/**
 * @swagger
 * /auth/send-verification-email:
 *   post:
 *     summary: Send Verification Email token user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Verify email link has been sent to menak3421@gmail.com
 *       401:
 *         description: User not authenticated
 */

/**
 * @swagger
 * /auth/verify-email:
 *   get:
 *     summary: Verification Email user
 *     tags: [Auth]
 *     parameters:
 *       - in: query
 *         name: tokens
 *         schema:
 *           type: string
 *         required: true
 *         description: Verification token from email
 *     responses:
 *       200:
 *         description: Email has been verification!
 *       401:
 *         description: Invalid Token!
 */
