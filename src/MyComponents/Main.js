import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import TaskManager from './TaskManager';
import APOD from './APOD';

function Main() {
  const [searchText, setSearchText] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Router>
      <>
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
          <div className="container">
            <Link className="navbar-brand" to="/">
              Lista zadań
            </Link>
            <button
              className="navbar-toggler d-lg-none"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapsibleNavId"
              aria-controls="collapsibleNavId"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavId">
              <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                <li className="nav-item">
                  <Link className="navbar-brand" to="/apod">
                    NASA API - astrofoto na dzisiaj
                  </Link>
                </li>
              </ul>
              <form className="d-flex my-2 my-lg-0" onSubmit={handleSearchSubmit}>
                <input
                  className="form-control me-sm-2"
                  type="text"
                  placeholder="Filtruj nazwie/opisie"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<TaskManager searchText={searchText} />} />
          <Route path="/apod" element={<APOD />} />
        </Routes>
      </>
    </Router>
  );
}

export default Main;
