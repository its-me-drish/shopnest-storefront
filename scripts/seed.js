import { connectDb } from '../server/db.js';
import User from '../server/models/User.js';
import Product from '../server/models/Product.js';

await connectDb();
await Product.deleteMany({});
await User.deleteMany({});

const user = await User.create({ email: 'demo@shopnest-storefront.dev', name: 'Demo', passwordHash: await User.hash('demo1234') });
await Product.insertMany(["Aurora Desk Lamp","Nomad Backpack","Ceramic Pour-Over"].map((name) => ({ name, owner: user._id })));

console.log('seeded');
process.exit(0);
