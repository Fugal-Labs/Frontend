import NavBar from "@/components/home/NavBar";
import InteractiveBackground from "@/components/ui/interactive-bg";

export default function ProblemsPage() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <InteractiveBackground />
      <NavBar />
      <main className="flex-1 flex items-center justify-center">
        <div className="bg-background/80 rounded-xl shadow-lg p-8 text-center">
          <h1 className="text-3xl font-bold mb-2">
            🚧 Page Under Construction 🚧
          </h1>
          <p className="text-lg text-muted-foreground">
            We&apos;re working hard to bring you this page. Please check back
            soon!
          </p>
        </div>
      </main>
    </div>
  );
}
