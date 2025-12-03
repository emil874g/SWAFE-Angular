"use client";

import { useState, useEffect } from "react";
import apiService from "@/services/api";
import { WorkoutProgram } from "@/types";
import { ErrorMessage, EmptyState } from "@/components/ui";

interface ProgramListProps {
  isTrainer: boolean;
  onView: (id: number) => void;
  onCreate: () => void;
}

export default function ProgramList({
  isTrainer,
  onView,
  onCreate,
}: ProgramListProps) {
  const [programs, setPrograms] = useState<WorkoutProgram[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiService
      .getWorkoutPrograms()
      .then(setPrograms)
      .catch(() => setError("Failed to load programs"))
      .finally(() => setIsLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this program?")) return;
    try {
      await apiService.deleteWorkoutProgram(id);
      setPrograms(programs.filter((p) => p.workoutProgramId !== id));
    } catch {
      alert("Failed to delete program");
    }
  };

  if (isLoading) return null;

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Workout Programs</h1>
          <p className="mt-2 text-gray-600">
            Manage your workout programs and exercises
          </p>
        </div>
        {isTrainer && (
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
          message="Get started by creating your first workout program"
        >
          {isTrainer && (
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
              <div className="flex gap-2">
                <button
                  onClick={() => onView(program.workoutProgramId)}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm"
                >
                  View
                </button>
                {isTrainer && (
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
export { default as ProgramList } from "./ProgramList";
