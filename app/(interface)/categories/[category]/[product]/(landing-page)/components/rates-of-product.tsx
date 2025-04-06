"use client";

import dynamic from "next/dynamic";
import React, { Suspense } from "react";
// import StarRatings from "react-star-ratings";
const StarRatings = dynamic(() => import("react-star-ratings"), { ssr: false });

const RatesOfProduct = ({
  rating,
  sizeOfStar = "24px",
}: {
  rating: number;
  sizeOfStar?: string;
}) => {
  return (
    <div dir="rtl">
      <Suspense
        fallback={
          <StarRatings
            rating={5}
            starRatedColor="gold"
            numberOfStars={5}
            name="rating"
            starDimension="30px" // ← size
            starSpacing="4px" // ← spacing
          />
        }
      >
        <StarRatings
          rating={rating}
          starRatedColor="gold"
          numberOfStars={5}
          name="rating"
          starDimension={sizeOfStar} // ← change this to resize
          starSpacing="4px"
        />
      </Suspense>
    </div>
  );
};

export default RatesOfProduct;
