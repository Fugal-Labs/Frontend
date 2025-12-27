import AuthNav from "@/components/auth/authNav";

export default function AuthPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthNav />
      <main>{children}</main>
    </>
  );
}
