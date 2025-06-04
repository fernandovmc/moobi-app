"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

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

export default function PricingPage() {
  return (
    <div className="min-h-[calc(100vh-12rem)] flex items-center">
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
            Planos que cabem no seu bolso
          </motion.h1>
          <motion.p
            className="max-w-[600px] text-muted-foreground text-sm md:text-base"
            variants={fadeInUp}
          >
            Escolha o plano ideal para suas necessidades e comece a organizar suas
            finanças hoje mesmo.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={cardHover}
              className="h-full"
            >
              <Card className={`h-full ${plan.featured ? "border-primary" : ""}`}>
                <CardHeader>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription className="text-sm">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <span className="text-2xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground text-sm">/mês</span>
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full bg-primary hover:bg-primary/90">
                    <Link href={plan.href}>{plan.buttonText}</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
