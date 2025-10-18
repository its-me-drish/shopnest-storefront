export const config = {
  port: process.env.PORT || 4000,
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/shopnest-storefront',
  jwtSecret: process.env.JWT_SECRET || 'dev-secret',
};
