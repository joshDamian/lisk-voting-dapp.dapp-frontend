import { Inter } from "next/font/google";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}>
      <div>
        <header className="pb-4 lg:pb-6 border-gray-300 dark:border-neutral-800 border-b w-full md:w-[70vw]">
          <h2 className="text-2xl lg:text-3xl font-mono font-bold">Pollify</h2>
        </header>
        <div className="max-w-3xl p-5 lg:p-10 mx-auto">{children}</div>
      </div>
    </main>
  );
};

export { Layout };
