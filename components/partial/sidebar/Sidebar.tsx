import Link from "next/link";
import React from "react";
import { BsHouseDoor, BsLayoutSplit, BsChevronDown } from "react-icons/bs";
import {
  CollapseComponent,
  CollapseItem,
} from "../../resuable/custom/CollapseComponent";
import CustomImage from "../../resuable/custom/CustomImage";

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

              {/* <CollapseComponent
                title={
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    href={`/category`}
                  >
                    hello world
                  </Link>
                }
              >
                <CollapseItem>
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    href={`/category`}
                  >
                    hello world
                  </Link>
                </CollapseItem>
              </CollapseComponent> */}

              {categoryData.map((category: any) => {
                return (
                  <li key={category.id}>
                    <div className="nav-link px-3 sidebar-link">
                      <span className="me-2">
                        {category.image ? (
                          <CustomImage
                            height={20}
                            width={20}
                            src={`${category.image_url}`}
                          />
                        ) : (
                          <BsLayoutSplit />
                        )}
                      </span>
                      <span>
                        <Link
                          style={{ textDecoration: "none", color: "black" }}
                          href={`/category/${category.slug}`}
                        >
                          {category.name}
                        </Link>
                      </span>
                      {category.sub_categories.length > 0 && (
                        <a
                          style={{ display: "inline" }}
                          className="sidebar-link"
                          data-bs-toggle="collapse"
                          href={`#collapseExample${category.id}`}
                          role="button"
                          aria-expanded="false"
                          aria-controls={`collapseExample${category.id}`}
                        >
                          <span className="right-icon ms-auto">
                            <BsChevronDown />
                          </span>
                        </a>
                      )}
                    </div>
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
                                  <Link
                                    href={`/category/${child_category.slug}`}
                                    className="nav-link px-3"
                                  >
                                    <span className="me-2">
                                      {child_category.image ? (
                                        <CustomImage
                                          height={20}
                                          width={20}
                                          src={`${child_category.image_url}`}
                                        />
                                      ) : (
                                        <BsLayoutSplit />
                                      )}
                                    </span>
                                    <span>{child_category.name}</span>
                                  </Link>
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
