import "@/styles/global.css";
import { color } from "@/styles/color";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Todo & Diary",
  description: "Todo & Diary",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        style={{
          background: color.gray,
          display: "flex",

          justifyContent: "center",

          overflow: "hidden",
          height: "100vh",
        }}
      >
        {children}
      </body>
    </html>
  );
}
