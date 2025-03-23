import Sidebar from "../components/ui/Sidebar";

export default function AuthDashboard() {
  return (
    <>
      <div className="flex gap-20">
        <Sidebar />
        <p>This is the auth dashboard</p>
      </div>
    </>
  );
}
