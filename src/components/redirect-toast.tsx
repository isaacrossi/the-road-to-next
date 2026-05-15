// We could make this a custom hook, but since it would have to be called in our layout.tsx,
// the layout would become a client component. This would prevent us from using server-side
// features in the layout and increase the amount of JavaScript sent to the browser.
// By using a component, we keep the layout as a Server Component.
"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { deleteCookieByKey, getCookieByKey } from "@/src/actions/cookies";

// component used to show toast on redirect
const RedirectToast = () => {
  useEffect(() => {
    const showCookieToast = async () => {
      const message = await getCookieByKey("toast");

      if (message) {
        toast.success(message);
        await deleteCookieByKey("toast");
      }
    };

    showCookieToast();
  }, []);

  return null;
};

export { RedirectToast };
