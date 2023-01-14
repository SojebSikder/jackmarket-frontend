import Link from "next/link";
import React from "react";

export default function Footer({ footerData }: { footerData: any }) {
  return (
    <footer
      style={{
        height: "293px",
        marginTop: "150px",
      }}
      className="p-4"
    >
      <div className="row justify-content-center">
        {footerData.map((footer: any) => {
          return (
            <div
              key={footer.id}
              style={{ fontSize: "20px", color: "var(--secondary-color)" }}
              className="col fw-bold"
            >
              {footer.name}
              {footer.items.length > 0 ? (
                <div
                  style={{
                    fontSize: "16px",
                    color: "var(--secondary-color)",
                  }}
                  className="fw-normal"
                >
                  {footer.items.map((item: any) => {
                    return (
                      <div key={item.id}>
                        <Link
                          style={{
                            color: "var(--secondary-color)",
                            textDecoration: "none",
                          }}
                          href={`${item.link}`}
                        >
                          {item.name}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <></>
              )}
            </div>
          );
        })}
      </div>
    </footer>
  );
}
