import type { Metadata } from "next";
import { Jost, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { CarrinhoProvider } from "@/lib/CarrinhoContext";
import { AuthProvider } from "@/lib/AuthContext";
import Navbar from "@/components/Navbar";

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "Ultra V | Ótica Premium",
  description: "Óculos de grau, sol e armações premium.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${jost.variable} ${cormorant.variable}`}>
        <AuthProvider>
          <CarrinhoProvider>
            <Navbar />
            {children}
          </CarrinhoProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
