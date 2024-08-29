import React, { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Form,
  Input,
  Button
} from 'reactstrap';
import { FaBell, FaUser } from 'react-icons/fa';

const CustomNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="light" light expand="lg">
      <div className="d-flex justify-content-between align-items-center w-100">
        <NavbarBrand href="#">
          <img
            src="https://via.placeholder.com/100x30?text=Logo"
            alt="Logo"
            style={{ maxHeight: '30px' }}
          />
        </NavbarBrand>

        <Nav className="d-none d-lg-flex">
          <NavItem>
            <NavLink href="#home">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#about">About</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#service">Service</NavLink>
          </NavItem>
        </Nav>

        <Form className="d-none d-lg-flex" inline>
          <Input type="text" placeholder="Search" className="mr-2" />
          <Button color="outline-success">Search</Button>
        </Form>

        <div className="d-flex align-items-center">
          <NavLink href="#notifications">
            <FaBell size={20} />
          </NavLink>
          <NavLink href="#profile">
            <FaUser size={20} />
          </NavLink>
        </div>
      </div>

      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto d-lg-none" navbar>
          <NavItem>
            <NavLink href="#home">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#about">About</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#service">Service</NavLink>
          </NavItem>
          <Form inline className="mt-2">
            <Input type="text" placeholder="Search" className="mr-2" />
            <Button color="outline-success">Search</Button>
          </Form>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
