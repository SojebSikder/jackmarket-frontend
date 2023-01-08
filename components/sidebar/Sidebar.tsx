import Link from "next/link";
import React from "react";
import { BsHouseDoor } from "react-icons/bs";

export default function Sidebar() {
  return (
    <>
      {/* <!-- Sidebar --> */}
      <div
        className="offcanvas bg-light sidebar-nav"
        tabIndex={-1}
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-body p-0">
          <nav className="navbar-light">
            <ul className="navbar-nav">
              <li>
                <Link href="/" className="nav-link px-3 active">
                  <span className="me-2">
                    <BsHouseDoor size={20} />
                  </span>
                  <span>Home</span>
                </Link>
              </li>

              <li>
                <div className="text-secondary small fw-bold text-uppercase px-3">
                  Categories
                </div>
              </li>

              <li>
                <a
                  className="nav-link px-3 sidebar-link"
                  data-bs-toggle="collapse"
                  href="#collapseExample"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <span className="me-2">
                    <i className="bi bi-layout-split"></i>
                  </span>
                  <span>Layouts</span>
                  <span className="right-icon ms-auto">
                    <i className="bi bi-chevron-down"></i>
                  </span>
                </a>
                <div className="collapse" id="collapseExample">
                  <div>
                    <ul className="navbar-nav ps-3">
                      <li>
                        <a href="#" className="nav-link px-3">
                          <span className="me-2">
                            <i className="bi bi-layout-split"></i>
                          </span>
                          <span>Nested Link</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      {/* <!-- End Sidebar --> */}
    </>
  );
}
