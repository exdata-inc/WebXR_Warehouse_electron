"use client";

import Script from 'next/script';

import { Inter } from "next/font/google";
import "./globals.css";
import CSR from '@/components/CSR';
import ViewerStateProvider from '@/providers/ViewerStateContext';
import BookmarkProvider from '@/providers/BookmarkContext';


const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "WebXR Warehouse",
//   description: "Developed by UCLab/Nobuo Kawaguchi",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="jp">
      <head>
        <Script src="http://localhost:8097"></Script>
        <title>WebXR Warehouse</title>
      </head>
      <body
        className={inter.className}
      >
        <CSR>
          <ViewerStateProvider>
            <BookmarkProvider>
              {children}
            </BookmarkProvider>
          </ViewerStateProvider>
        </CSR>
      </body>
    </html>
  );
}
