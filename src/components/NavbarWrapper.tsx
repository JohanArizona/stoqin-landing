"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

const NavbarContent = dynamic(() => import("./Navbar"), {
  ssr: false,
  loading: () => <div className="h-16" />, // Placeholder while loading
});

export default function NavbarWrapper() {
  return (
    <Suspense fallback={<div className="h-16" />}>
      <NavbarContent />
    </Suspense>
  );
}
