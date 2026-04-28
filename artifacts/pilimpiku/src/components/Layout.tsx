import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { Cursor } from "./Cursor";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Noise Overlay */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.04]">
        <svg className="w-full h-full">
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="4"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      <Cursor />
      <Navbar />

      <main className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={location}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col flex-1"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
