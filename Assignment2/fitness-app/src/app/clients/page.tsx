"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import apiService from "@/services/api";
import { User } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { ErrorMessage } from "@/components/ui";
import ClientCreateForm from "./components/ClientCreateForm";
import ClientTable from "./components/ClientTable";
import ClientSummary from "./components/ClientSummary";

export default function ClientsPage() {
  const [clients, setClients] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { user } = useAuth();

  const isTrainer =
    user?.accountType === "PersonalTrainer" ||
    user?.accountType === "Manager";

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const data = await apiService.getClients();
      setClients(data);
    } catch (err) {
      setError("Failed to load clients");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isTrainer) {
    return (
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg">
          This page is only accessible to personal trainers.
        </div>

        <Link
          href="/dashboard"
          className="mt-4 inline-block text-teal-600 hover:underline"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  if (isLoading) return null;

  return (
    <div className="max-w-7xl mx-auto px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Clients</h1>
          <p className="mt-2 text-gray-600">Manage your client relationships</p>
        </div>
        <button
          onClick={() => setShowCreateForm((prev) => !prev)}
          className="px-4 py-2 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700"
        >
          {showCreateForm ? "Cancel" : "New Client"}
        </button>
      </div>

      {error && <ErrorMessage message={error} />}

      {showCreateForm && (
        <ClientCreateForm
          onCreated={async () => {
            await fetchClients();
            setShowCreateForm(false);
          }}
        />
      )}

      <ClientTable clients={clients} />
      <ClientSummary clients={clients} />
    </div>
  );
}
