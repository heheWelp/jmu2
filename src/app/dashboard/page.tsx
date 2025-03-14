import DashboardLayout from "@/components/layout/DashboardLayout";
import Overview from "@/components/features/Overview";
import UserManagement from "@/components/features/UserManagement";
import ContentManagement from "@/components/features/ContentManagement";
import ActivityLog from "@/components/features/ActivityLog";
import QuickActions from "@/components/features/QuickActions";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome to the JMU Learning Management System</p>
      </div>
      
      <Overview />
      <UserManagement />
      <ContentManagement />
      <ActivityLog />
      <QuickActions />
    </DashboardLayout>
  );
} 