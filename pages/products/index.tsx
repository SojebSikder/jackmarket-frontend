import styles from "../styles/Home.module.css";
import { Alert, Button, Container } from "react-bootstrap";
import Navbar from "../../components/header/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import ProductCard from "../../components/resuable/product/ProductCard";


export default function Home() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <main>
        <Container>
          <ProductCard />
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
      </main>
    </>
  );
}
