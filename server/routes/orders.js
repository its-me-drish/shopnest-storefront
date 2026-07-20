import { Router } from 'express';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { priceCart } from '../services/cart.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
router.use(requireAuth);

router.get('/', async (req, res) => {
  res.json(await Order.find({ owner: req.user.sub }).sort('-createdAt'));
});

router.post('/', async (req, res, next) => {
  try {
    const { lines, totalCents } = await priceCart(req.body.items || []);
    const order = await Order.create({ owner: req.user.sub, lines, totalCents });
    await Promise.all(lines.map((l) => Product.updateOne({ _id: l.product }, { $inc: { stock: -l.qty } })));
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
});

export default router;
