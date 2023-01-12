import styles from "../styles/Home.module.css";
import { Container } from "react-bootstrap";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Container>
        <Link className="btn btn-primary" href="/products">
          Products
        </Link>
      </Container>
    </>
  );
}
