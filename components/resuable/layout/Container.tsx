import React from "react";
import { Container as BsContainer } from "react-bootstrap";

export default function Container({ children }: { children: any }) {
  return <BsContainer>{children}</BsContainer>;
}
