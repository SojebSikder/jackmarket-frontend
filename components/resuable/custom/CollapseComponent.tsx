import Link from "next/link";
import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";

export function CollapseComponent({
  title,
  children,
}: {
  title: any;
  children?: any;
}) {
  const [show, setShow] = useState(false);
  const handleCollapse = () => {
    setShow((prev) => !prev);
  };
  return (
    <li className="nav-link px-3 sidebar-link">
      {title}
      <span onClick={handleCollapse} className="right-icon ms-auto">
        <BsChevronDown />
      </span>

      <ul className={`navbar-nav ps-3 collapse ${show ? "show" : ""}`}>
        {children}
      </ul>
    </li>
  );
}

export function CollapseItem({ children }: { children?: any }) {
  return <li className="nav-link px-3">{children}</li>;
}
