import { useEffect, useState } from "react";
import axios from "axios";
import {
  Users,
  Calendar,
  BarChart2,
  Shield,
  BookOpen,
  CheckSquare,
} from "react-feather";
import Chat from "../components/ui/Chat";

export default function AuthDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  
  const stats = {
    users: 1254,
    pendingApprovals: 18,
    activeEvents: 8,
    reports: 5,
  };

  return (
    <div className="flex min-h-screen bg-dark-1 text-white">
      <div className="flex-1 p-8">
        <header className="mb-8 flex justify-between">
          <h1 className="text-3xl font-bold">Authority Dashboard</h1>
          <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md cursor-pointer">
            LogOut
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 bg-dark-1">
          <StatCard
            icon={<Users />}
            title="Registered Students"
            value={stats.users}
          />
          <StatCard
            icon={<CheckSquare />}
            title="Pending Class Coordinator Approvals"
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
        Authority can manage the accounts of students through this section. 
      </h2>
      <div className="mt-4"></div>
    </div>
  );
}

function EventsAnnouncementsPanel() {
  return (
    <div>
     <Chat />
    </div>
  );
}



function ApprovalsPanel() {
  const [ccArray, setCcArray] = useState([]);
  useEffect(() => {
    const fetchUVCC = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/auth/uvcc");
        console.log(res.data);
        const UVCCArray = res.data.data;
        setCcArray(UVCCArray);
      
      } catch (error) {
        console.log("This is error", error);
      }
    };
    fetchUVCC();
  }, [ApprovalsPanel]);
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Class Coordinators needed to be approved
      </h2>
      <div className="mt-4">
        {ccArray.map((cc) => {
          return (
            <div key={cc.id}>
              <div className="w-96 h-18 rounded-2xl bg-dark-1 m-2 p-4 flex justify-between">
                <p className="text-xl ml-1 mt-1 ">
                  {" "}
                  {cc.firstname} {cc.lastname} {cc.department} {cc.section}
                </p>
                <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md cursor-pointer">
                  Verify
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
