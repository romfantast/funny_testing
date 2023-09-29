import { NavLink } from "react-router-dom";
import css from "./Header.module.css";

function Header() {
  return (
    <header className={css.header}>
      <nav>
        <ul className={css.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? css.active : css.def)}
            >
              Form
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/search"
              className={({ isActive }) => (isActive ? css.active : css.def)}
            >
              Search
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
