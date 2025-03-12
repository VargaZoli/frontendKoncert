import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import KoncertList from "./components/KoncertList";
import NewKoncert from "./components/NewKoncert";

const App: React.FC = () => {
  return (
    <Router>
      <div className="container">
        <nav>
          <Link to="/koncertlist">Főoldal</Link> | <Link to="/new">Új koncert</Link>
        </nav>
        <Routes>
          <Route path="/koncertlist" element={<KoncertList />} />
          <Route path="/new" element={<NewKoncert />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;