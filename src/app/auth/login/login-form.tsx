"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { createBrowserClient } from "@supabase/ssr";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const mode = searchParams.get('mode');
    setIsRegister(mode === 'register');
    return () => {
      document.body.style.overflow = "";
    };
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isRegister) {
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              name: formData.name,
            },
          },
        });

        if (error) throw error;

        toast.success("Conta criada com sucesso!", {
          description: "Verifique seu email para confirmar a conta.",
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;

        toast.success("Login realizado com sucesso!", {
          description: "Você será redirecionado para o dashboard.",
        });
        
        router.replace("/dashboard");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      toast.error(isRegister ? "Erro ao criar conta" : "Erro ao fazer login", {
        description: error instanceof Error ? error.message : "Tente novamente mais tarde.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'linkedin') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) throw error;
    } catch (error) {
      console.error("Erro no login social:", error);
      toast.error("Erro ao fazer login", {
        description: error instanceof Error ? error.message : "Tente novamente mais tarde.",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleForm = () => {
    setIsRegister(!isRegister);
    setFormData({ name: "", email: "", password: "" });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen w-full items-center justify-center p-4"
    >
      <Card className="overflow-hidden w-full max-w-6xl mx-auto h-full min-h-[600px]">
        <div className="grid md:grid-cols-2 h-full min-h-[600px] relative isolate">
          <motion.div
            className="hidden md:flex bg-[var(--login-card)] items-center justify-center p-12 h-full z-10"
            initial={false}
            animate={{
              x: isRegister ? "100%" : "0%",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center space-y-6 w-full"
            >
              <Icons.wallet className="h-32 w-32 text-primary" />
              <h2 className="text-4xl font-bold">Moobi</h2>
              <p className="text-center text-muted-foreground text-lg">
                Gerencie suas finanças de forma inteligente
              </p>
              <Button
                variant="default"
                onClick={toggleForm}
                className="w-full mt-8 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {isRegister ? (
                  <>
                    <Icons.login className="mr-2 h-5 w-5" />
                    Já tem uma conta? Faça login
                  </>
                ) : (
                  <>
                    <Icons.user className="mr-2 h-5 w-5" />
                    Não tem uma conta? Cadastre-se
                  </>
                )}
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="p-12 h-full flex flex-col"
            initial={false}
            animate={{
              x: isRegister ? "-100%" : "0%",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col h-full"
            >
              <CardHeader className="space-y-2 p-0">
                <div className="flex flex-col items-center space-y-2">
                  <Icons.wallet className="h-8 w-8" />
                  <CardTitle className="text-3xl">
                    {isRegister ? "Criar uma conta" : "Bem-vindo de volta"}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {isRegister
                      ? "Preencha os dados abaixo para criar sua conta"
                      : "Entre com seu email e senha para acessar sua conta"}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-0 pt-6 flex-1 flex flex-col">
                <div className="grid gap-6 flex-1">
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      onClick={() => handleSocialLogin('google')}
                      disabled={isLoading}
                      className="w-full bg-[#B31412] hover:bg-[#8B0000] text-white hover:text-white border-transparent dark:bg-[#B31412] dark:hover:bg-[#8B0000]"
                    >
                      <Icons.google className="mr-2 h-5 w-5" />
                      Continuar com Google
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleSocialLogin('linkedin')}
                      disabled={isLoading}
                      className="w-full bg-[#005B8C] hover:bg-[#004B73] text-white hover:text-white border-transparent dark:bg-[#005B8C] dark:hover:bg-[#004B73]"
                    >
                      <Icons.linkedin className="mr-2 h-5 w-5" />
                      Continuar com LinkedIn
                    </Button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">
                        Ou continue com
                      </span>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                    <div className="grid gap-4 flex-1">
                      <AnimatePresence mode="wait">
                        {isRegister && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="grid gap-2"
                          >
                            <Label htmlFor="name">Nome</Label>
                            <Input
                              id="name"
                              name="name"
                              type="text"
                              placeholder="Seu nome completo"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              className="h-11"
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="seu@email.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="h-11"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="password">Senha</Label>
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={handleChange}
                          required
                          className="h-11"
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-11"
                      >
                        {isLoading && (
                          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {isRegister ? "Criar conta" : "Entrar"}
                      </Button>
                    </div>
                  </form>
                </div>
              </CardContent>
            </motion.div>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
} 