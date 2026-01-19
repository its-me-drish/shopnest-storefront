import { Router } from 'express';
import Product from '../models/Product.js';
import { requireAuth } from '../middleware/auth.js';
import { validate, productSchema } from '../validation.js';

const router = Router();
router.use(requireAuth);

router.get('/', async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Math.min(Number(req.query.limit) || 20, 100);
  const filter = { owner: req.user.sub };
  if (req.query.q) filter.$text = { $search: String(req.query.q) };
  const [items, total] = await Promise.all([
    Product.find(filter).sort('-createdAt').skip((page - 1) * limit).limit(limit),
    Product.countDocuments(filter),
  ]);
  res.json({ items, total, page, pages: Math.ceil(total / limit) });
});

router.post('/', validate(productSchema), async (req, res) => {
  const item = await Product.create({ ...req.body, owner: req.user.sub });
  res.status(201).json(item);
});

router.patch('/:id', async (req, res) => {
  const item = await Product.findOneAndUpdate({ _id: req.params.id, owner: req.user.sub }, req.body, { new: true });
  if (!item) return res.status(404).json({ error: 'not found' });
  res.json(item);
});

router.delete('/:id', async (req, res) => {
  await Product.deleteOne({ _id: req.params.id, owner: req.user.sub });
  res.status(204).end();
});

export default router;
