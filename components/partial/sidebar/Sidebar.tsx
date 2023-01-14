import Link from "next/link";
import React, { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { BsHouseDoor, BsLayoutSplit, BsChevronDown } from "react-icons/bs";

export default function Sidebar({ categoryData }: { categoryData: any }) {
  return (
    <>
      {/* <!-- Sidebar --> */}
      <div
        className="offcanvas sidebar-nav mt-2"
        tabIndex={-1}
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
        style={{ background: "white" }}
      >
        <div className="offcanvas-body p-0">
          <nav className="navbar-light">
            <ul className="navbar-nav">
              <li>
                <Link href="/products" className="nav-link px-3 active">
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

              {categoryData.map((category: any) => {
                return (
                  <li key={category.id}>
                    <a
                      className="nav-link px-3 sidebar-link"
                      data-bs-toggle="collapse"
                      href={`#collapseExample${category.id}`}
                      role="button"
                      aria-expanded="false"
                      aria-controls={`collapseExample${category.id}`}
                    >
                      <span className="me-2">
                        <BsLayoutSplit />
                      </span>
                      <span>{category.name}</span>
                      {category.sub_categories.length > 0 && (
                        <span className="right-icon ms-auto">
                          <BsChevronDown />
                        </span>
                      )}
                    </a>
                    {category.sub_categories.length > 0 &&
                      category.sub_categories.map((child_category: any) => {
                        return (
                          <div
                            key={child_category.id}
                            className="collapse"
                            id={`collapseExample${category.id}`}
                          >
                            <div>
                              <ul className="navbar-nav ps-3">
                                <li>
                                  <a href="#" className="nav-link px-3">
                                    <span className="me-2">
                                      <BsLayoutSplit />
                                    </span>
                                    <span>{child_category.name}</span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        );
                      })}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
      {/* <!-- End Sidebar --> */}
    </>
  );
}
