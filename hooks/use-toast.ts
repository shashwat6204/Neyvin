// hooks/use-toast.ts

import { toast } from "sonner";

type ToastData = {
  type?: "success" | "error" | "warning" | "info";
  title?: string;
  description?: string;
};

export function useToast() {
  return {
    toast: (message: string | { title?: string; description?: string }, data?: ToastData) => {
      const options = typeof message === "object" ? message : { description: message };
      
      if (data?.type === "success") {
        toast.success(options.description || "", {
          ...(options.title && { title: options.title })
        });
      } else if (data?.type === "error") {
        toast.error(options.description || "", {
          ...(options.title && { title: options.title })
        });
      } else if (data?.type === "warning") {
        toast.warning(options.description || "", {
          ...(options.title && { title: options.title })
        });
      } else if (data?.type === "info") {
        toast.info(options.description || "", {
          ...(options.title && { title: options.title })
        });
      } else {
        toast(options.description || "", {
          ...(options.title && { title: options.title })
        });
      }
    },
  };
}
