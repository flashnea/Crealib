import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', image: '' });

  useEffect(() => {
    if (auth) fetchProducts();
  }, [auth]);

  const fetchProducts = () => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  };

  const handleAdd = () => {
    fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newProduct, price: parseFloat(newProduct.price) })
    }).then(() => {
      setNewProduct({ name: '', price: '', image: '' });
      fetchProducts();
    });
  };

  const handleDelete = (id) => {
    fetch('/api/products', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    }).then(() => fetchProducts());
  };

  if (!auth) return (
    <div className="min-h-screen flex items-center justify-center">
      <input type="password" placeholder="Mot de passe admin" value={password} onChange={e => setPassword(e.target.value)} className="p-2 border rounded" />
      <button onClick={() => password === 'admin123' ? setAuth(true) : alert('Mauvais mot de passe')} className="ml-2 p-2 bg-blue-600 text-white rounded">Connexion</button>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4">Admin - Gestion des produits</h1>
        <div className="mb-6">
          <input placeholder="Nom" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} className="p-2 border mr-2" />
          <input placeholder="Prix" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} className="p-2 border mr-2" />
          <input placeholder="Image (/images/xxx.jpg)" value={newProduct.image} onChange={e => setNewProduct({ ...newProduct, image: e.target.value })} className="p-2 border mr-2" />
          <button onClick={handleAdd} className="p-2 bg-green-600 text-white rounded">Ajouter</button>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Nom</th>
              <th className="border p-2">Prix</th>
              <th className="border p-2">Image</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td className="border p-2">{p.name}</td>
                <td className="border p-2">{p.price}</td>
                <td className="border p-2">{p.image}</td>
                <td className="border p-2">
                  <button onClick={() => handleDelete(p.id)} className="p-1 bg-red-600 text-white rounded">Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      <Footer />
    </div>
  );
}
