import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1).max(200),
  priceCents: z.number().int().nonnegative(),
  stock: z.number().int().nonnegative().default(0),
});

export const validate = (schema) => (req, res, next) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(422).json({ error: parsed.error.issues });
  req.body = parsed.data;
  next();
};
