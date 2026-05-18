import request from 'supertest';
import app from '../index.js';

describe('products', () => {
  it('requires authentication', async () => {
    const res = await request(app).get('/api/products');
    expect(res.status).toBe(401);
  });

  it('rejects an invalid token', async () => {
    const res = await request(app).get('/api/products').set('Authorization', 'Bearer nope');
    expect(res.status).toBe(401);
  });
});
