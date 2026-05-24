"use client";

import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      number: "01",
      title: "Engenharia",
      description: "Análise técnica profunda de requisitos e especificações",
    },
    {
      number: "02",
      title: "Projeto",
      description: "Desenvolvimento de projeto customizado e otimizado",
    },
    {
      number: "03",
      title: "Fabricação",
      description: "Manufatura precisa com controle de qualidade rigoroso",
    },
    {
      number: "04",
      title: "Integração",
      description: "Integração completa de sistemas e componentes",
    },
    {
      number: "05",
      title: "Automação",
      description: "Configuração de automação e sistemas de controle",
    },
    {
      number: "06",
      title: "Entrega",
      description: "Implementação em produção com treinamento completo",
    },
    {
      number: "07",
      title: "Suporte",
      description: "Suporte técnico contínuo 24/7 pós-implementação",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const processCards = gsap.utils.toArray(".process-card") as HTMLElement[];

      processCards.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
          },
          opacity: 0,
          y: 40,
          delay: index * 0.1,
          duration: 0.8,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="processo"
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
            <span className="section-label">Metodologia</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-5xl md:text-6xl font-display font-bold leading-tight"
          >
            Processo de<br />
            <span className="text-[var(--accent)]">Entrega Integrado</span>
          </motion.h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line (desktop only) */}
          <div className="hidden lg:block absolute left-24 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--accent)] via-[var(--accent)] to-transparent opacity-30" />

          {/* Steps */}
          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                className="process-card group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.7 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="flex gap-6 lg:gap-8">
                  {/* Step Number */}
                  <div className="flex-shrink-0 w-20 h-20 flex items-center justify-center">
                    <div className="relative w-full h-full">
                      {/* Circle background */}
                      <div className="absolute inset-0 bg-[var(--accent)] rounded-full opacity-10" />

                      {/* Circle border */}
                      <div className="absolute inset-0 border-2 border-[var(--accent)] rounded-full opacity-30 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Number */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-display text-xl font-bold text-[var(--accent)]">
                          {step.number}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-4">
                    <h3 className="text-2xl font-display font-bold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-[var(--text-secondary)] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="divider mt-20" />
      </div>
    </section>
  );
}
