import { useEffect, useState } from 'react';
import { fetchAllMenuItems } from '../api/menu';

interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
}

function MenuPage() {
  const [menu, setMenu] = useState<MenuItem[]>([]);

  useEffect(() => {
    fetchAllMenuItems()
      .then(data => setMenu(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Menu</h2>
      <ul className="space-y-2">
        {menu.map(item => (
          <li key={item.id} className="p-4 border rounded">
            <p className="font-bold">{item.name}</p>
            <p>${item.price} — {item.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MenuPage;
