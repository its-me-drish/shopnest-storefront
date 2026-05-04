import request from 'supertest';
import app from '../index.js';

describe('auth', () => {
  it('rejects signup without password', async () => {
    const res = await request(app).post('/api/auth/signup').send({ email: 'a@b.co' });
    expect(res.status).toBe(400);
  });

  it('rejects bad credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({ email: 'a@b.co', password: 'nope' });
    expect(res.status).toBe(401);
  });
});
