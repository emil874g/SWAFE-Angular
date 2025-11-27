"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/programs", label: "Workout Programs" },
  { href: "/exercises", label: "Exercises" },
  { href: "/clients", label: "Clients", trainerOnly: true },
];

export default function Navigation() {
  const pathname = usePathname();
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;

  const isTrainer =
    user?.accountType === "PersonalTrainer" || user?.accountType === "Manager";

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-600">
                Fitness App
              </span>
            </div>
            <div className="ml-8 flex space-x-4">
              {navItems
                .filter((item) => !item.trainerOnly || isTrainer)
                .map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      pathname === item.href ||
                      pathname.startsWith(item.href + "/")
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <span className="mr-2"></span>
                    {item.label}
                  </Link>
                ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              <span className="font-medium">
                {user?.firstName} {user?.lastName}
              </span>
              <span className="ml-2 px-2 py-1 text-xs bg-gray-100 rounded-full">
                {user?.accountType}
              </span>
            </div>
            <button
              onClick={logout}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
