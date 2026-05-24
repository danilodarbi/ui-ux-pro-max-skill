"use client";

import { useState, useEffect } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Sobre", href: "#sobre" },
    { label: "Soluções", href: "#solucoes" },
    { label: "Especialidades", href: "#especialidades" },
    { label: "Processo", href: "#processo" },
  ];

  return (
    <>
      {/* Fixed Navbar */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[rgba(8,8,8,0.92)] backdrop-blur-xl border-b border-[var(--border)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex-shrink-0 font-display text-2xl font-bold tracking-tighter"
          >
            <span className="text-white">METALL</span>
            <span className="text-[var(--accent)]">FORM</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-[var(--text-secondary)] hover:text-white transition-colors uppercase tracking-wide"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/551733333333"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 hover:bg-[var(--bg-muted)] rounded-lg transition-colors"
            >
              <MessageCircle size={20} className="text-[var(--accent)]" />
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <a href="#contato" className="hidden md:inline-block btn-primary">
              Entrar em contato
            </a>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-0 right-0 bg-[var(--bg-surface)] border-b border-[var(--border)] md:hidden z-40"
          >
            <div className="p-6 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-sm font-medium text-[var(--text-secondary)] hover:text-white transition-colors uppercase"
                >
                  {item.label}
                </a>
              ))}
              <a href="#contato" className="block btn-primary w-full text-center">
                Entrar em contato
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/551733333333"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 p-4 bg-[var(--accent)] rounded-full shadow-2xl hover:shadow-[0_0_30px_rgba(232,98,42,0.5)] transition-all z-40 flex items-center justify-center"
      >
        <MessageCircle size={28} className="text-white" />
      </motion.a>
    </>
  );
}
