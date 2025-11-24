import { NavLink, useLocation } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {
  const location = useLocation();

  // Dependiendo de la página, escogemos el header adecuado
  const getHeaderClass = () => {
    if (location.pathname === "/simulator") return "header-simulador";
    if (location.pathname === "/request") return "header-solicitar";
    return "header-inicio";
  };

  return (
    <header className={getHeaderClass()}>
      <div className="encabezado">
        <div className="logo-contenedor">
          <img src="/img/CreditSmart_logo.png" alt="Logo CreditSmart" className="logo-img" />
        </div>

        <nav>
          <ul className="menu">
            <li>
              <NavLink to="/" end>
                Inicio
              </NavLink>
            </li>

            <li>
              <NavLink to="/simulator">
                Simulador Crédito
              </NavLink>
            </li>

            <li>
              <NavLink to="/request">
                Solicitar Crédito
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
