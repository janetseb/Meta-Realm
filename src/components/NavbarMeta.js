import React from 'react'
import { Nav,Navbar, NavDropdown, Container } from 'react-bootstrap';
const NavbarMeta = () => {
  return (
    <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">META-REALM</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/">HOME</Nav.Link>
                    <Nav.Link href="/Landmap">LANDMAP</Nav.Link>
                    <Nav.Link href="/Profile">PROFILE</Nav.Link>
                    <Nav.Link href="/SaleList">SALESLIST</Nav.Link>
                    <Nav.Link href="/Meta">META</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
    </Navbar>
  )
}

export default NavbarMeta
