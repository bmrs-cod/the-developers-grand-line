
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <NavLink to="/">Início</NavLink>
      <NavLink to="/projetos">Projetos</NavLink>
      <NavLink to="/contato">Contato</NavLink>
    </nav>
  );
}

export default Navbar;
