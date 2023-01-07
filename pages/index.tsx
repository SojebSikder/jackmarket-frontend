import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Alert, Button } from "react-bootstrap";
import Container from "../components/resuable/layout/Container";
import Navbar from "../components/header/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Container>
        <Button variant="primary">Primary</Button>
        {[
          "primary",
          "secondary",
          "success",
          "danger",
          "warning",
          "info",
          "light",
          "dark",
        ].map((variant) => (
          <Alert key={variant} variant={variant}>
            This is a {variant} alert—check it out!
          </Alert>
        ))}
      </Container>
    </>
  );
}
