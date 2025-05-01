"use client";

import AccessibleDialogForm from "@/components/accible-dialog-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import StarRatings from "react-star-ratings";
import { createReviewAction, updateReviewAction } from "../actoins";
import { Review } from "@prisma/client";
import { Checkbox } from "@/components/ui/checkbox";

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
export const UpdateReviewForm = ({ review }: { review: Review }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(review.rating); // ← track rating
  const [accepted, setAccepted] = useState(!!review?.accepted);

  useEffect(() => {
    // Make sure state updates when review?.accepted changes
    setAccepted(!!review?.accepted);
  }, [review?.accepted]);

  return (
    <AccessibleDialogForm
      submit="تحديث تقييم"
      open={open}
      setOpen={setOpen}
      dontReplace
      trigger={<button>تحديث تقييم</button>}
      action={updateReviewAction}
      title="تحديث تقييم"
    >
      <Input type="hidden" name="id" value={review.id} />
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
            defaultValue={review.fullName}
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
            defaultValue={review?.comment ?? ""}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="accepted">تم القبول؟</Label>
          <Checkbox
            name="accepted"
            id="accepted"
            checked={accepted}
            onCheckedChange={(value) => setAccepted(!!value)}
          />
        </div>
      </div>
    </AccessibleDialogForm>
  );
};
