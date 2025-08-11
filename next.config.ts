import WorkboxPlugin from "workbox-webpack-plugin";
import path from "path";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, { isServer, dev }) => {
    if (!isServer && !dev) {
      config.plugins.push(
        new WorkboxPlugin.InjectManifest({
          swSrc: path.join(process.cwd(), "public", "sw.js"),
          swDest: path.join(process.cwd(), "public", "sw-injected.js"),
          // You can add more configurations here
          exclude: [
            // Exclude common build artifacts
            /app-build-manifest\.json$/,
            /build-manifest\.json$/,
            /_next\.js$/,
            /react-loadable-manifest\.json$/,
            /_middleware-manifest\.json$/,
            /\.map$/, // Exclude all source maps

            // Exclude all files related to the _not-found and _error pages
            // These are known to cause 404 errors during precaching because they are not
            // always present as static client-side assets.
            /_next\/server\/app\/_not-found\/.*/,
            /_next\/server\/app\/_error\/.*/,

            // A more generic pattern to catch various client-reference manifests that might be causing issues
            /client-reference-manifest\.js$/,
            // The specific file causing the previous error (now redundant but kept for clarity)
            /_next\/server\/app\/_not-found\/page_client-reference-manifest\.js$/,

            // The specific file causing the error
            /_next\/server\/app\/_not-found\/page_client-reference-manifest\.js$/,
            /-manifest\.(js|json)$/,
          ],
        })
      );
    }
    return config;
  },
  /* config options here */
};

export default nextConfig;
