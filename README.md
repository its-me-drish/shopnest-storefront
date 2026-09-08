# ShopNest Storefront

Headless storefront API and React shop UI with cart, checkout and order history.

## Stack
- Node.js + Express REST API
- MongoDB + Mongoose
- React 18 + Vite client
- JWT auth, Zod validation, Jest + Supertest

## Getting started

```bash
npm install
cp .env.example .env
npm run seed
npm run dev        # API on :4000
npm run dev:client # client on :5173
```

## API

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| POST | /api/auth/signup | Create an account |
| POST | /api/auth/login | Exchange credentials for a JWT |
| GET | /api/products | List products (paginated, searchable) |
| POST | /api/products | Create a product |
| PATCH | /api/products/:id | Update a product |
| DELETE | /api/products/:id | Delete a product |
| POST | /api/cart/items | Add an item to the cart |
| POST | /api/orders | Place an order |

## Testing

```bash
npm test
```

## License

MIT
