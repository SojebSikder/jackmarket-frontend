import styles from "../styles/Home.module.css";
import { Alert, Button, Container, Tab, Tabs } from "react-bootstrap";
import Navbar from "../../components/partial/header/Navbar";
import Sidebar from "../../components/partial/sidebar/Sidebar";
import ProductCard from "../../components/resuable/product/ProductCard";
import { getSetting, getSettingValue } from "../../utils/Setting";
import { ProductService } from "../../service/product/product.service";
import { CategoryService } from "../../service/category/category.service";
import Footer from "../../components/partial/footer/Footer";
import { FooterService } from "../../service/page/footer.service";
import Main from "../../components/partial/Main";
import CustomCarousel from "../../components/resuable/custom/CustomCarousel";
import CustomButton from "../../components/resuable/custom/CustomButton";
import Meta from "../../components/partial/header/Meta";
import { CartHelper, CartMeta } from "../../helper/cart.helper";
import { BiMinus, BiPlus } from "react-icons/bi";
import QuantityButton from "../../components/resuable/product/QuantityButton";
import { useEffect, useReducer, useState } from "react";
import CustomToast from "../../components/resuable/custom/CustomToast";
import { AppConfig } from "../../config/app.config";
import { useRouter } from "next/router";

export const getServerSideProps = async (context: any) => {
  const { req, query, res, asPath, pathname } = context;

  const settings = await getSetting();

  const footerService = await FooterService.findAll();
  const footerData = footerService.data;

  const cartData = await CartHelper.cartData(context);
  return {
    props: {
      footerData: footerData,
      settings: settings,
      host: req.headers.host,
      cartData: cartData,
    },
  };
};

export default function Index({
  footerData,
  settings,
  host,
  cartData,
}: {
  footerData: any;
  settings: any;
  host: string;
  cartData: CartMeta;
}) {
  const router = useRouter();
  const [cartMeta, setCartMeta] = useState({ subtotal: cartData.subtotal });
  const [carts, setCarts] = useState(cartData.data);
  const [isUpdateQuantity, setIsUpdateQuantity] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const handleShowToast = () => {
    setShowToast(true);
  };
  const handleCloseToast = () => {
    setShowToast(false);
  };

  const _cartUpdateState = (product_id: number) => {
    setIsUpdateQuantity(product_id);
  };

  const increaseQuantity = (product_id: number) => {
    _cartUpdateState(product_id);
    setCarts((prev) => {
      return prev.map((cart) => {
        if (cart.product_id == product_id) {
          return { ...cart, quantity: cart.quantity + 1 };
        } else {
          return cart;
        }
      });
    });
  };
  const decreaseQuantity = (product_id: number) => {
    _cartUpdateState(product_id);
    setCarts((prev) => {
      return prev.map((cart) => {
        if (cart.product_id == product_id) {
          if (cart.quantity <= 0) {
            return { ...cart, quantity: 0 };
          } else {
            return { ...cart, quantity: cart.quantity - 1 };
          }
        } else {
          return cart;
        }
      });
    });
  };

  const updateCart = async (id: number, quantity: number) => {
    CartHelper.update(id, quantity);
    // hide the save button
    _cartUpdateState(0);

    const updatedCart = await CartHelper.cartData();

    if (updatedCart) {
      setCarts(updatedCart.data);
      setCartMeta({ subtotal: updatedCart.subtotal });
      handleShowToast();
    }
  };

  const subtotalCost = () => {
    return cartMeta.subtotal;
  };
  const totalCost = () => {
    return subtotalCost();
  };

  const handleCheckout = () => {
    router.push(`/checkout-info`);
  };

  return (
    <>
      <Meta
        title={`Shopping cart - ${getSettingValue("name", settings)}`}
        description={`${getSettingValue("meta_description", settings)}`}
        keyword={`${getSettingValue("meta_keyword", settings)}`}
        url={`${host}/cart`}
        domain={host}
      />
      <Navbar />
      <Main>
        <Container>
          <CustomToast show={showToast} onClose={handleCloseToast}>
            Cart updated successfully
          </CustomToast>
          <div className="row">
            <div className="col">
              <div style={{ fontSize: "32px", fontWeight: "bold" }}>
                Shopping cart
              </div>
              <div className="mt-4">
                <CustomButton>Delivery</CustomButton>
              </div>
              <div className="d-flex mt-4">
                <div className="me-4">
                  <table className="table">
                    <thead className="table-light">
                      <tr>
                        <th>Your items ({carts.length})</th>
                        <th>Quantity</th>
                        <th>Item price</th>
                        <th>Items total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {carts.map((cart: any) => {
                        return (
                          <tr key={cart.id}>
                            <td>{cart.product.name}</td>
                            <td>
                              <div className="d-flex">
                                <QuantityButton
                                  onDecrease={() =>
                                    decreaseQuantity(cart.product_id)
                                  }
                                  onIncrease={() =>
                                    increaseQuantity(cart.product_id)
                                  }
                                  value={cart.quantity}
                                />
                                {isUpdateQuantity == cart.product_id ? (
                                  <div style={{ marginLeft: "10px" }}>
                                    <CustomButton
                                      onClick={(e) =>
                                        updateCart(cart.id, cart.quantity)
                                      }
                                    >
                                      Save
                                    </CustomButton>
                                  </div>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </td>
                            <td>{cart.product.price}</td>
                            <td>{cart.subtotal}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div>
                  <div
                    className="p-4"
                    style={{
                      borderRadius: "5px",
                      background: "#F8F8F8",
                      width: "381px",
                    }}
                  >
                    <div className="d-flex justify-content-between">
                      <div>
                        <span className="fw-bold">Subtotal</span>
                      </div>
                      <div>
                        <span className="fw-bold">{totalCost()}</span>
                      </div>
                    </div>
                    {/* <div className="d-flex justify-content-between">
                      <div>
                        <span>Delivery fee</span>
                      </div>
                      <div>
                        <span>$1.00</span>
                      </div>
                    </div> */}
                    <hr />
                    <div className="d-flex justify-content-between">
                      <div>
                        <span className="fw-bold">Total</span>
                      </div>
                      <div>
                        <span className="fw-bold">{totalCost()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <CustomButton
                      onClick={handleCheckout}
                      style={{ width: "100%", height: "54px" }}
                    >
                      Checkout
                    </CustomButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
        <Footer footerData={footerData} />
      </Main>
    </>
  );
}
