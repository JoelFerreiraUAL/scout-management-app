import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Gestao de Escuteiros
        </Link>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/items">
              Items
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link active"
              aria-current="page"
              to="/sections"
            >
              Secções
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link active"
              aria-current="page"
              to="/subsections"
            >
              Sub Secções
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link active"
              aria-current="page"
              to="/Categories"
            >
              Categorias
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link active"
              aria-current="page"
              to="/Inspection"
            >
              Inspeções
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
