import Link from 'next/link';

export default function ProductCard({ product }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
      <img src={product.image} alt={product.name} className="rounded-lg mb-4" />
      <h2 className="text-lg font-bold mb-2">{product.name}</h2>
      <p className="text-gray-700 mb-2">€{product.price}</p>
      <Link href={`/product/${product.id}`} className="block bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700">
        Voir le produit
      </Link>
    </div>
  );
}
