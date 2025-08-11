"use client";

import { useEffect } from "react";

export default function RegisterSW() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw-injected.js")
        .then((registration) => {
          console.log("Service Worker registered: ", registration);
        })
        .catch((registrationError) => {
          console.log(
            "Service Worker registration failed: ",
            registrationError
          );
        });
    }
  }, []);

  return null;
}
