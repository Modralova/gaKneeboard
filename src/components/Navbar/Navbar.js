import React from "react";
import "./Navbar.min.css";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';




const Navbar = () => {
    return ( 

        <nav className="navbar">
            <Button variant="text">debriefing</Button>
            {/* <button className="navbar navbar__button text-color-primary">debriefing</button> */}
        </nav>
     );
}
 
export default Navbar;