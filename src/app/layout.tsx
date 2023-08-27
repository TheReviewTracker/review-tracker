import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";

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
