"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import apiService from "@/services/api";
import { WorkoutProgram, User, Exercise } from "@/types";

export default function DashboardPage() {
  const { user } = useAuth();
  const [programs, setPrograms] = useState<WorkoutProgram[]>([]);
  const [clients, setClients] = useState<User[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const isTrainer =
    user?.accountType === "PersonalTrainer" || user?.accountType === "Manager";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [programsData, exercisesData] = await Promise.all([
          apiService.getWorkoutPrograms(),
          apiService.getExercises(),
        ]);
        setPrograms(programsData);
        setExercises(exercisesData);

        if (isTrainer) {
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
  }, [isTrainer]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.firstName}!
        </h1>
        <p className="mt-2 text-gray-600">
          {isTrainer
            ? "Here's an overview of your training business"
            : "Here's an overview of your fitness journey"}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold text-blue-600">P</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {programs.length}
              </p>
              <p className="text-sm text-gray-500">Workout Programs</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold text-green-600">E</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {exercises.length}
              </p>
              <p className="text-sm text-gray-500">Total Exercises</p>
            </div>
          </div>
        </div>

        {isTrainer && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold text-purple-600">C</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {clients.length}
                </p>
                <p className="text-sm text-gray-500">Active Clients</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold text-orange-600">T</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {programs.reduce(
                  (acc, p) => acc + (p.exercises?.length || 0),
                  0
                )}
              </p>
              <p className="text-sm text-gray-500">Exercises in Programs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-8">
        {/* Recent Programs */}
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
              <p className="text-gray-500 text-center py-4">No programs yet</p>
            ) : (
              <div className="space-y-4">
                {programs.slice(0, 5).map((program) => (
                  <Link
                    key={program.workoutProgramId}
                    href={`/programs/${program.workoutProgramId}`}
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

        {/* Quick Actions Panel */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Quick Actions
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <Link
              href="/programs/new"
              className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">+</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">
                  Create New Program
                </h3>
                <p className="text-sm text-gray-500">
                  Design a new workout program
                </p>
              </div>
            </Link>

            <Link
              href="/exercises/new"
              className="flex items-center gap-4 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">+</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">
                  Create New Exercise
                </h3>
                <p className="text-sm text-gray-500">
                  Add a new exercise to your library
                </p>
              </div>
            </Link>

            {isTrainer && (
              <Link
                href="/clients"
                className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl font-bold">C</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Manage Clients</h3>
                  <p className="text-sm text-gray-500">
                    View and manage your clients
                  </p>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
