import React from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
    return (
        <nav>
            <NavLink to='.'>Strona główna</NavLink>
            <NavLink to='calculator'>Kalkulator</NavLink>
        </nav>
    );
};

export default Nav;
