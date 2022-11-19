import React from "react"
import logo  from'./electricity.png'

import './index.css'


const Header = () => {
    return (
        <div className="header">
            &nbsp;&nbsp;<img src={logo} alt="onHome" /> OnHome | Sua conta sob controle
        </div>
    );
}

export default Header