import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'products.json');

export default function handler(req, res) {
  const { method } = req;
  let products = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  if (method === 'GET') {
    res.status(200).json(products);
  } else if (method === 'POST') {
    const newProduct = { id: Date.now(), ...req.body };
    products.push(newProduct);
    fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));
    res.status(201).json(newProduct);
  } else if (method === 'PUT') {
    const { id, ...updates } = req.body;
    products = products.map(p => (p.id === id ? { ...p, ...updates } : p));
    fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));
    res.status(200).json({ success: true });
  } else if (method === 'DELETE') {
    const { id } = req.body;
    products = products.filter(p => p.id !== id);
    fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));
    res.status(200).json({ success: true });
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
