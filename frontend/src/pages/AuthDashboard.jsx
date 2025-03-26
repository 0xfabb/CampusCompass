import { useState } from "react";

import {
  Users,
  Calendar,
  BarChart2,
  Shield,
  BookOpen,
  CheckSquare,
  Bell,
} from "react-feather";

export default function AuthDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = {
    users: 1254,
    pendingApprovals: 12,
    activeEvents: 8,
    reports: 5,
  };

  return (
    <div className="flex min-h-screen bg-dark-1 text-white">
      <div className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Authority Dashboard</h1>
          <p>Manage your campus community and resources</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 bg-dark-1">
          <StatCard
            icon={<Users />}
            title="Registered Users"
            value={stats.users}
          />
          <StatCard
            icon={<CheckSquare />}
            title="Pending Approvals"
            value={stats.pendingApprovals}
          />
          <StatCard
            icon={<Calendar />}
            title="Active Events"
            value={stats.activeEvents}
          />
          <StatCard icon={<Shield />} title="Reports" value={stats.reports} />
        </div>

        <div className="border-b border-gray-200 mb-8">
          <nav className="flex -mb-px">
            <TabButton
              active={activeTab === "overview"}
              onClick={() => setActiveTab("overview")}
              icon={<BarChart2 size={18} />}
              label="Overview"
            />
            <TabButton
              active={activeTab === "users"}
              onClick={() => setActiveTab("users")}
              icon={<Users size={18} />}
              label="User Management"
            />
            <TabButton
              active={activeTab === "events"}
              onClick={() => setActiveTab("events")}
              icon={<Calendar size={18} />}
              label="Events & Announcements"
            />
            <TabButton
              active={activeTab === "moderation"}
              onClick={() => setActiveTab("moderation")}
              icon={<Shield size={18} />}
              label="Moderation"
            />
            <TabButton
              active={activeTab === "resources"}
              onClick={() => setActiveTab("resources")}
              icon={<BookOpen size={18} />}
              label="Resources"
            />
            <TabButton
              active={activeTab === "approvals"}
              onClick={() => setActiveTab("approvals")}
              icon={<CheckSquare size={18} />}
              label="Approvals"
            />
          </nav>
        </div>

        <div className="bg-dark-2 rounded-lg shadow p-6">
          {activeTab === "overview" && <OverviewPanel />}
          {activeTab === "users" && <UserManagementPanel />}
          {activeTab === "events" && <EventsAnnouncementsPanel />}
          {activeTab === "moderation" && <ModerationPanel />}
          {activeTab === "resources" && <ResourcesPanel />}
          {activeTab === "approvals" && <ApprovalsPanel />}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div className="bg-dark-2 p-6 rounded-lg shadow flex items-center">
      <div className="p-3 rounded-full bg-red-500 text-gray-50 mr-4">
        {icon}
      </div>
      <div>
        <h3 className="text-white text-sm font-medium">{title}</h3>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`mr-8 py-4 px-1 flex items-center text-sm font-medium ${
        active
          ? "border-b-2 border-red-500 text-red-600"
          : "text-white hover:text-white hover:border-gray-300"
      }`}
    >
      <span className="mr-2">{icon}</span>
      {label}
    </button>
  );
}

function OverviewPanel() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Campus Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-2">Recent Activity</h3>

          <p className="text-gray-50">Activity feed coming soon...</p>
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-2">Engagement Metrics</h3>

          <p className="text-gray-50">Engagement charts coming soon...</p>
        </div>
      </div>
    </div>
  );
}

function UserManagementPanel() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        User & Community Management
      </h2>
      <p className="text-gray-50">
        Track registered students, faculty, and club members. Approve or suspend
        accounts, manage roles, and oversee community activities.
      </p>
      <div className="mt-4">
        <p className="text-gray-50">User management interface coming soon...</p>
      </div>
    </div>
  );
}

function EventsAnnouncementsPanel() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Events & Announcements</h2>
      <p className="text-gray-50">
        Create, approve, and manage events, important notices, and college-wide
        announcements with visibility settings.
      </p>
      <div className="mt-4">
        <p className="text-gray-50">
          Events & announcements interface coming soon...
        </p>
      </div>
    </div>
  );
}

function ModerationPanel() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Moderation & Security</h2>
      <p className="text-gray-50">
        Monitor posts, discussions, and community interactions. Flag
        inappropriate content and ensure a safe digital campus environment.
      </p>
      <div className="mt-4">
        <p className="text-gray-50">Moderation interface coming soon...</p>
      </div>
    </div>
  );
}

function ResourcesPanel() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Resource Management</h2>
      <p className="text-gray-50">
        Manage shared resources like study materials, room bookings, and college
        services within the platform.
      </p>
      <div className="mt-4">
        <p className="text-gray-50">
          Resource management interface coming soon...
        </p>
      </div>
    </div>
  );
}

function ApprovalsPanel() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Automated Approvals & Permissions
      </h2>
      <p className="text-gray-50">
        Streamline approvals for clubs, events, and user requests with
        customizable workflows.
      </p>
      <div className="mt-4">
        <p className="text-gray-50">
          Approvals workflow interface coming soon...
        </p>
      </div>
    </div>
  );
}
