import React from "react";
import { Carousel } from "react-bootstrap";
import CustomImage from "./CustomImage";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";

export default function CustomCarousel({ images }: { images: any[] }) {
  return (
    <Carousel
      prevIcon={<BsChevronLeft style={{ color: "black" }} />}
      nextIcon={<BsChevronRight style={{ color: "black" }} />}
    >
      {images.map((image) => {
        return (
          <Carousel.Item key={image.id}>
            <CustomImage
              style={{ objectFit: "contain" }}
              className="d-block w-100"
              src={image.image_url}
              alt={`${image.alt_text}`}
              width={458}
              height={415}
            />
            {/* <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption> */}
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}
