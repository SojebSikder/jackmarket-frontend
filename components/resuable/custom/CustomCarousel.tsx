import React from "react";
import { Carousel } from "react-bootstrap";
import CustomImage from "./CustomImage";

export default function CustomCarousel({ images }: { images: any[] }) {
  return (
    <Carousel>
      {images.map((image) => {
        return (
          <Carousel.Item key={image.id}>
            <CustomImage
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
