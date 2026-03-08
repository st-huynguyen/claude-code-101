import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin | eSIM Store',
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="flex min-h-screen items-center justify-center p-4">{children}</div>;
}
