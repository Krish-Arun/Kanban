import { useState } from "react";
import { addItem } from "../api/items";

export default function AddItem() {
  const [data, setData] = useState({ name: "", category: "" ,imageUrl: ""});

  function handleSubmit(e) {
    e.preventDefault();
    addItem(data).then(() => alert("Item added!"));
  }

  return (
    <form className="p-4 space-y-3" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Image URL (optional)"
        value={data.imageUrl}
        onChange={e => setData({...data, imageUrl: e.target.value})}
        className="w-full p-2 rounded bg-gray-900 border border-gray-700 text-white mb-3"
      />

      <input className="border p-2 w-full" 
        placeholder="Name"
        value={data.name}
        onChange={e => setData({...data, name: e.target.value})}
      />
      <input className="border p-2 w-full" 
        placeholder="Category"
        value={data.category}
        onChange={e => setData({...data, category: e.target.value})}
      />
      <button className="bg-black text-white px-4 py-2 rounded">
        Add Item
      </button>
    </form>
  );
}
