import React from 'react'
import { NavLink, useMatch } from 'react-router-dom';
import { Button, Nav, NavItem } from 'reactstrap';
import { RxDashboard } from 'react-icons/rx';
import { BsCalendarEvent } from "react-icons/bs";
import { MdOutlineLogout } from "react-icons/md";
import { RiCloseLargeFill } from "react-icons/ri";
import { CiViewList } from "react-icons/ci";
import { FaUsers } from "react-icons/fa";
import GivemeoLogo from "../assets/images/GiveMeo_Logo.png";

const navigation = [
    {
        title: "Dashboard",
        href: "home",
        icon: <RxDashboard />
    },
    {
        title: "Users",
        href: "users",
        icon: <FaUsers />,
    },
    {
        title: "Events",
        href: "event",
        icon: <BsCalendarEvent />,
    },
    {
        title: "Wishlist",
        href: "wishlist",
        icon: <CiViewList />,
    },
    {
        title: "Event-Wishlist",
        href: "event-wishlist",
        icon: <CiViewList />,
    },
    {
        title: "Child-Wishlist",
        href: "child-wishlist",
        icon: <CiViewList />,
    },
];

const Sidebar = ({ showMobilemenu, handleLogout }) => {
    // const location =useLocation();

    const match = useMatch("/dashboard/userProfile");

    return (

        <div className='position-fixed ms-2'>
            {/* close sidebar button (x) */}
            <div className="float-end ">
                <Button
                    color='white'
                    className="ms-auto text-white d-lg-none border-0 p-0"
                    onClick={showMobilemenu}
                >
                    <RiCloseLargeFill />
                </Button>
            </div>

            {/* Givemeo Logo */}
            <div className='mt-3 text-center me-3 animated-image'>
                <img src={GivemeoLogo} alt="Giveme-Logo" height={75}
                    width={210} />
            </div>

            {/* sidebar content */}
            <div className="p-3">
                <Nav vertical className="sidebarNav">
                    {navigation?.map((nav, index) => (
                        <NavItem key={index} className="sidenav-bg mb-1">
                            <NavLink to={nav.href}
                                className={({ isActive }) =>
                                    isActive || (nav.href === 'users' && match)
                                        // location.pathname === '/dashboard/userProfile'
                                        ? `active nav-link py-3`
                                        : `nav-link py-3 `
                                }
                            >  {nav.icon}
                                <span className="ms-3 d-inline-block ">{nav.title}</span>
                            </NavLink>
                        </NavItem>
                    ))}

                    <hr className='text-white' />

                    {/*****  Logout Button ******/}
                    <Button
                        style={{ background: "#1e2a35", border: "none" }}
                        // style={{ backgroundColor: "none", border: "none" }}
                        className='nav-link'
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

export default Sidebar;
