import { useMemo, useState } from 'react';
import { api } from '../api.js';

const money = (cents) => `$${(cents / 100).toFixed(2)}`;

export default function Cart({ items, onPlaced }) {
  const [busy, setBusy] = useState(false);
  const total = useMemo(() => items.reduce((sum, i) => sum + i.priceCents * i.qty, 0), [items]);

  async function checkout() {
    setBusy(true);
    try {
      const order = await api.post('/orders', { items: items.map((i) => ({ productId: i._id, qty: i.qty })) });
      onPlaced?.(order);
    } finally {
      setBusy(false);
    }
  }

  return (
    <aside className="cart">
      <h2>Cart</h2>
      {items.map((i) => <div key={i._id}>{i.name} × {i.qty} <span>{money(i.priceCents * i.qty)}</span></div>)}
      <p className="total">Total {money(total)}</p>
      <button disabled={busy || !items.length} onClick={checkout}>Checkout</button>
    </aside>
  );
}
