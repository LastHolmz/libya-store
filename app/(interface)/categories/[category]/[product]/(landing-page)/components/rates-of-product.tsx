"use client";

import dynamic from "next/dynamic";
import React, { Suspense } from "react";
const StarRatings = dynamic(() => import("react-star-ratings"), { ssr: false });

const RatesOfProduct = ({
  rating,
  sizeOfStar = "24px",
}: {
  rating: number;
  sizeOfStar?: string;
}) => {
  return (
    <div dir="ltr">
      <div style={{ transform: "scaleX(-1)", display: "inline-block" }}>
        <Suspense
          fallback={
            <StarRatings
              rating={5}
              starRatedColor="gold"
              numberOfStars={5}
              name="rating"
              starDimension="30px"
              starSpacing="4px"
            />
          }
        >
          <StarRatings
            rating={rating}
            starRatedColor="gold"
            numberOfStars={5}
            name="rating"
            starDimension={sizeOfStar}
            starSpacing="4px"
          />
        </Suspense>
      </div>
    </div>
  );
};

export default RatesOfProduct;
