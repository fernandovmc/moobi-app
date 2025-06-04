"use client";

import { motion } from "framer-motion";
import { Icons } from "@/components/icons";
import { Card, CardContent } from "@/components/ui/card";

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

const features = [
  {
    title: "Controle de Gastos",
    description:
      "Registre e categorize suas despesas para ter uma visão clara de para onde vai seu dinheiro.",
    icon: Icons.wallet,
  },
  {
    title: "Relatórios Detalhados",
    description:
      "Visualize gráficos e relatórios que mostram a evolução das suas finanças ao longo do tempo.",
    icon: Icons.barChart,
  },
  {
    title: "Metas Financeiras",
    description:
      "Defina objetivos e acompanhe seu progresso para alcançar suas metas financeiras.",
    icon: Icons.target,
  },
  {
    title: "Categorização",
    description:
      "Organize suas transações em categorias personalizadas para uma melhor análise.",
    icon: Icons.tags,
  },
  {
    title: "Sincronização em Nuvem",
    description:
      "Acesse seus dados de qualquer dispositivo com sincronização automática.",
    icon: Icons.cloud,
  },
  {
    title: "Suporte Premium",
    description:
      "Conte com nossa equipe de suporte para ajudar você a tirar o máximo proveito da plataforma.",
    icon: Icons.headset,
  },
];

export default function FeaturesPage() {
  return (
    <div className="container max-w-7xl mx-auto px-4 py-12">
      <motion.div
        className="flex flex-col items-center space-y-8 text-center mb-12"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <motion.h1
          className="text-3xl md:text-4xl font-bold tracking-tighter"
          variants={fadeInUp}
        >
          Recursos que fazem a diferença
        </motion.h1>
        <motion.p
          className="max-w-[600px] text-muted-foreground text-base md:text-lg"
          variants={fadeInUp}
        >
          Conheça as funcionalidades que vão transformar a forma como você gerencia
          suas finanças.
        </motion.p>
      </motion.div>

      <motion.div
        className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            whileHover={cardHover}
            className="h-full"
          >
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="flex flex-col space-y-4">
                  <div className="rounded-full bg-primary/10 p-3 w-fit">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
