import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/lib/AppContext";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Little Oak | Family Organiser",
  description: "Your family's all-in-one planner — calendar, tasks, groceries and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-gray-50">
        <AppProvider>
          <div className="flex h-full">
            <Sidebar />
            <main className="flex-1 overflow-y-auto pt-14 lg:pt-0">
              {children}
            </main>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
