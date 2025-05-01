"use client";
import { toast } from "@/hooks/use-toast";
import { ReactNode, useActionState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import SubmitButton from "./submit-button";

type Action = (
  prevState: { message: string },
  formData: FormData
) => Promise<{ message: string }>;

interface Props {
  action: Action;
  className?: string;
  children: ReactNode;
  success?: string;
  replaceLink?: string;
  dontReplace?: boolean;
  submitText?: ReactNode | string;
  submitClass?: string;
  onSuccessEvent?: () => void;
}

const Form = ({
  action,
  className,
  children,
  success = "تمت العملية بنجاح",
  replaceLink = "/",
  dontReplace = false,
  submitText = "تم",
  submitClass,
  onSuccessEvent,
}: Props) => {
  const router = useRouter();
  const [msg, dispatch, pending] = useActionState(action, { message: "" });

  useEffect(() => {
    if (!msg.message) return;

    toast({ title: msg.message });

    if (msg.message === success) {
      if (onSuccessEvent) onSuccessEvent();
      if (!dontReplace) router.replace(replaceLink);
    }
  }, [msg, success, replaceLink, dontReplace, router]);

  return (
    <form action={dispatch} className={cn(className)}>
      {children}
      <SubmitButton className={cn(submitClass)} pending={pending}>
        {submitText}
      </SubmitButton>
    </form>
  );
};

export default Form;
