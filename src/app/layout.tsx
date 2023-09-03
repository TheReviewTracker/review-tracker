import { ReactNode } from "react";
import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Review Tracker",
  description: "Review Tracker",
};

interface IProps {
  children: ReactNode;
}

const RootLayout = ({ children }: IProps) => {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
