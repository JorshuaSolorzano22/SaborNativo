import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/hooks/useCart";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sabor Nativo",
  description: "Productos gourmet artesanales",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <CartProvider> {}
          {children}
        </CartProvider>
      </body>
    </html>
  );
}