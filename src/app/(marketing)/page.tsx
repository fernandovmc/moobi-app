"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export default function HomePage() {
  return (
    <div className="flex h-[calc(100vh-4rem-3rem)] items-center justify-center bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto grid max-w-4xl gap-4 px-4 md:grid-cols-2 md:gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-center space-y-3"
        >
          <div className="space-y-2">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl"
            >
              Gerencie suas finanças com inteligência
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-sm text-muted-foreground sm:text-base"
            >
              O Moobi é sua plataforma completa para controle financeiro, com ferramentas inteligentes e relatórios detalhados.
            </motion.p>
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col gap-2 sm:flex-row"
          >
            <Button size="lg" asChild>
              <Link href="/register">Começar Agora</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/features">Conhecer Recursos</Link>
            </Button>
          </motion.div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center"
        >
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -inset-4 rounded-full bg-primary/10 blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative flex h-[120px] w-[120px] items-center justify-center rounded-full bg-primary/10 sm:h-[140px] sm:w-[140px] md:h-[160px] md:w-[160px]"
            >
              <Icons.wallet className="h-14 w-14 text-primary sm:h-16 sm:w-16 md:h-20 md:w-20" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 