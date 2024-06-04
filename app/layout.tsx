import type { Metadata } from "next";
import "./globals.css";

import { Inter } from "next/font/google";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { ConvexClientProvider } from "@/components/providers/convex-provider";
import { ModalProvider } from "@/components/providers/modal-provider";

import { EdgeStoreProvider } from "../lib/edgestore";

import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Ideascribe",
    default: "Ideascribe",
  },
  description:
    "Ideascribe is a powerful, all-in-one workspace app designed to help you organize and bring your ideas to life. With flexible note-taking, task management, and real-time collaboration features, Ideascribe is perfect for individuals and teams looking to boost productivity and creativity. Try Ideascribe today and transform the way you work!",
  icons: [
    {
      media: "(prefers-color-scheme: light)",
      url: "/logo_invert.svg",
      href: "/logo_invert.svg",
    },
    {
      media: "(prefers-color-scheme: dark)",
      url: "/logo.svg",
      href: "/logo.svg",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConvexClientProvider>
          <EdgeStoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              storageKey="ID-Theme"
            >
              <Toaster position="bottom-right" />
              <ModalProvider />
              {children}
            </ThemeProvider>
          </EdgeStoreProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
