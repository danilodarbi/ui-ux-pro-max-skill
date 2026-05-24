"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <footer
      ref={containerRef}
      className="relative bg-[var(--bg-dark)] border-t border-[var(--border)]"
    >
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 pb-16 border-b border-[var(--border)]">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-display text-2xl font-bold mb-4">
              <span className="text-white">METALL</span>
              <span className="text-[var(--accent)]">FORM</span>
            </h3>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              Engenharia Aplicada à Produção Industrial
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Navegação
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Sobre", href: "#sobre" },
                { label: "Soluções", href: "#solucoes" },
                { label: "Especialidades", href: "#especialidades" },
                { label: "Processo", href: "#processo" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[var(--text-secondary)] hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Solutions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Soluções
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                "Perfiladeiras",
                "Linhas Integradas",
                "Estampagem",
                "Automação",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-[var(--text-secondary)] hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Contato
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[var(--accent)] mt-0.5 flex-shrink-0" />
                <span className="text-[var(--text-secondary)]">
                  Mirassol, São Paulo, Brasil
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-[var(--accent)] flex-shrink-0" />
                <a href="tel:+5517" className="text-[var(--text-secondary)] hover:text-white">
                  +55 (17) 3333-3333
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-[var(--accent)] flex-shrink-0" />
                <a
                  href="mailto:contato@metallform.com.br"
                  className="text-[var(--text-secondary)] hover:text-white"
                >
                  contato@metallform.com.br
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between text-xs text-[var(--text-muted)]">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            © 2024 Metall Form Máquinas e Equipamentos. Todos os direitos
            reservados.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex gap-6 mt-4 md:mt-0"
          >
            <a href="#" className="hover:text-white transition-colors">
              Privacidade
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Termos
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Cookies
            </a>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
