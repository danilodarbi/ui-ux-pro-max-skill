import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AuthorityStrip } from "@/components/AuthorityStrip";
import { About } from "@/components/About";
import { Solutions } from "@/components/Solutions";
import { Specializations } from "@/components/Specializations";
import { Process } from "@/components/Process";
import { CEO } from "@/components/CEO";
import { Differentials } from "@/components/Differentials";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <SmoothScrollProvider />
      <Navbar />
      <main className="relative w-full overflow-hidden">
        <Hero />
        <AuthorityStrip />
        <About />
        <Solutions />
        <Specializations />
        <Process />
        <CEO />
        <Differentials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
