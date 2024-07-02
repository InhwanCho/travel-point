"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

export default function Toaster() {
  const { toasts } = useToast();

  return (
    //ToastProvider 제거
    <>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          // duration 변경
          <Toast key={id} {...props} duration={3000}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </>
  );
}
