import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NewKoncert: React.FC = () => {
  const [form, setForm] = useState({ fellepo: "", kezdes: "", idotartam: 0 });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/koncertek", form, {
        headers: { "Content-Type": "application/json" },
      });
      navigate("/");
    } catch {
      setError("Hiba történt a koncert mentésekor.");
    }
  };

  return (
    <div>
      <h1>Új koncert hozzáadása</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="fellepo" placeholder="Fellépő neve" onChange={handleChange} />
        <input name="kezdes" type="datetime-local" onChange={handleChange} />
        <input name="idotartam" type="number" placeholder="Időtartam (perc)" onChange={handleChange} />
        <button type="submit">Hozzáadás</button>
      </form>
    </div>
  );
};

export default NewKoncert;
