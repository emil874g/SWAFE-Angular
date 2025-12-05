"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import apiService from "@/services/api";
import { WorkoutProgram, User } from "@/types";

export default function DashboardPage() {
  const { user } = useAuth();
  const [programs, setPrograms] = useState<WorkoutProgram[]>([]);
  const [clients, setClients] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const accountType = user?.accountType;
  const isPersonalTrainer = accountType === "PersonalTrainer";
  const isManager = accountType === "Manager";
  const isClient = accountType === "Client";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Only fetch programs for trainers and clients
        if (!isManager) {
          const programsData = await apiService.getWorkoutPrograms();
          setPrograms(programsData);
        }

        if (isPersonalTrainer) {
          const clientsData = await apiService.getClients();
          setClients(clientsData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isManager, isPersonalTrainer]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (isManager) {
    return <ManagerDashboard firstName={user?.firstName} />;
  }

  return (
    <TrainerClientDashboard
      firstName={user?.firstName}
      isPersonalTrainer={isPersonalTrainer}
      isClient={isClient}
      programs={programs}
      clients={clients}
    />
  );
}

function ManagerDashboard({ firstName }: { firstName?: string | null }) {
  return (
    <div className="max-w-7xl mx-auto px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {firstName}!
        </h1>
        <p className="mt-2 text-gray-600">
          Manage your personal trainers and oversee the fitness center
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Management Tools
          </h2>
        </div>
        <div className="p-6">
          <Link
            href="/trainers"
            className="flex items-center gap-4 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl font-bold">T</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">
                Create Personal Trainer
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Add new trainers to your fitness center
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

interface TrainerClientDashboardProps {
  firstName?: string | null;
  isPersonalTrainer: boolean;
  isClient: boolean;
  programs: WorkoutProgram[];
  clients: User[];
}

function TrainerClientDashboard({
  firstName,
  isPersonalTrainer,
  isClient,
  programs,
  clients,
}: TrainerClientDashboardProps) {
  const totalExercises = programs.reduce(
    (acc, p) => acc + (p.exercises?.length || 0),
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {firstName}!
        </h1>
        <p className="mt-2 text-gray-600">
          {isPersonalTrainer
            ? "Here's an overview of your training business"
            : "Here's an overview of your fitness journey"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          label="Workout Programs"
          value={programs.length}
          badge="P"
          badgeColor="bg-blue-100 text-blue-600"
        />
        <StatCard
          label="Total Exercises"
          value={totalExercises}
          badge="E"
          badgeColor="bg-green-100 text-green-600"
        />
        {isPersonalTrainer && (
          <StatCard
            label="Active Clients"
            value={clients.length}
            badge="C"
            badgeColor="bg-purple-100 text-purple-600"
          />
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Programs
          </h2>
          <Link
            href="/programs"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            View all →
          </Link>
        </div>
        <div className="p-6">
          {programs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No programs yet</p>
              {isClient && (
                <p className="text-sm text-gray-400">
                  Contact your trainer to get started with a workout program
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {programs.slice(0, 5).map((program) => (
                <Link
                  key={program.workoutProgramId}
                  href={`/programs?id=${program.workoutProgramId}`}
                  className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {program.name || "Unnamed Program"}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                        {program.description || "No description"}
                      </p>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      {program.exercises?.length || 0} exercises
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: number;
  badge: string;
  badgeColor: string;
}

function StatCard({ label, value, badge, badgeColor }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center ${badgeColor}`}
        >
          <span className="text-xl font-bold">{badge}</span>
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-sm text-gray-500">{label}</p>
        </div>
      </div>
    </div>
  );
}
