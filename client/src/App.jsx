import { useState } from 'react';
import { AuthProvider, useAuth } from './AuthContext.jsx';
import LoginForm from './components/LoginForm.jsx';
import ProductList from './components/ProductList.jsx';
import ProductForm from './components/ProductForm.jsx';

function Shell() {
  const { token, logout } = useAuth();
  const [version, setVersion] = useState(0);

  if (!token) return <LoginForm />;

  return (
    <main className="shell">
      <header>
        <h1>ShopNest Storefront</h1>
        <button onClick={logout}>Sign out</button>
      </header>
      <ProductForm onCreated={() => setVersion((v) => v + 1)} />
      <ProductList key={version} />
    </main>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Shell />
    </AuthProvider>
  );
}
