import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [customText, setCustomText] = useState('');
  const [color, setColor] = useState('blanc');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      fetch('/api/products')
        .then(res => res.json())
        .then(data => {
          const p = data.find(item => item.id === parseInt(id));
          setProduct(p);
        });
    }
  }, [id]);

  const handleAddToCart = () => {
    alert(`Ajouté au panier : ${product.name}, ${quantity}x, couleur : ${color}, texte : "${customText}"`);
  };

  if (!product) return <p>Produit introuvable...</p>;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 p-6 bg-gray-50 max-w-3xl mx-auto">
        <img src={product.image} alt={product.name} className="rounded-xl mb-4" />
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-xl font-semibold mb-4">€{product.price}</p>

        <label className="block mb-2 font-medium">Personnalisation :</label>
        <input type="text" placeholder="Texte à graver" value={customText} onChange={e => setCustomText(e.target.value)} className="w-full p-2 mb-4 border rounded-lg" />

        <label className="block mb-2 font-medium">Couleur :</label>
        <select value={color} onChange={e => setColor(e.target.value)} className="w-full p-2 mb-4 border rounded-lg">
          <option value="blanc">Blanc</option>
          <option value="noir">Noir</option>
          <option value="bleu">Bleu</option>
        </select>

        <label className="block mb-2 font-medium">Quantité :</label>
        <input type="number" min="1" value={quantity} onChange={e => setQuantity(e.target.value)} className="w-full p-2 mb-4 border rounded-lg" />

        <button onClick={handleAddToCart} className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">
          Ajouter au panier
        </button>
      </main>
      <Footer />
    </div>
  );
}
