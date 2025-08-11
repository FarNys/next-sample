// public/sw.js

import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate, CacheFirst } from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";
import { precacheAndRoute } from "workbox-precaching";
import { clientsClaim, skipWaiting } from "workbox-core";

// This will be replaced by the list of assets to precache by Workbox
precacheAndRoute(self.__WB_MANIFEST);
//THIS WILL CACHE THE PAGE, IF YOU DONT PUT PAGE INSIDE THIS LIST IT SHOW THAT LITTLE DINOSAUR
//AFTER YOU ENTER THE PAGE NOW YOU CAN CHECK IF YOUR API RESULT CACHED BY SW OR NOT
precacheAndRoute(["/ai-chat", "api-sample"]);

skipWaiting();
clientsClaim();

// Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
registerRoute(
  ({ url }) => url.origin === "https://fonts.googleapis.com",
  new StaleWhileRevalidate({
    cacheName: "google-fonts-stylesheets",
  })
);

// Cache the underlying font files with a cache-first strategy for 1 year.
registerRoute(
  ({ url }) => url.origin === "https://fonts.gstatic.com",
  new CacheFirst({
    cacheName: "google-fonts-webfonts",
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

//THIS WILL CACHE THE RESULT OF ALL API COMING FROM "https://jsonplaceholder.typicode.com", BUT IT ONLY WORKS IF YOU PRECACHE THE PAGE THAT CONSIST THIS API CALL UNLESS IF YOU REFRESH THE PAGE THE PAGE WONT LOAD SO YOU CANT SEE CACHED DATA!
registerRoute(
  ({ url }) => url.origin.startsWith("https://jsonplaceholder.typicode.com"),

  new StaleWhileRevalidate({
    cacheName: "next-workbox-api-cache",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50, // Only cache 50 requests
        maxAgeSeconds: 60 * 60 * 24 * 7, // Cache for a week
      }),
    ],
  })
);
