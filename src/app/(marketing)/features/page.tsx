"use client";

import { motion } from "framer-motion";
import { Icons } from "@/components/icons";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardHover = {
  scale: 1.02,
  transition: { duration: 0.2 }
};

const features = [
  {
    title: "Gestão Financeira Inteligente",
    description: "Controle suas finanças com ferramentas avançadas de análise e planejamento.",
    icon: "wallet",
  },
  {
    title: "Relatórios Detalhados",
    description: "Visualize relatórios completos sobre seus gastos e receitas.",
    icon: "barChart",
  },
  {
    title: "Metas Financeiras",
    description: "Defina e acompanhe suas metas financeiras com facilidade.",
    icon: "target",
  },
  {
    title: "Categorização Automática",
    description: "Organize suas transações automaticamente por categorias.",
    icon: "tags",
  },
  {
    title: "Backup na Nuvem",
    description: "Seus dados sempre seguros e sincronizados em todos os dispositivos.",
    icon: "cloud",
  },
  {
    title: "Suporte 24/7",
    description: "Equipe de suporte sempre pronta para ajudar você.",
    icon: "headset",
  },
];

export default function FeaturesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold mb-4">Recursos</h1>
        <p className="text-lg text-muted-foreground">
          Descubra todas as funcionalidades que o Moobi oferece para gerenciar suas finanças
        </p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {features.map((feature) => {
          const Icon = Icons[feature.icon as keyof typeof Icons];
          return (
            <motion.div
              key={feature.title}
              variants={fadeInUp}
              whileHover={cardHover}
              className="relative overflow-hidden rounded-lg border bg-background p-2 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                  <Icon className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
} 