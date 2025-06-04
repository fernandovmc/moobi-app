"use client";

import { motion } from "framer-motion";

export function Footer() {
  return (
    <motion.footer 
      className="border-t bg-card/80 backdrop-blur-sm py-3 md:py-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-4 md:h-16 md:flex-row">
        <motion.p 
          className="text-center text-xs leading-loose text-muted-foreground md:text-left"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          Built by{" "}
          <motion.a
            href="#"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Moobi
          </motion.a>
          . All rights reserved.
        </motion.p>
      </div>
    </motion.footer>
  );
} 