import { useAuthStore } from "../../store/useAuthStore";
import { useLogout } from "../../hooks/useAuth";
import { Button } from "../ui/button";

export default function Header() {
  const user = useAuthStore((s) => s.user);
  const logout = useLogout();

  return (
    <header className="flex items-center justify-between h-16 px-6 border-b border-gray-800">
      <span className="text-lg font-semibold text-white">Task Manager</span>
      <div className="flex items-center gap-4">
        <span className="text-gray-300 text-sm">{user?.full_name}</span>
        <Button variant="outline" size="sm" onClick={logout}>Log out</Button>
      </div>
    </header>
  );
}