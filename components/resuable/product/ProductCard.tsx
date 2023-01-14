import Image from "next/image";
import Link from "next/link";
import React from "react";
import { StringHelper } from "../../../helper/string.helper";
import CustomImage from "../custom/CustomImage";

export default function ProductCard({
  id,
  slug,
  name,
  image,
  is_sale,
  discount,
  price,
  currency_sign,
}: {
  id: number;
  slug: string;
  name: string;
  image: string;
  is_sale: boolean;
  discount: number;
  price: number;
  currency_sign: string;
}) {
  return (
    <>
      <div style={{ width: "130px", height: "183px", margin: "7px" }}>
        <div>
          {/* discount badge */}
          {is_sale ? (
            <div
              style={{
                width: "50px",
                height: "30px",
                position: "absolute",
                marginLeft: "45px",
              }}
            >
              <div
                style={{
                  backgroundColor: "var(--primary-color)",
                  width: "40px",
                  height: "50px",
                  position: "absolute",
                  left: "7px",
                  top: "0px",
                  transform: "skew(-20deg)",
                }}
              ></div>
              <div
                style={{
                  backgroundColor: "#002855",
                  width: "45px",
                  height: "20px",
                  position: "absolute",
                  left: "0px",
                  top: "15px",
                  transform: "skew(-20deg)",
                }}
              ></div>
              <span
                style={{
                  color: "white",
                  width: "20px",
                  height: "7px",
                  position: "absolute",
                  left: "15px",
                  top: "1px",
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: "10px",
                  letterSpacing: 0,
                }}
              >
                -{discount}%
              </span>
              <span
                style={{
                  color: "white",
                  width: "26px",
                  height: "8px",
                  position: "absolute",
                  left: "8px",
                  top: "14px",
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: "14px",
                  letterSpacing: "0",
                }}
              >
                {StringHelper.discount(price, discount)}
                {currency_sign}
              </span>
              <span
                style={{
                  color: "#e9d7d8",
                  width: "14px",
                  height: "4px",
                  position: "absolute",
                  left: "7px",
                  top: "35px",
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: "10px",
                  letterSpacing: "0",
                  textDecorationLine: "line-through",
                }}
              >
                {price}
                {currency_sign}
              </span>
            </div>
          ) : (
            <></>
          )}
          {/* end discount badge */}

          <div
            style={{
              position: "absolute",
              marginLeft: "72px",
              marginTop: "70px",
              background: "var(--primary-color)",
              height: "26px",
              width: "26px",
              borderRadius: "4px",
            }}
          >
            <Image
              src="/assets/icon/add-to-cart.png"
              style={{
                marginLeft: "4px",
              }}
              height={18}
              width={18}
              alt="cart"
            />
          </div>

          <CustomImage src={`${image}`} alt="" />
        </div>
        {/* <div>
          <span style={{ fontSize: "12px" }}>{currency_sign}1.32</span>
          <span
            style={{
              color: "#787878",
              fontSize: "12px",
              textDecorationLine: "line-through",
            }}
          >
            {" "}
            {currency_sign}1.89
          </span>
        </div> */}
        <Link
          style={{ textDecoration: "none", color: "black" }}
          href={`/products/${id}/${slug}`}
        >
          <div style={{ fontSize: "14px", fontWeight: "bold" }}>
            {StringHelper.textShorten(name, 26)}
          </div>
        </Link>
        {/* <div style={{ fontSize: "10.4px" }}>{currency_sign}24.00 / 1kg</div> */}
        <div>
          {currency_sign}
          {is_sale ? StringHelper.discount(price, discount) : price}
        </div>
      </div>
    </>
  );
}
