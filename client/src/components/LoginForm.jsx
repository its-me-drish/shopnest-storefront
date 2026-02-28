import { useState } from 'react';
import { useAuth } from '../AuthContext.jsx';

export default function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  async function onSubmit(e) {
    e.preventDefault();
    try { await login(email, password); } catch (err) { setError(err.message); }
  }

  return (
    <form className="login" onSubmit={onSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Sign in</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
