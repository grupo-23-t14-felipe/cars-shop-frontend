import "../styles/globals.css";
import "../styles/typograph.css";
import "../styles/buttons.css";
import "../styles/inputs.css";

import { Inter } from "next/font/google";
import Providers from "./provider";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Motors Shop",
  description: "Generated by create next app"
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
