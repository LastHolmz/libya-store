import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface Props {
  open: boolean | undefined;
  setOpen?: Dispatch<SetStateAction<boolean | undefined>>;
}

const Loading = ({ open, setOpen }: Props) => {
  return (
    <Dialog open={open ?? true} onOpenChange={setOpen}>
      <DialogContent className="sm:w-full w-[90%] py-10 rounded-md">
        {/* Accessible title */}
        <DialogTitle className="hidden">
          <VisuallyHidden>Loading</VisuallyHidden>
        </DialogTitle>
        {/* Accessible description */}
        <DialogDescription>
          <VisuallyHidden>
            The application is currently processing your request. Please wait.
          </VisuallyHidden>
        </DialogDescription>
        <div className="mx-auto grid gap-2 w-fit">
          <div className="loader mx-auto"></div>
          {/* <AiOutlineLoading3Quarters className="spin-animation mx-auto w-12 h-12 text-primary" /> */}
          <span className="block text-center text-primary mt-10">
            جاري التحميل ...
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Loading;
