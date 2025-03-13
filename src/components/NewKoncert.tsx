import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NewKoncert: React.FC = () => {
  const [form, setForm] = useState({ fellepo: "", kezdes: "", idotartam: 0 });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === "number" ? Number(e.target.value) : e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newKoncert = {
      BandName: form.fellepo,
      StartTime: new Date(form.kezdes).toISOString(),
      Length: Number(form.idotartam),
      Postponed: false,
    };

    console.log("Elküldött adatok:", newKoncert);

    try {
      await axios.post("http://localhost:3000/koncertek", newKoncert, {
        headers: { "Content-Type": "application/json" },
      });
      navigate("/koncertlist");
    } catch (error: any) {
      console.error("Hiba történt:", error.response?.data || error);
      setError("Hiba történt a koncert mentésekor.");
    }
  };

  return (
    <div className="container py-5" style={{ background: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)", color: "#ffffff" }}>
      <h1 className="text-center text-pink mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>Új koncert hozzáadása</h1>

      {error && <div className="alert alert-danger" role="alert">{error}</div>}

      <div className="row justify-content-center">
        <div className="col-md-6 col-12">
          <form onSubmit={handleSubmit} className="shadow p-4 rounded" style={{ background: 'linear-gradient(to right, #ff69b4, #00bfff)', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)', backgroundSize: 'cover' }}>
            <div className="mb-3">
              <label htmlFor="fellepo" className="form-label" style={{ color: "#fff" }}>Fellépő neve</label>
              <input
                id="fellepo"
                name="fellepo"
                type="text"
                className="form-control"
                placeholder="Fellépő neve"
                value={form.fellepo}
                onChange={handleChange}
                style={{ backgroundColor: '#121212', color: '#ffffff' }}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="kezdes" className="form-label" style={{ color: "#fff" }}>Kezdési idő</label>
              <input
                id="kezdes"
                name="kezdes"
                type="datetime-local"
                className="form-control"
                value={form.kezdes}
                onChange={handleChange}
                style={{ backgroundColor: '#121212', color: '#ffffff' }}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="idotartam" className="form-label" style={{ color: "#fff" }}>Időtartam (perc)</label>
              <input
                id="idotartam"
                name="idotartam"
                type="number"
                className="form-control"
                placeholder="Időtartam (perc)"
                value={form.idotartam}
                onChange={handleChange}
                style={{ backgroundColor: '#121212', color: '#ffffff' }}
                required
              />
            </div>

            <button type="submit" className="btn btn-pink w-100 mt-3" style={{ backgroundColor: '#ff69b4', borderColor: '#ff69b4', fontSize: '1.1rem' }}>Hozzáadás</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewKoncert;
