import Image from "next/image";
import React from "react";
import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import { BsInfoCircle, BsPerson, BsCart4 } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { AppConfig } from "../../config/app.config";

const expand = "md";
export default function NavbarComponent() {
  return (
    <>
      <Navbar bg="light" expand={expand} className="mb-3">
        <Container fluid>
          <Navbar.Brand href="#">{AppConfig().app.name}</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                {AppConfig().app.name}
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <div className="d-flex justify-content-end flex-grow-1 pe-3">
                <Form style={{ width: "400px" }} className="d-flex">
                  <input
                    type="text"
                    style={{
                      width: "100%",
                      paddingLeft: "10px",
                      borderWidth: "0.5px",
                      borderTopLeftRadius: "0.5rem",
                      borderBottomLeftRadius: "0.5rem",
                    }}
                    placeholder="Bread, milk, eggs..."
                  />

                  <button
                    style={{
                      width: "50px",
                      borderWidth: "0px",
                      borderTopRightRadius: "0.5rem",
                      borderBottomRightRadius: "0.5rem",
                      backgroundColor: "var(--primary-color)",
                      color: "white",
                    }}
                  >
                    <FaSearch />
                  </button>
                </Form>
              </div>

              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/my-products">
                  <Image
                    src="/assets/icon/wishlist.png"
                    style={{ marginRight: "5px" }}
                    height={20}
                    width={20}
                    alt="my products"
                  />
                  My products
                </Nav.Link>
                <Nav.Link href="/profile">
                  <BsPerson style={{ marginRight: "5px" }} size={20} />
                  My account
                </Nav.Link>
                <Nav.Link href="/help">
                  <BsInfoCircle style={{ marginRight: "5px" }} size={20} />
                  Help & contact
                </Nav.Link>
                <Nav.Link href="/cart">
                  <BsCart4 style={{ marginRight: "5px" }} size={20} />
                  Basket
                </Nav.Link>
                {/* <NavDropdown
                  title="Dropdown"
                  id={`offcanvasNavbarDropdown-expand-${expand}`}
                >
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown> */}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}
