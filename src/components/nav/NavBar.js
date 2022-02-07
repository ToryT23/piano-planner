import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
    return (
            <> 
        <ul className="navbar">
         <li className="navbar__item active">
             <Link className="navbar__link" to="/progressPost">ProgressPost</Link>
         </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/login" onClick={()=>{localStorage.removeItem("piano_user")}} >Logout</Link>
            </li>
        </ul>
    </>
    )
}