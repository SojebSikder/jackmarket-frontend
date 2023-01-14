import Image from "next/image";
import Link from "next/link";
import React, { forwardRef } from "react";
import {
  Button,
  Container,
  Dropdown,
  Form,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import { BsInfoCircle, BsPerson, BsCart4 } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { AppConfig } from "../../../config/app.config";

const expand = "md";
export default function NavbarComponent() {
  return (
    <>
      <Navbar
        // bg="light"
        expand={expand}
        className="mb-3 sticky-top"
        style={{
          boxShadow: "rgb(118 118 118) -1px -2px 7px 2px",
          background: "white",
        }}
      >
        <Container fluid>
          {/* <!-- Siderbar button --> */}
          <button
            className="navbar-toggler me-2"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample"
            aria-controls="offcanvasExample"
          >
            <span
              className="navbar-toggler-icon"
              data-bs-target="#offcanvasExample"
            ></span>
          </button>
          {/* <!-- End Sidebar button --> */}
          <Link className="navbar-brand" href="/products">
            {AppConfig().app.name}
          </Link>

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
                    <FaSearch style={{ marginBottom: "5px" }} />
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
                  <span className="d-md-none d-lg-inline">My products</span>
                </Nav.Link>

                <Nav.Link>
                  <BsPerson style={{ marginRight: "5px" }} size={20} />
                  <span className="d-md-none d-lg-inline">My account</span>
                </Nav.Link>

                <Nav.Link href="/help">
                  <BsInfoCircle style={{ marginRight: "5px" }} size={20} />
                  <span className="d-md-none d-lg-inline">Help & contact</span>
                </Nav.Link>

                <Link
                  style={{
                    textDecoration: "none",
                    color: "var(--bs-nav-link-color)",
                  }}
                  href={"/cart"}
                >
                  <div
                    style={{
                      border: "1px solid #121212",
                      borderRadius: "24px",
                      padding: ".5rem",
                    }}
                  >
                    <BsCart4 style={{ marginRight: "5px" }} size={20} />
                    <span className="d-md-none d-lg-inline">Basket</span>
                  </div>
                </Link>

                {/* </Nav.Link> */}
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
