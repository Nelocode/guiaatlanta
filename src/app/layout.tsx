import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/lib/context/AppContext";
import { AuthProvider } from "@/components/providers/AuthProvider";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "La Guía Atlanta | Directorio Comercial, Gastronómico & Profesional",
  description: "La plataforma oficial de anuncios y servicios para el área de Atlanta, Georgia. Encuentra los mejores restaurantes, profesionales, salud, eventos y comercios locales.",
  keywords: ["Atlanta", "La Guía Atlanta", "Directorio Atlanta", "Restaurantes Atlanta", "Abogados Atlanta", "Comercios Hispanos Atlanta", "Listing Atlanta"],
  authors: [{ name: "La Guía Atlanta" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${jakartaSans.variable} font-sans antialiased scroll-smooth`}>
      <body className="min-h-screen bg-[#FAF8FC] text-gray-900 flex flex-col selection:bg-[#008753] selection:text-white">
        <AuthProvider>
          <AppProvider>
            {children}
          </AppProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
