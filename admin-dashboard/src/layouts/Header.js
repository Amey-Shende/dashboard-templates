import { useState } from 'react'
import { Link, NavLink, useNavigate, } from 'react-router-dom';
import { Button, Collapse, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, Navbar, NavItem } from 'reactstrap';

import adminPhoto from "../assets/images/adminPhoto.jpg";
import { MdOutlineLogout } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CgMenu } from "react-icons/cg";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiCloseLargeFill } from "react-icons/ri";

const Header = ({ showMobilemenu, handleNotification, handleLogout }) => {

    //***  state for toggle on small screen [three dot]  ***/
    const [isOpen, setIsOpen] = useState(false);

    //***  profile icon dropdowm  *****/
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const navigate = useNavigate();

    const handletoggle = () => {
        setIsOpen(!isOpen);
    };

    const handleProfile = (e) => {
        navigate("/dashboard/profile");
    }


    const toggle = () => setDropdownOpen((prevState) => !prevState);

    return (

        <Navbar expand="md" color="white" light className="sticky-top shadow-sm" >

            <div className='d-flex align-items-center'>

                {/****** Hamburger menu (three line) ********/}
                <Button
                    color="white"
                    // className=" d-lg-none"
                    onClick={showMobilemenu}
                >
                    <CgMenu className='fs-4 ' />
                </Button>

                {/************ Yipee LOGo *************/}
                <div className="d-lg-block d-block me-5 pe-3 ms-3">
                    <NavLink to="home"
                        className="text-decoration-none fs-4 fw-bold text-success"
                    >
                        Yipee
                    </NavLink>
                </div>
            </div>


            {/******* Navbar links  ***********/}
            <Collapse navbar isOpen={isOpen}>
                <Nav className="me-auto" navbar>

                    {/******* Home navlink ******/}
                    <NavItem>
                        <Link to="home" className='nav-link'>
                            Home
                        </Link>
                    </NavItem>

                    {/******* About navlink******/}
                    <NavItem>
                        <Link to="about" className='nav-link'>
                            About
                        </Link>
                    </NavItem>
                </Nav>

                {/******* Search box ******/}
                <div className="container col-10 col-sm-5 col-lg-4 ">
                    <form >
                        <input
                            className="form-control searchBox "
                            type="search" placeholder="Search" aria-label="Search"
                        />
                    </form>
                </div>
            </Collapse>


            {/********** Three right dot on mobile screen  ***********/}
            {/* <div className="hstack gap-2 d-sm-block d-md-none">
                <Button
                    color="white"
                    className=""
                    onClick={handletoggle}
                >
                    {isOpen ? (
                        <RiCloseLargeFill />)
                        : (
                            <BsThreeDotsVertical className='fs-5' />
                        )
                    }
                </Button>
            </div> */}


            {/******** Notification & profile large screen ********/}
            <div className=" d-flex align-items-center ">

                {/******* Notification icon **********/}
                <div className='me-3 position-relative'>
                    <IoIosNotificationsOutline className='fs-4 ' onClick={handleNotification} />
                </div>

                {/* Profile Icon */}
                <div className='position-relative '>
                    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                        <DropdownToggle color="transparent" className='border-0'>
                            <img
                                src={adminPhoto}
                                alt="profile"
                                className="rounded-circle"
                                width="37"
                            ></img>
                        </DropdownToggle>

                        <DropdownMenu >
                            <DropdownItem header> Profile </DropdownItem>
                            <DropdownItem onClick={handleProfile}>
                                My Account
                            </DropdownItem>

                            <DropdownItem> Edit Profile </DropdownItem>
                            <DropdownItem> Change Password </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={handleLogout}>
                                <MdOutlineLogout style={{ fontSize: "20px" }} /> Logout
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>

        </Navbar>
    )
};

export default Header;
