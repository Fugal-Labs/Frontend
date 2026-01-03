import Footer from "@/components/home/Footer";
import NavBar from "@/components/NavBar";
import InteractiveBackground from "@/components/ui/interactive-bg";
import HomeClientGate from "@/components/home/HomeClientGate";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <InteractiveBackground />
      <NavBar />

      <main className="pt-4 sm:pt-4 md:pt-8">
        <HomeClientGate />
      </main>

      <Footer />
    </div>
  );
}
