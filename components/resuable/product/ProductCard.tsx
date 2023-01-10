import Image from "next/image";
import React from "react";
import CustomImage from "../CustomImage";

export default function ProductCard({
  name,
  image,
}: {
  name: string;
  image: string;
}) {
  return (
    <>
      <div style={{ width: "115px", height: "183px", margin: "7px" }}>
        <div>
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
                left: "20px",
                top: "1px",
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "10px",
                letterSpacing: 0,
              }}
            >
              -70%
            </span>
            <span
              style={{
                color: "white",
                width: "26px",
                height: "8px",
                position: "absolute",
                left: "8px",
                top: "12px",
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "14px",
                letterSpacing: "0",
              }}
            >
              0.22€
            </span>
            <span
              style={{
                color: "#e9d7d8",
                width: "14px",
                height: "4px",
                position: "absolute",
                left: "10px",
                top: "35px",
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "10px",
                letterSpacing: "0",
                textDecorationLine: "line-through",
              }}
            >
              0.72€
            </span>
          </div>
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
        <div>
          <span style={{ fontSize: "12px" }}>€1.32</span>
          <span
            style={{
              color: "#787878",
              fontSize: "12px",
              textDecorationLine: "line-through",
            }}
          >
            {" "}
            €1.89
          </span>
        </div>
        <div style={{ fontSize: "12px", fontWeight: "bold" }}>{name}</div>
        <div style={{ fontSize: "10.4px" }}>€24.00 / 1kg</div>
      </div>
    </>
  );
}
