import { useState } from 'react';
import { api } from '../api.js';

export default function ProductForm({ onCreated }) {
  const [name, setProductTitle] = useState('');
  const [busy, setBusy] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    try {
      const created = await api.post('/products', { name });
      onCreated?.(created);
      setProductTitle('');
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="product-form">
      <input value={name} onChange={(e) => setProductTitle(e.target.value)} placeholder="New product" />
      <button disabled={busy || !name.trim()}>Add</button>
    </form>
  );
}
