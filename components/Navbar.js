import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">3D Shop</h1>
      <div className="space-x-4">
        <Link href="/">Accueil</Link>
        <Link href="/admin">Admin</Link>
      </div>
    </nav>
  );
}
