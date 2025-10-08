import express, { Router } from 'express';
import validate from '../../middlewares/validate.js';
import { foodValidation } from '../../validations/index.js';
import { foodcontroller } from '../../controllers/index.js';
import { auth } from '../../middlewares/auth.js';

const router: Router = express.Router();

router.post(
  '/details',
  auth,
  validate(foodValidation.createDetailNutritions),
  foodcontroller.createDetailNutritions
);

export default router;


/**
 * @swagger
 * tags:
 *   name: Food Nutritions
 *   description: Food Nutritions APIs
 */

/**
 * @swagger
 * /food/details:
 *   post:
 *     summary: Get food with detailed nutrition info (cached or AI generated)
 *     tags: [Food]
 *     security:
 *       - accessCookie: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - portion
 *             properties:
 *               name:
 *                 type: string
 *                 example: nasi goreng
 *                 description: Nama makanan (harus ada di tabel foods)
 *               portion:
 *                 type: string
 *                 example: "1 piring"
 *                 description: Porsi makanan
 *               ingridients:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["nasi putih", "telur", "kecap", "ayam"]
 *                 description: Daftar bahan makanan (opsional)
 *     responses:
 *       200:
 *         description: Get food with details successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Get food with details successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: uuid-food-id
 *                     name:
 *                       type: string
 *                       example: nasi goreng
 *                     calories:
 *                       type: number
 *                       example: 350
 *                     carbs:
 *                       type: number
 *                       example: 45
 *                     fat:
 *                       type: number
 *                       example: 12
 *                     protein:
 *                       type: number
 *                       example: 9
 *                     details:
 *                       type: object
 *                       example:
 *                         vitaminA: "10%"
 *                         vitaminC: "8%"
 *                         fiber: "2g"
 *                         sodium: "500mg"
 *                         cholesterol: "50mg"
 *       400:
 *         description: name food is required
 *       404:
 *         description: Food is not found
 */
