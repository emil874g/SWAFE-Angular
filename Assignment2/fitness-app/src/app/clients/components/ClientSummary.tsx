"use client";

import Link from "next/link";
import { User } from "@/types";

interface ClientSummaryProps {
  clients: User[];
}

export default function ClientSummary({ clients }: ClientSummaryProps) {
  if (clients.length === 0) return null;

  return (
    <div className="mt-8 grid grid-cols-2 gap-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-blue-100">
            {/* icon */}
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Total Clients</p>
            <p className="text-2xl font-bold text-gray-900">{clients.length}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-green-100">
            {/* icon */}
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">
              Workout Programs
            </p>
            <Link
              href="/programs"
              className="text-sm text-green-600 hover:underline font-medium"
            >
              Manage Programs →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
