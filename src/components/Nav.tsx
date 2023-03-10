import { NavLink } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
    return (
        <nav className='nav'>
            <NavLink className={(navData) => (navData.isActive ? "nav__link nav__link--active" : "nav__link")} to='/'>
                Strona główna
            </NavLink>
            <NavLink
                className={(navData) => (navData.isActive ? "nav__link nav__link--active" : "nav__link")}
                to='calculator'>
                Kalkulator
            </NavLink>
        </nav>
    );
};

export default Nav;
