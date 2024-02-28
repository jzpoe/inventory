

import {Link } from 'react-router-dom';
import './Rutas.css';

const Rutas = () => {


  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/Home" className="navbar-link">
            Home
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/Formulario" className="navbar-link">
            Formulario
          </Link>
        </li>
        {/* <li className="navbar-item">
          <Link to="/Ticket" className="navbar-link">
            Ticket
          </Link>
        </li>
       */}
      </ul>
      
    </nav>
  );
};

export default Rutas;
