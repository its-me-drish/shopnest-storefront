import Product from '../models/Product.js';

export async function priceCart(items) {
  const ids = items.map((i) => i.productId);
  const products = await Product.find({ _id: { $in: ids } });
  let totalCents = 0;
  const lines = items.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    if (!product) throw Object.assign(new Error('product not found'), { status: 404 });
    if (product.stock < item.qty) throw Object.assign(new Error(`${product.name} is out of stock`), { status: 409 });
    const lineCents = product.priceCents * item.qty;
    totalCents += lineCents;
    return { product: product.id, name: product.name, qty: item.qty, lineCents };
  });
  return { lines, totalCents };
}
