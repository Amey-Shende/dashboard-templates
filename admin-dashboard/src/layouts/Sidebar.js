import React from 'react'
import { NavLink } from 'react-router-dom';

import { Button, Nav, NavItem } from 'reactstrap';

import { RxDashboard } from 'react-icons/rx';
import { BsCalendarEvent } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { IoInformationCircle } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
import { RiCloseLargeFill } from "react-icons/ri";

const navigation = [
    {
        title: "Dashboard",
        href: "home",
        icon: <RxDashboard />
    },
    {
        title: "Events",
        href: "event",
        icon: <BsCalendarEvent />

    },
    {
        title: "Settings",
        href: "setting",
        icon: <IoMdSettings style={{ fontSize: "20px", marginRight: "-4px" }} />
    },
    {
        title: "Help & Information",
        href: "helpandsupport",
        icon: <IoInformationCircle style={{ fontSize: "20px", marginRight: "-4px" }} />
    },
    // {
    //     title: "Logout",
    //     href: "logout",
    //     icon: <MdOutlineLogout style={{ fontSize: "20px", marginRight: "-4px" }} />
    // }

];

const Sidebar = ({ showMobilemenu, handleLogout }) => {

    return (
        <div className='bg-dark position-fixed'>

            {/* close sidebar button (x) */}
            <div className="d-flex mt-1">
                <Button
                    color="white"
                    className="ms-auto text-white d-lg-none"
                    onClick={showMobilemenu}
                >
                    <RiCloseLargeFill />
                </Button>
            </div>

            <div className="p-3">
                <Nav vertical className="sidebarNav">
                    {navigation?.map((nav, index) => (
                        <NavItem key={index} className="sidenav-bg">

                            <NavLink to={nav.href}
                                className={({ isActive }) =>
                                    isActive ? "active nav-link py-3"
                                        : "nav-link py-3"
                                }>
                                {nav.icon}
                                <span className="ms-3 d-inline-block ">{nav.title}</span>
                            </NavLink>
                        </NavItem>
                    ))}

                    <hr className='text-white' />

                    {/*****  Logout Button ******/}
                    <Button
                        style={{ background: "#1e2a35", border: "none" }}
                        onClick={handleLogout} >

                        <MdOutlineLogout style={{ fontSize: "20px", marginRight: "-4px" }} />

                        <span className="ms-3 d-inline-block" style={{ marginRight: "90px" }} >
                            Logout
                        </span>

                    </Button>
                </Nav>
            </div>
        </div>

    );
};

export default Sidebar
