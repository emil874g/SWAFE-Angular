"use client";

import { useState, useEffect } from "react";
import apiService from "@/services/api";
import { Exercise } from "@/types";
import { ErrorMessage, EmptyState } from "@/components/ui";

type FilterType = "all" | "assigned" | "unassigned";

interface ExerciseListProps {
  isTrainer: boolean;
  onEdit: (id: number) => void;
  onCreate: () => void;
}

export default function ExerciseList({
  isTrainer,
  onEdit,
  onCreate,
}: ExerciseListProps) {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  useEffect(() => {
    apiService
      .getExercises()
      .then(setExercises)
      .catch(() => setError("Failed to load exercises"))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredExercises = exercises.filter((exercise) => {
    if (filter === "assigned") return exercise.workoutProgramId !== null;
    if (filter === "unassigned") return exercise.workoutProgramId === null;
    return true;
  });

  if (isLoading) return null;

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Exercises</h1>
          <p className="mt-2 text-gray-600">Manage your exercise library</p>
        </div>
        {isTrainer && (
          <button
            onClick={onCreate}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700"
          >
            New Exercise
          </button>
        )}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6">
        {(["all", "assigned", "unassigned"] as FilterType[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f
                ? "bg-teal-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {error && <ErrorMessage message={error} />}

      {filteredExercises.length === 0 ? (
        <EmptyState
          icon=""
          title="No exercises found"
          message={
            filter === "all"
              ? "Get started by creating your first exercise"
              : `No ${filter} exercises`
          }
        >
          {isTrainer && filter === "all" && (
            <button
              onClick={onCreate}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg"
            >
              Create Exercise
            </button>
          )}
        </EmptyState>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Exercise
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Sets × Reps
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                {isTrainer && (
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredExercises.map((exercise) => (
                <tr key={exercise.exerciseId} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">
                      {exercise.name || "Unnamed"}
                    </div>
                    <div className="text-sm text-gray-500 line-clamp-1">
                      {exercise.description || "No description"}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {exercise.sets || "-"} × {exercise.repetitions || "-"}
                    {exercise.time && (
                      <span className="ml-2 text-gray-400">
                        ({exercise.time})
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs rounded-full ${
                        exercise.workoutProgramId
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {exercise.workoutProgramId ? "Assigned" : "Unassigned"}
                    </span>
                  </td>
                  {isTrainer && (
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => onEdit(exercise.exerciseId)}
                        className="text-teal-600 hover:underline text-sm"
                      >
                        Edit
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export { default as ExerciseList } from "./ExerciseList";
