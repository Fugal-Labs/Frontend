import SignupForm from "@/components/auth/signupForm";
import InteractiveBackground from "@/components/ui/interactive-bg";

export default function SignupPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <InteractiveBackground />
      {/* Content */}
      <div className="relative z-10 w-full max-w-md px-4">
        <SignupForm />
      </div>
    </div>
  );
}
