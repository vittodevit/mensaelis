import type { Metadata } from "next";
import icon from "./icon.png";
import Image from "next/image";
import "./globals.css";

export const metadata: Metadata = {
  title: "Menu Elis",
  description: "Menu giornaliero della mensa dell'elis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body>
        <div className="min-h-screen flex flex-col">
            <header className="bg-blue-500 text-white py-4 text-center flex justify-center items-center">
              <Image src={icon.src} alt="Icon" width={40} height={40} className="mr-3" />
              <h1 className="text-2xl font-bold">Menu mensa ELIS</h1>
            </header>
          {children}
          <footer className="bg-gray-700 text-center py-4">
            <p className="mb-3 mt-1">
              Made with ❤️ by{" "}
              <a href="https://vitto.dev" target="_blank" rel="noopener noreferrer" className="text-blue-500">
                Vittorio Lo Mele
              </a>
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
