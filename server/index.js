import express from 'express';
import cors from 'cors';
import { config } from './config.js';
import { connectDb } from './db.js';
import authRoutes from './routes/auth.js';
import productsRoutes from './routes/products.js';
import { errorHandler } from './middleware/error.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true, service: 'shopnest-storefront' }));
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  await connectDb();
  app.listen(config.port, () => console.log('ShopNest Storefront API on', config.port));
}

export default app;
