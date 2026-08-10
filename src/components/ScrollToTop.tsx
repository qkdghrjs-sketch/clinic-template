"use client";

import { useEffect } from "react";

export default function ScrollToTop() {
  useEffect(() => {
    history.scrollRestoration = "manual";
    if (window.location.hash) history.replaceState(null, "", window.location.pathname + window.location.search);
    window.scrollTo(0, 0);
  }, []);

  return null;
}
