import type { Metadata } from "next";
import { Sora, Bebas_Neue, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Metall Form | Engenharia Aplicada à Produção Industrial",
  description:
    "Soluções industriais em perfilamento contínuo, automação e integração de processos. Especialista em linha de produção de alta performance.",
  keywords:
    "perfiladeiras, roll forming, automação industrial, linhas de perfilamento, estampagem, corte, NR-12",
  openGraph: {
    title: "Metall Form | Engenharia Aplicada à Produção Industrial",
    description:
      "Soluções industriais em perfilamento contínuo, automação e integração de processos.",
    url: "https://metallform.com.br",
    siteName: "Metall Form",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${sora.variable} ${bebasNeue.variable} ${jetbrainsMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#080808" />
      </head>
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );
}
