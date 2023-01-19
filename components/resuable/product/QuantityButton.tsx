import React, { MouseEventHandler } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";

export default function QuantityButton({
  onDecrease,
  onIncrease,
  value = 0,
}: {
  onDecrease?: MouseEventHandler;
  onIncrease?: MouseEventHandler;
  value?: number;
}) {
  return (
    <div className="d-flex">
      <button
        onClick={onDecrease}
        style={{
          height: "32px",
          backgroundColor: "white",
          border: "1px solid #CCCCCC",
          borderTopLeftRadius: "5px",
          borderBottomLeftRadius: "5px",
          color: "var(--primary-color)",
        }}
      >
        <BiMinus />
      </button>
      <div
        style={{
          height: "32px",
          textAlign: "center",
          width: "32px",
          color: "white",
          backgroundColor: "var(--primary-color)",
        }}
      >
        <div style={{ marginTop: "4px" }}>{value}</div>
      </div>
      <button
        onClick={onIncrease}
        style={{
          height: "32px",
          backgroundColor: "white",
          border: "1px solid #CCCCCC",
          borderTopRightRadius: "5px",
          borderBottomRightRadius: "5px",
          color: "var(--primary-color)",
        }}
      >
        <BiPlus />
      </button>
    </div>
  );
}
