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

  useEffect(() => {
    const fetchKoncertek = async () => {
      try {
        const res = await axios.get("http://localhost:3000/koncertek");
        console.log("Koncertek API válasz:", res.data);
        setKoncertek(Array.isArray(res.data.data) ? res.data.data : []);
      } catch (error) {
        console.error("API hiba:", error);
        setError("Hiba történt a koncertek betöltésekor.");
      }
    };
    fetchKoncertek();
  }, []);

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
    <div className="container py-5">
      <h1 className="text-center mb-4" style={{ color: "#ff69b4" }}>
        Koncertek
      </h1>

      {error && (
        <p style={{ color: "red", fontWeight: "bold", textAlign: "center" }}>
          {error}
        </p>
      )}

      <ul className="list-group" style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}>
        {koncertek.map((k) => (
          <li
            key={k.id}
            className="list-group-item d-flex justify-content-between align-items-center"
            style={{
              background: k.Postponed
                ? "linear-gradient(135deg, #ff69b4, #ff8da1)" 
                : "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
              borderLeft: k.Postponed ? "5px solid #ff69b4" : "",
              color: "#fff",
              padding: "15px",
              borderRadius: "10px",
              marginBottom: "10px",
              fontSize: "1.2rem",
            }}
          >
            <span>
              <strong>{k.BandName}</strong> -{" "}
              {new Date(k.StartTime).toLocaleString("hu-HU")} ({k.Length} perc)
            </span>

            {!k.Postponed && (
              <button
                onClick={() => handleCancel(k.id)}
                className="btn btn-danger"
                style={{
                  background: "#ff69b4",
                  borderColor: "#ff69b4",
                  color: "#fff",
                  transition: "background-color 0.3s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#00bfff")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#ff69b4")}
              >
                Elmarad
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KoncertList;
