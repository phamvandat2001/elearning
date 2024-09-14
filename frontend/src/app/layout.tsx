import type { Metadata } from "next";
import "@/core/style/globals.css";

export const metadata: Metadata = {
  title: "Elearning",
  description: "Elearning description",
};

type RootLayoutProps = Readonly<{ children: React.ReactNode; }>

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
