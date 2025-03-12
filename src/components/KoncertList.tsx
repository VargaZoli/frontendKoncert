import React, { useEffect, useState } from "react";
import axios from "axios";

interface Koncert {
    id: number;
    BandName: string;
    StartTime: string;
    Length: number;
    Postponed: boolean;
  }
  

const KoncertList: React.FC = () => {
  const [koncertek, setKoncertek] = useState<Koncert[]>([]);
  const [error, setError] = useState<string>("");

  // Koncertek betöltése a backendről
  useEffect(() => {
    const fetchKoncertek = async () => {
      try {
        const res = await axios.get("http://localhost:3000/koncertek");
        setKoncertek(res.data);  
      } catch (error) {
        setError("Hiba történt a koncertek betöltésekor.");
      }
    };
    fetchKoncertek();
  }, []);

  // Koncert lemondása
  const handleCancel = async (id: number) => {
    try {
      await axios.patch(`http://localhost:3000/koncertek/${id}`, {
        Postponed: true, 
      });
      setKoncertek(
        koncertek.map((k) =>
          k.id === id ? { ...k, Postponed: true } : k
        )
      );
    } catch {
      setError("Hiba történt a koncert lemondásakor.");
    }
  };

  return (
    <div>
      <h1>Koncertek</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {koncertek.map(k => (
          <li
            key={k.id}
            style={{ 
              background: k.Postponed ? "#f8d7da" : "" 
            }}
          >
            {k.BandName} - {new Date(k.StartTime).toLocaleString("hu-HU")} ({k.Length} perc)
            {!k.Postponed && <button onClick={() => handleCancel(k.id)}>Elmarad</button>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KoncertList;
