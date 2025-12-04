"use client";

import { useState, useEffect } from "react";
import apiService from "@/services/api";
import { WorkoutProgram, User } from "@/types";
import { ErrorMessage, EmptyState } from "@/components/ui";

interface ProgramListProps {
  isTrainer: boolean;
  user: User | null;
  clientId?: number;
  onView: (id: number) => void;
  onCreate: () => void;
}

export default function ProgramList({
  isTrainer,
  user,
  clientId,
  onView,
  onCreate,
}: ProgramListProps) {
  const [programs, setPrograms] = useState<WorkoutProgram[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Only Personal Trainers can create/delete, not Managers
  const isPersonalTrainer = user?.accountType === "PersonalTrainer";

  useEffect(() => {
    const loadPrograms = async () => {
      try {
        let data: WorkoutProgram[];

        if (clientId) {
          data = await apiService.getClientPrograms(clientId);
        } else if (isTrainer) {
          data = await apiService.getTrainerPrograms();
        } else if (user?.accountType === "Client") {
          data = await apiService.getClientPrograms(user.userId);
          data = data.filter((p) => p.clientId === user.userId);
        } else {
          data = await apiService.getWorkoutPrograms();
        }

        setPrograms(data);
      } catch {
        setError("Failed to load programs");
      } finally {
        setIsLoading(false);
      }
    };

    loadPrograms();
  }, [isTrainer, user, clientId]);

  const handleDelete = async (id: number) => {
    if (!isPersonalTrainer) return;
    if (!confirm("Are you sure you want to delete this program?")) return;

    try {
      await apiService.deleteWorkoutProgram(id);
      setPrograms((prev) => prev.filter((p) => p.workoutProgramId !== id));
    } catch {
      alert("Failed to delete program");
    }
  };

  if (isLoading) return null;

  const title = clientId
    ? "Client's Programs"
    : isTrainer
    ? "Workout Programs"
    : "My Programs";

  const subtitle = clientId
    ? "Programs assigned to this client"
    : isTrainer
    ? "Manage your workout programs and exercises"
    : "View your assigned workout programs";

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="mt-2 text-gray-600">{subtitle}</p>
        </div>
        {isPersonalTrainer && !clientId && (
          <button
            onClick={onCreate}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
          >
            + New Program
          </button>
        )}
      </div>

      {error && <ErrorMessage message={error} />}

      {programs.length === 0 ? (
        <EmptyState
          icon=""
          title="No programs yet"
          message={
            clientId
              ? "This client doesn't have any programs yet"
              : isTrainer
              ? "Get started by creating your first workout program"
              : "You don't have any workout programs yet"
          }
        >
          {isPersonalTrainer && !clientId && (
            <button
              onClick={onCreate}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Create Program
            </button>
          )}
        </EmptyState>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {programs.map((program) => (
            <div
              key={program.workoutProgramId}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {program.name || "Unnamed Program"}
                </h3>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                  {program.exercises?.length || 0} exercises
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {program.description || "No description"}
              </p>
              {isPersonalTrainer && !clientId && (
                <>
                  {program.clientId && (
                    <p className="text-xs text-purple-600 mb-2">
                      ✓ Assigned to client
                    </p>
                  )}
                  {!program.clientId && (
                    <p className="text-xs text-gray-500 mb-2">○ Unassigned</p>
                  )}
                </>
              )}
              <div className="flex gap-2">
                <button
                  onClick={() => onView(program.workoutProgramId)}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm"
                >
                  View
                </button>
                {isPersonalTrainer && !clientId && (
                  <button
                    onClick={() => handleDelete(program.workoutProgramId)}
                    className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
