import AuthProvider from "@/components/AuthProvider.tsx/AuthProvider";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}
