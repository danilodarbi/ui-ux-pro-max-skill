"use client";

import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Solutions() {
  const containerRef = useRef<HTMLDivElement>(null);

  const solutions = [
    {
      number: "01",
      title: "Perfiladeiras",
      subtitle: "Roll Forming Systems",
      description:
        "Máquinas de perfilamento contínuo de alta precisão para conformação de metais em linhas de produção industrial.",
      highlight: "Corte em voo integrado",
    },
    {
      number: "02",
      title: "Linhas Integradas",
      subtitle: "Automated Lines",
      description:
        "Linhas de perfilamento completamente automatizadas com transferências de processo, estampagem e integração total.",
      highlight: "Produção contínua",
    },
    {
      number: "03",
      title: "Sistemas de Estampagem",
      subtitle: "Stamping & Cutting",
      description:
        "Soluções de estampagem e corte integradas ao fluxo de produção com automação de transferência de peças.",
      highlight: "Precisão dimensional",
    },
    {
      number: "04",
      title: "Automação Industrial",
      subtitle: "Process Automation",
      description:
        "Integração automática de processos, robótica e controle CNC para máxima eficiência operacional.",
      highlight: "Inteligência de produção",
    },
    {
      number: "05",
      title: "Retrofit e Modernização",
      subtitle: "Equipment Upgrade",
      description:
        "Modernização de equipamentos existentes com novas tecnologias, automação e sistemas de controle avançados.",
      highlight: "Aumento de produtividade",
    },
    {
      number: "06",
      title: "Linhas Customizadas",
      subtitle: "Custom Solutions",
      description:
        "Desenvolvimento de soluções 100% customizadas conforme especificações técnicas e demandas específicas do cliente.",
      highlight: "Engenharia sob medida",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".solution-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
        },
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.8,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="solucoes"
      className="relative py-20 md:py-32 bg-[var(--bg-dark)]"
    >
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="section-rule mb-6"
          >
            <span className="section-label">Soluções Industriais</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-5xl md:text-6xl font-display font-bold leading-tight"
          >
            Portfólio de<br />
            <span className="text-[var(--accent)]">Soluções Completas</span>
          </motion.h2>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.number}
              className="solution-card group relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* Card */}
              <div className="h-full p-8 bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg hover:border-[var(--accent-border)] transition-all duration-500 hover:bg-[rgba(232,98,42,0.04)] cursor-pointer">
                {/* Number and Title */}
                <div className="mb-6">
                  <p className="text-sm font-mono text-[var(--accent)] mb-2 uppercase tracking-wide">
                    {solution.number}
                  </p>
                  <h3 className="text-2xl font-display font-bold text-white mb-1">
                    {solution.title}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] uppercase tracking-wide">
                    {solution.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                  {solution.description}
                </p>

                {/* Highlight Badge */}
                <div className="inline-block px-3 py-2 bg-[rgba(232,98,42,0.1)] border border-[var(--accent-border)] rounded-full mb-6">
                  <p className="text-xs text-[var(--accent)] font-medium uppercase tracking-wider">
                    {solution.highlight}
                  </p>
                </div>

                {/* CTA */}
                <div className="flex items-center gap-2 text-[var(--accent)] group-hover:gap-4 transition-all duration-300">
                  <span className="text-sm font-medium uppercase tracking-wide">
                    Explorar
                  </span>
                  <ArrowRight size={16} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
