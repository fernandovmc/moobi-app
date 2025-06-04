"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Icons } from "@/components/icons";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardHover = {
  scale: 1.02,
  transition: { duration: 0.2 },
};

export default function AboutPage() {
  return (
    <div className="container max-w-7xl mx-auto px-4 py-6">
      <motion.div
        className="flex flex-col items-center space-y-4 text-center mb-6"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <motion.h1
          className="text-2xl md:text-3xl font-bold tracking-tighter"
          variants={fadeInUp}
        >
          Sobre o Moobi
        </motion.h1>
        <motion.p
          className="max-w-[600px] text-muted-foreground text-sm md:text-base"
          variants={fadeInUp}
        >
          Nossa missão é ajudar pessoas a alcançarem suas metas financeiras através
          de uma plataforma intuitiva e poderosa.
        </motion.p>
      </motion.div>

      <motion.div
        className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 mb-6"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp} whileHover={cardHover} className="h-full">
          <Card className="h-full">
            <CardContent className="p-4">
              <div className="flex flex-col space-y-3">
                <div className="rounded-full bg-primary/10 p-3 w-fit">
                  <Icons.target className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-base font-bold">Nossa Missão</h3>
                <p className="text-xs text-muted-foreground">
                  Queremos democratizar o acesso a ferramentas de gestão financeira,
                  ajudando pessoas a tomarem melhores decisões com seu dinheiro.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeInUp} whileHover={cardHover} className="h-full">
          <Card className="h-full">
            <CardContent className="p-4">
              <div className="flex flex-col space-y-3">
                <div className="rounded-full bg-primary/10 p-3 w-fit">
                  <Icons.barChart className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-base font-bold">Nossa Visão</h3>
                <p className="text-xs text-muted-foreground">
                  Ser a plataforma mais completa e acessível para gestão financeira
                  pessoal e empresarial.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div
        className="mb-6"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp} whileHover={cardHover}>
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col items-center space-y-3 text-center">
                <h2 className="text-xl font-bold">Nossa História</h2>
                <p className="text-xs text-muted-foreground">
                  O Moobi nasceu da necessidade de ter uma ferramenta simples e
                  eficiente para gerenciar finanças pessoais. Começamos como um
                  pequeno projeto e hoje ajudamos milhares de pessoas a organizarem
                  suas finanças.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div
        className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp} whileHover={cardHover} className="h-full">
          <Card className="h-full">
            <CardContent className="p-4">
              <div className="flex flex-col items-center space-y-3 text-center">
                <div className="rounded-full bg-primary/10 p-3">
                  <Icons.users className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-base font-bold">10k+</h3>
                <p className="text-xs text-muted-foreground">Usuários ativos</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeInUp} whileHover={cardHover} className="h-full">
          <Card className="h-full">
            <CardContent className="p-4">
              <div className="flex flex-col items-center space-y-3 text-center">
                <div className="rounded-full bg-primary/10 p-3">
                  <Icons.barChart className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-base font-bold">1M+</h3>
                <p className="text-xs text-muted-foreground">Transações registradas</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeInUp} whileHover={cardHover} className="h-full">
          <Card className="h-full">
            <CardContent className="p-4">
              <div className="flex flex-col items-center space-y-3 text-center">
                <div className="rounded-full bg-primary/10 p-3">
                  <Icons.star className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-base font-bold">4.8</h3>
                <p className="text-xs text-muted-foreground">Avaliação média</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
