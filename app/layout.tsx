import type { Metadata } from "next";
import { Inter, Lacquer } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { AuthProvider } from "./context/Authcontext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const lacquer = Lacquer({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-lacquer",
});

export const metadata: Metadata = {
  title: "Stage Stories",
  description:
    "Capture the energy, unforgettable vibes, and magic of live music",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${lacquer.variable} antialiased`}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col bg-[#020C11]">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
