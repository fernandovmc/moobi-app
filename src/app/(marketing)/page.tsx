"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="grid grid-rows-[1fr_auto] h-full">
      {/* Hero Section */}
      <section className="flex items-center justify-center bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-8 text-center">
            <motion.div 
              className="flex flex-col items-center space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="flex items-center justify-center w-24 h-24 rounded-full bg-primary/10"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2
                }}
              >
                <motion.div
                  initial={{ rotate: -180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ 
                    duration: 0.5,
                    delay: 0.4
                  }}
                >
                  <Icons.wallet className="h-12 w-12 text-primary" />
                </motion.div>
              </motion.div>
              <motion.h1 
                className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                Moobi
              </motion.h1>
              <motion.p 
                className="max-w-[600px] text-lg text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                Gerencie suas finanças de forma inteligente
              </motion.p>
            </motion.div>
            <motion.div 
              className="space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <Link href="/auth/login?mode=register">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Começar agora
                  <Icons.login className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/features">
                <Button size="lg" variant="outline">
                  Saiba mais
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
} 