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
    <div className="App">
      <h1>CRUD App (React + Node + MongoDB)</h1>

      <input
        type="text"
        value={name}
        placeholder="Enter name"
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={addItem}>{editId ? "Update" : "Add"}</button>

      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {item.name}
            <button onClick={() => startEdit(item)}>Edit</button>
            <button onClick={() => deleteItem(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
