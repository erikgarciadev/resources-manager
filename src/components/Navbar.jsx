import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
    return (
        <header className="bg-white h-16 w-full shadow-md">
            <div className="wrapper">
                <nav className="flex w-full justify-between items-center h-full ">
                    <Link to="/" className="text-black text-xl">
                        Resource Manager
                    </Link>
                    <div className="flex h-full ">
                        <NavLink className="link" to="/">
                            Inicio
                        </NavLink>
                        <NavLink className="link" to="/resources">
                            Recursos
                        </NavLink>
                    </div>
                </nav>
            </div>
        </header>
    )
}
