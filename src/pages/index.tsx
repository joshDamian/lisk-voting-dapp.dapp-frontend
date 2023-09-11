import { Inter } from "next/font/google";
import { Home } from "@/components/home";

const inter = Inter({ subsets: ["latin"] });

export default function HomePage() {
  return (
    <main className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}>
      <Home />
    </main>
  );
}
