import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import HackathonHighlight from "@/components/HackathonHighlight";
import Sponsors from "@/components/Sponsors";
import Benefits from "@/components/Benefits";
import RegistrationForm from "@/components/RegistrationForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />
      <main>
        <Hero />
        <About />
        <HackathonHighlight />
        <Sponsors />
        <Benefits />
        <RegistrationForm />
      </main>
      <Footer />
    </div>
  );
}
