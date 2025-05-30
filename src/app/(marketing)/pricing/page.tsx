"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import { motion } from "framer-motion";

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

export default function PricingPage() {
  return (
    <motion.section
      className="w-full space-y-6 py-8 md:py-12 lg:py-24"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <motion.div
        className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center px-2 sm:px-4"
        variants={fadeInUp}
      >
        <h1 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Planos
        </h1>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Escolha o plano ideal para suas necessidades
        </p>
      </motion.div>
      <motion.div
        className="mx-auto grid justify-center gap-4 grid-cols-1 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 px-2 sm:px-0"
        variants={staggerContainer}
      >
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            className="relative overflow-hidden rounded-lg border bg-background p-2 hover:shadow-lg transition-shadow"
            variants={fadeInUp}
            whileHover={cardHover}
          >
            <div className="flex h-[500px] flex-col justify-between rounded-md p-6 items-center text-center">
              <div className="space-y-2">
                <h3 className="font-bold text-lg md:text-xl">{plan.name}</h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  {plan.description}
                </p>
                <div className="flex items-baseline space-x-2 justify-center">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.price !== "Grátis" && (
                    <span className="text-sm text-muted-foreground">/mês</span>
                  )}
                </div>
              </div>
              <div className="space-y-15 w-full">
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center space-x-2 justify-center"
                    >
                      <CheckIcon className="h-4 w-4" />
                      <span className="text-sm md:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href={plan.href} className="w-full block">
                  <Button
                    className="w-full"
                    variant={plan.featured ? "default" : "outline"}
                  >
                    {plan.buttonText}
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}

const plans = [
  {
    name: "Básico",
    description: "Recursos essenciais para começar",
    price: "Grátis",
    features: [
      "Controle básico de despesas",
      "Categorias limitadas",
      "Relatórios mensais",
      "Suporte por email",
    ],
    buttonText: "Começar Grátis",
    href: "/register",
    featured: false,
  },
  {
    name: "Pro",
    description: "Recursos avançados para controle financeiro",
    price: "R$ 29,90",
    features: [
      "Categorias ilimitadas",
      "Orçamentos personalizados",
      "Metas financeiras",
      "Relatórios avançados",
      "Suporte prioritário",
    ],
    buttonText: "Começar Agora",
    href: "/register",
    featured: true,
  },
  {
    name: "Business",
    description: "Solução completa para empresas",
    price: "R$ 99,90",
    features: [
      "Múltiplos usuários",
      "Integração contábil",
      "API personalizada",
      "Suporte 24/7",
      "Treinamento da equipe",
    ],
    buttonText: "Fale Conosco",
    href: "/contact",
    featured: false,
  },
];
