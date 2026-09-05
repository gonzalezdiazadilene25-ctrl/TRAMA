import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TRAMA — Ingeniería Textil ESIT-IPN",
  description:
    "Temario, Repaso y Aprendizaje Modular Asistido para Ingeniería Textil, Plan 2018, ESIT-IPN.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-trama-hueso text-trama-texto font-sans">
        <header className="border-b border-trama-gris/20 bg-trama-hueso">
          <div className="mx-auto max-w-3xl px-4 py-4">
            <Link href="/" className="text-xl font-bold tracking-tight text-trama-indigo">
              TRAMA
            </Link>
          </div>
        </header>
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
