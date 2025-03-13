import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import KoncertList from "./components/KoncertList";
import NewKoncert from "./components/NewKoncert";
import "bootstrap/dist/css/bootstrap.min.css";

const App: React.FC = () => {
  return (
    <Router>
      <div
        className="container-fluid d-flex flex-column min-vh-100" 
        style={{
          background: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460, #ff69b4)",
          color: "#fff",
          height: "100vh",
        }}
      >
        <nav className="navbar navbar-expand-lg navbar-dark bg-transparent px-4 py-3 shadow-lg">
          <a className="navbar-brand fs-2 fw-bold text-uppercase" href="#" style={{ color: "#ff69b4" }}>
            Koncert App
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link fs-5 fw-semibold" to="/koncertlist" style={{ color: "#00bfff" }}>
                  Főoldal
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fs-5 fw-semibold" to="/new" style={{ color: "#ff69b4" }}>
                  Új koncert
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="container py-5 flex-grow-1" style={{ overflow: "auto" }}>
          <div className="row">
            <div className="col-12">
              <Routes>
                <Route path="/koncertlist" element={<KoncertList />} />
                <Route path="/new" element={<NewKoncert />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
