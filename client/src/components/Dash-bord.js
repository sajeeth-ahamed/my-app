import '../page-styles/Dash-board.css'
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    FaTh,
    FaBars,
    FaUser,
    FaTasks,
    FaWrench,
    FaPowerOff
} from "react-icons/fa";




const DASH = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const menuItem = [
        {
            path: "/dash",
            name: "Dashboard",
            icon: <FaTh />
        },
        {
            path: "/about",
            name: "Staff",
            icon: <FaUser />
        },
        {
            path: "/attendance",
            name: "Attendance",
            icon: <FaTasks />
        },
        {
            path: "/settings",
            name: "Settings",
            icon: <FaWrench />
        },
        {
            path: "/logout",
            name: "Log-out",
            icon: <FaPowerOff />
        },

    ]
    return (
        <div className="DashBoardItem">
            <div style={{ width: isOpen ? "200px" : "50px", }} className="sidebar">
                <div className="top_section">
                    <h1 style={{ display: isOpen ? "block" : "none", transition: "all 2s : all 2s" }} className="logo fw-bold">qRec</h1>
                    <div style={{ marginLeft: isOpen ? "60px" : "0px", transition: "all 0.9s : all 0.9s" }} className="bars">
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                {
                    menuItem.map((item, index) => (
                        <Link to={item.path} key={index} className="link" activeclassname="active">
                            <div className="icon">{item.icon}</div>
                            <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
                        </Link>
                    ))
                }
            </div>
            <main className='overflow-auto'>{children}</main>
        </div>
    );
};

export default DASH;
// hello