import { useState } from 'react'
import { useLocation, useNavigate, } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Navbar } from 'reactstrap';
import { MdOutlineLogout } from "react-icons/md";
import { CgMenu } from "react-icons/cg";
import adminPhoto from "../assets/images/adminPhoto.jpg";

const Header = ({ showMobilemenu, handleLogout }) => {

    //***  profile icon dropdowm  *****/
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const location = useLocation();

    // toggle navbar collpase (dropdown) 
    const toggle = () => setDropdownOpen((prevState) => !prevState);

    //**  navigate to profile component */
    const handleProfile = (e) => {
        navigate("/dashboard/profile");
    }

    //** navigate to Change password component  */
    const handleChangePassword = (e) => {
        navigate("/dashboard/changePassword");
    }

    return (
        <Navbar expand="md" color="white" className="sticky-top shadow-sm" style={{ height: "8vh" }}>
            <div className='d-flex align-items-center'>
                {/****** Hamburger menu (three line) ********/}
                <Button
                    color="white"
                    className=" d-lg-none border-0"
                    onClick={showMobilemenu}
                >
                    <CgMenu className='fs-4 ' />
                </Button>
            </div>

            <div className='d-none d-md-flex w-100'>
                <Breadcrumb>
                    <BreadcrumbItem active className='fs-4 pt-3 text-capitalize'>
                        {location.pathname.split("/").slice(1,).join(" / ")}
                    </BreadcrumbItem>
                </Breadcrumb>
            </div>

            {/********  profile large screen ********/}
            <div className=" d-flex align-items-center ">
                {/* Profile Icon */}
                <div className='position-relative '>
                    <Dropdown isOpen={dropdownOpen} toggle={toggle} >
                        <DropdownToggle color="transparent" className='border-0 pb-3 pb-lg-0'>
                            <img
                                src={adminPhoto}
                                alt="profile"
                                className="rounded-circle"
                                width="37"
                                loading='lazy'
                            ></img>
                        </DropdownToggle>

                        <DropdownMenu style={{ width: "230px", borderRadius: "10px" }}>
                            <DropdownItem header> Profile </DropdownItem>
                            <DropdownItem onClick={handleProfile}>
                                My Account
                            </DropdownItem>

                            <DropdownItem onClick={handleChangePassword}>
                                Change Password
                            </DropdownItem>

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
