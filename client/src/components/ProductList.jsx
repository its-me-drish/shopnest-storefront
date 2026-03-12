import { useEffect, useState } from 'react';
import { api } from '../api.js';

export default function ProductList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/products').then((data) => setItems(data.items ?? data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading products…</p>;
  if (!items.length) return <p>No products yet.</p>;

  return (
    <ul className="product-list">
      {items.map((item) => (
        <li key={item._id}>
          <strong>{item.name}</strong>
          <span>{new Date(item.createdAt).toLocaleDateString()}</span>
        </li>
      ))}
    </ul>
  );
}
