import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function AppShell() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}