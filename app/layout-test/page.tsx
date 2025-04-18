"use client";
import React from "react";
import dynamic from "next/dynamic";
const ClientPage = dynamic(() => import("./ClientPage"), { ssr: false });
const LayoutTestPage = () => {
  return <ClientPage />;
};

export default LayoutTestPage;
