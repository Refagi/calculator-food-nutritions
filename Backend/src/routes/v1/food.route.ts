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
 *               ingredients:
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
 *                     portion:
 *                       type: string
 *                       example: 1 piring
 *                     name:
 *                       type: string
 *                       example: nasi goreng
 *                     ingredients:
 *                       type: array
 *                       example: ["nasi putih", "telur", "kecap", "ayam"]
 *                     details:
 *                       type: object
 *                       example:
 *                         id: "540ef2f1-ab36-47c5-990b-f134d354ccc"
 *                         foodId: 860
 *                         calories: 60
 *                         protein: 0.10
 *                         carbs: 25.5
 *                         fat: 11
 *                         vitaminA: 10
 *                         vitaminC: 8
 *                         vitaminD: 0.5
 *                         vitaminB12: 1.5
 *                         fiber: 2
 *                         sugar: 12
 *                         calcium: 50
 *                         iron: 1.2
 *                         pottasium: 300
 *                         magnesium: 40
 *                         sodium: 500
 *                         cholesterol: 50
 *                         createdAt: "2025-10-21T08:06:52.981Z"
 *                         updatedAt: "2025-10-21T08:06:52.981Z"
 *       400:
 *         description: name food is required
 *       404:
 *         description: Food is not found
 */
