"use client";

import { SessionProvider } from "next-auth/react";
import * as React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToastContainer />
      <SessionProvider>{children}</SessionProvider>;{" "}
    </>
  );
}
