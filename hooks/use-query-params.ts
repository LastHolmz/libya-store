"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

export default function useQueryParam() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const scrollPosition = useRef(0);

  // Save the current scroll position before the URL changes
  useEffect(() => {
    const handleRouteChangeStart = () => {
      scrollPosition.current = window.scrollY;
    };

    const handleRouteChangeComplete = () => {
      window.scrollTo(0, scrollPosition.current);
    };

    const handleRouteChangeError = () => {
      window.scrollTo(0, scrollPosition.current);
    };

    // Attach event listeners
    window.addEventListener("beforeunload", handleRouteChangeStart);
    window.addEventListener("load", handleRouteChangeComplete);
    window.addEventListener("error", handleRouteChangeError);

    return () => {
      // Clean up event listeners
      window.removeEventListener("beforeunload", handleRouteChangeStart);
      window.removeEventListener("load", handleRouteChangeComplete);
      window.removeEventListener("error", handleRouteChangeError);
    };
  }, []);

  /**
   * Deletes specified query parameters from the URL.
   * @param keys - Array of query parameter keys to delete.
   */
  const deleteQueryParam = useCallback(
    (keys: string[]) => {
      const params = new URLSearchParams(searchParams?.toString() || "");

      keys.forEach((key) => {
        params.delete(key);
      });

      replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, pathname, replace]
  );

  /**
   * Sets or updates specified query parameters in the URL.
   * @param values - Array of key-value pairs for query parameters to set.
   */
  const setQueryParam = useCallback(
    (values: { key: string; value: string | null }[]) => {
      const params = new URLSearchParams(searchParams?.toString() || "");

      values.forEach(({ key, value }) => {
        if (value !== null) {
          params.set(key, value);
        }
      });

      replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, pathname, replace]
  );

  /**
   * Toggles a query parameter in the URL.
   * If the parameter exists, it will be removed. Otherwise, it will be added.
   * @param key - The key of the query parameter to toggle.
   * @param value - The value to set if the parameter is added.
   */
  const toggleParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString() || "");
      const currentValue = params.get(key);

      if (currentValue === value) {
        params.delete(key);
      } else {
        params.set(key, value);
      }

      replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, pathname, replace]
  );

  return {
    setQueryParam,
    deleteQueryParam,
    toggleParam,
  };
}
