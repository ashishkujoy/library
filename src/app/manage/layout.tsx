import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/auth';
import './page.css';
import Login from '@/components/Login';

export default async function ManagementLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user || !user.isAdmin) {
    return <Login />
  }
  return (
    <div>{children}</div>
  );
}