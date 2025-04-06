"use client";

import AccessibleDialogForm from "@/components/accible-dialog-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import StarRatings from "react-star-ratings";
import { createReviewAction } from "../actoins";

export const WriteReviewForm = ({ productId }: { productId: string }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(4.9); // ← track rating

  return (
    <AccessibleDialogForm
      submit="كتابة تقييم"
      open={open}
      setOpen={setOpen}
      dontReplace
      trigger={<Button>كتابة تقييم</Button>}
      action={createReviewAction}
      title="كتابة تقييم"
    >
      <Input type="hidden" name="productId" value={productId} />
      <Input type="hidden" name="rating" value={rating} />{" "}
      {/* ← submit rating */}
      <div className="grid gap-4 py-2">
        <div className="grid gap-2">
          <Label>تقييمك</Label>
          <StarRatings
            rating={rating}
            starRatedColor="gold"
            starHoverColor="orange"
            changeRating={setRating} // ← enable editing
            numberOfStars={5}
            name="rating-display"
            starDimension="30px"
            starSpacing="5px"
          />
        </div>

        <div>
          <Label htmlFor="fullName">اسمك</Label>
          <Input
            type="text"
            name="fullName"
            id="fullName"
            placeholder="أدخل اسمك"
            required
          />
        </div>

        <div>
          <Label htmlFor="comment">وصف المنتج</Label>
          <Textarea
            name="comment"
            id="comment"
            placeholder="أدخل وصف المنتج"
            required
            dir="rtl"
          />
        </div>
      </div>
    </AccessibleDialogForm>
  );
};
