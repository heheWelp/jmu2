import DashboardLayout from '@/components/layout/DashboardLayout'

export default function ProviderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout>{children}</DashboardLayout>
} 