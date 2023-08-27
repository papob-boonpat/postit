import Nav from "./auth/Nav";
import QueryWrapper from "./auth/QueryWrapper";
import "./globals.css";
import { Roboto } from "next/font/google";
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`mx-4 md:mx-48 xl:mx96 bg-gray-50 ${roboto.className}`}>
        <QueryWrapper>
          <Nav />
          {children}
        </QueryWrapper>
      </body>
    </html>
  );
}
