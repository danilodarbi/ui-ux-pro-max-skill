"use client";

import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Zap,
  Shield,
  BarChart3,
  Cpu,
  Wrench,
  Headphones,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Differentials() {
  const containerRef = useRef<HTMLDivElement>(null);

  const differentials = [
    {
      icon: Cpu,
      title: "Engenharia Customizada",
      description:
        "Soluções 100% customizadas conforme especificações técnicas únicas de cada cliente.",
    },
    {
      icon: Zap,
      title: "Automação Integrada",
      description:
        "Sistemas de automação completos e integrados para máxima eficiência operacional.",
    },
    {
      icon: BarChart3,
      title: "Produtividade Industrial",
      description:
        "Aumento comprovado de produtividade em até 300% com nossas soluções.",
    },
    {
      icon: Shield,
      title: "Compliance NR-12",
      description:
        "Todas as máquinas desenvolvidas com full compliance às normas de segurança NR-12.",
    },
    {
      icon: Wrench,
      title: "Inteligência de Processos",
      description:
        "Análise avançada de processos e otimização contínua de linhas de produção.",
    },
    {
      icon: Headphones,
      title: "Suporte Técnico 24/7",
      description:
        "Equipe técnica especializada disponível 24 horas para suporte e manutenção.",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".differential-item", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
        },
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.8,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-20 md:py-32 bg-[var(--bg-dark)]"
    >
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="section-rule mb-6"
          >
            <span className="section-label">Diferenciais</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-5xl md:text-6xl font-display font-bold leading-tight"
          >
            O que nos torna<br />
            <span className="text-[var(--accent)]">Únicos no Mercado</span>
          </motion.h2>
        </div>

        {/* Differentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {differentials.map((diff, index) => {
            const Icon = diff.icon;
            return (
              <motion.div
                key={diff.title}
                className="differential-item group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="h-full p-8 bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg hover:border-[var(--accent-border)] transition-all duration-300 hover:bg-[rgba(232,98,42,0.04)]">
                  {/* Icon */}
                  <div className="mb-6 inline-flex p-3 bg-[rgba(232,98,42,0.1)] border border-[var(--accent-border)] rounded-lg group-hover:bg-[rgba(232,98,42,0.15)] transition-colors duration-300">
                    <Icon
                      size={24}
                      className="text-[var(--accent)]"
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-display font-bold text-white mb-3">
                    {diff.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    {diff.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Divider */}
        <div className="divider mt-20" />
      </div>
    </section>
  );
}
