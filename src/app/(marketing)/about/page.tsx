"use client";

import { type SVGProps } from "react";
import { motion } from "framer-motion";

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

export default function AboutPage() {
  return (
    <section className="w-full space-y-6 py-8 md:py-12 lg:py-24">
      <motion.div 
        className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Sobre Nós
        </h1>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Conheça mais sobre a Moobi e nossa missão
        </p>
      </motion.div>
      <motion.div 
        className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-2"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div 
          className="relative overflow-hidden rounded-lg border bg-background p-2 hover:shadow-lg transition-shadow"
          variants={fadeInUp}
          whileHover={cardHover}
        >
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <div className="space-y-2">
              <h3 className="font-bold">Nossa Missão</h3>
              <p className="text-sm text-muted-foreground">
                Simplificar a gestão financeira de pessoas e empresas, tornando o controle de gastos mais acessível e eficiente.
              </p>
            </div>
          </div>
        </motion.div>
        <motion.div 
          className="relative overflow-hidden rounded-lg border bg-background p-2 hover:shadow-lg transition-shadow"
          variants={fadeInUp}
          whileHover={cardHover}
        >
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <div className="space-y-2">
              <h3 className="font-bold">Nossa Visão</h3>
              <p className="text-sm text-muted-foreground">
                Ser a plataforma líder em gestão financeira, reconhecida pela simplicidade e eficiência.
              </p>
            </div>
          </div>
        </motion.div>
        <motion.div 
          className="relative overflow-hidden rounded-lg border bg-background p-2 hover:shadow-lg transition-shadow"
          variants={fadeInUp}
          whileHover={cardHover}
        >
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <div className="space-y-2">
              <h3 className="font-bold">Nossos Valores</h3>
              <motion.ul 
                className="space-y-2"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                <motion.li 
                  className="flex items-center space-x-2"
                  variants={fadeInUp}
                  whileHover={{ x: 5 }}
                >
                  <CheckIcon className="h-4 w-4" />
                  <span className="text-sm">Transparência</span>
                </motion.li>
                <motion.li 
                  className="flex items-center space-x-2"
                  variants={fadeInUp}
                  whileHover={{ x: 5 }}
                >
                  <CheckIcon className="h-4 w-4" />
                  <span className="text-sm">Inovação</span>
                </motion.li>
                <motion.li 
                  className="flex items-center space-x-2"
                  variants={fadeInUp}
                  whileHover={{ x: 5 }}
                >
                  <CheckIcon className="h-4 w-4" />
                  <span className="text-sm">Simplicidade</span>
                </motion.li>
                <motion.li 
                  className="flex items-center space-x-2"
                  variants={fadeInUp}
                  whileHover={{ x: 5 }}
                >
                  <CheckIcon className="h-4 w-4" />
                  <span className="text-sm">Confiabilidade</span>
                </motion.li>
              </motion.ul>
            </div>
          </div>
        </motion.div>
        <motion.div 
          className="relative overflow-hidden rounded-lg border bg-background p-2 hover:shadow-lg transition-shadow"
          variants={fadeInUp}
          whileHover={cardHover}
        >
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <div className="space-y-2">
              <h3 className="font-bold">Nossa Equipe</h3>
              <p className="text-sm text-muted-foreground">
                Somos uma equipe apaixonada por tecnologia e finanças, comprometida em criar a melhor experiência para nossos usuários.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <motion.svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      whileHover={{ scale: 1.2 }}
      transition={{ duration: 0.2 }}
    >
      <polyline points="20 6 9 17 4 12" />
    </motion.svg>
  );
}
