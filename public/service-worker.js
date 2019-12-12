/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "android-chrome-192x192.png",
    "revision": "24d41bc4773fb825f9d1d658359753a2"
  },
  {
    "url": "android-chrome-512x512.png",
    "revision": "8e8edd7ffdd2641931d08808252e1e06"
  },
  {
    "url": "apple-touch-icon.png",
    "revision": "a0a868feb2e096bea1f557944d4e13d4"
  },
  {
    "url": "bundle.css",
    "revision": "64ad721446e473d62c3fd84e76b1f553"
  },
  {
    "url": "eovalue.png",
    "revision": "1a7f2881eac95aa37d161b8cc4970941"
  },
  {
    "url": "favicon-16x16.png",
    "revision": "8393c9bd8a2700a47dcc63c4e26896a9"
  },
  {
    "url": "favicon-32x32.png",
    "revision": "cd65108bf34275d5b7b08e3c031f064f"
  },
  {
    "url": "gauge20.png",
    "revision": "b27d9e432603a879f790ba546f859deb"
  },
  {
    "url": "global.css",
    "revision": "11dc6ce03ddb33795b2b68b7c8a66058"
  },
  {
    "url": "index.html",
    "revision": "f7a4ae65821e97e3a3bbd89a7dfda2e1"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
