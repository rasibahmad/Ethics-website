import React from "react";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-home" href="/">
                Home
            </a>
            <a className="navbar-applications" href="/applications">
                Applications
            </a>
        </nav>
    )
}

export { Navbar } 