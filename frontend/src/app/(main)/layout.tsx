import MainLayout from "@/core/layout/MainLayout";
import React from "react";

const NormalLayout = ({ children }: { children?: React.ReactNode }) => {
  return <MainLayout>{children}</MainLayout>
};

export default NormalLayout;