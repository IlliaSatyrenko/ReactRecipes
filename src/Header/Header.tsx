import { Link } from "react-router-dom";
import "./Header.css";
import HeaderProfile from "./HeaderProfile/HeaderProfile";

function Header() {
    const logo = require("../assets/logo.png");

    return (
        <header>
            <div className="wrapper">
                <img className="logo" src={logo} alt="Recipes.com Logo"/>
                <Link to={"/all-items"}/>
                <HeaderProfile />
            </div>
        </header>
    );
}

export default Header;
