import React from "react";

export default function Sidebar() {
  return (
    <>
      {/* <!-- Sidebar --> */}
      <div
        className="offcanvas offcanvas-start bg-dark text-white sidebar-nav"
        tabIndex={-1}
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-body p-0">
          <nav className="navbar-dark">
            <ul className="navbar-nav">
              <li>
                <div className="text-secondary small fw-bold text-uppercase px-3">
                  Dashboard
                </div>
              </li>
              <li>
                <a href="#" className="nav-link px-3 active">
                  <span className="me-2">
                    <i className="bi bi-speedometer2"></i>
                  </span>
                  <span>Dashboard</span>
                </a>
              </li>
              <li className="my-4">
                <hr />
              </li>
              <li>
                <div className="text-secondary small fw-bold text-uppercase px-3">
                  Example
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
