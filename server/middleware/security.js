import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

export const secure = [helmet(), rateLimit({ windowMs: 60_000, max: 120 })];
