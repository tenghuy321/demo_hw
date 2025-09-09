import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);

  const API_URL = "http://localhost:5000/api/items";

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await axios.get(API_URL);
    setItems(res.data);
  };

  const addItem = async () => {
    if (!name) return;
    if (editId) {
      await axios.put(`${API_URL}/${editId}`, { name });
      setEditId(null);
    } else {
      await axios.post(API_URL, { name });
    }
    setName("");
    fetchItems();
  };

  const deleteItem = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchItems();
  };

  const startEdit = (item) => {
    setName(item.name);
    setEditId(item._id);
  };

  return (
    <div className="App h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold my-4">Welcome to demo page</h1>

      <div className="flex items-center gap-4">
        <input
          type="text"
          value={name}
          placeholder="Enter name"
          className="border rounded-md px-2 py-1"
          onChange={(e) => setName(e.target.value)}
        />
        <button className="px-4 py-1 bg-green-500 rounded-md text-white" onClick={addItem}>{editId ? "Update" : "Add"}</button>
      </div>

      <ul className="mt-4">
        {items.map((item) => (
          <li key={item._id} className="flex gap-2 my-2">
            <p>{item.name}</p>
            <button className="px-4 py-1 bg-green-500 rounded-md text-white" onClick={() => startEdit(item)}>Edit</button>
            <button className="px-4 py-1 bg-red-500 rounded-md text-white" onClick={() => deleteItem(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
