import { Review } from "@prisma/client";
import React from "react";
import RatesOfProduct from "./rates-of-product";
import { parseDateWithArabicMonth } from "@/lib/date";

const ReviewCard = ({ review }: { review: Review }) => {
  return (
    <div
      dir="rtl"
      className="py-7 shadow-md border-secondary items-center border max-w-sm phone-only:w-full px-8 rounded-[20px]"
    >
      <div className="mb-4">
        <RatesOfProduct sizeOfStar="20px" rating={review.rating} />
      </div>
      <span className="font-semibold block mb-3 text-xl">
        {review.fullName}
      </span>
      <p className="text-foreground/80 mb-6">{review.comment}</p>
      <span className="text-sm text-foreground/80">
        تم النشر {parseDateWithArabicMonth(new Date(review.createdAt))}
      </span>
    </div>
  );
};

export default ReviewCard;
