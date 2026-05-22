// We could make this a custom hook, but since it would have to be called in our layout.tsx,
// the layout would become a client component. This would prevent us from using server-side
// features in the layout and increase the amount of JavaScript sent to the browser.
// By using a component, we keep the layout as a Server Component.
"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { consumeCookieByKey } from "@/actions/cookies";

// component used to show toast on redirect
const RedirectToast = () => {
  const pathname = usePathname();

  useEffect(() => {
    const showCookieToast = async () => {
      const message = await consumeCookieByKey("toast");

      if (message) {
        toast.success(message);
      }
    };

    showCookieToast();
  }, [pathname]);

  return null;
};

export { RedirectToast };
