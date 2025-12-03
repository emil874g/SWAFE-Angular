"use client";

import { useState, useEffect } from "react";
import apiService from "@/services/api";
import { WorkoutProgram, CreateExerciseDto } from "@/types";
import { ErrorMessage } from "@/components/ui";

interface ProgramDetailProps {
  id: number;
  isTrainer: boolean;
  onBack: () => void;
  onEdit: (id: number) => void;
}

export default function ProgramDetail({
  id,
  isTrainer,
  onBack,
  onEdit,
}: ProgramDetailProps) {
  const [program, setProgram] = useState<WorkoutProgram | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddExercise, setShowAddExercise] = useState(false);
  const [newExercise, setNewExercise] = useState<CreateExerciseDto>({
    name: "",
    description: "",
    sets: 3,
    repetitions: 10,
    time: "",
  });

  useEffect(() => {
    apiService
      .getWorkoutProgram(id)
      .then(setProgram)
      .catch(() => setError("Failed to load program"))
      .finally(() => setIsLoading(false));
  }, [id]);

  const handleAddExercise = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!program) return;
    try {
      const exercise = await apiService.addExerciseToProgram(
        program.workoutProgramId,
        newExercise
      );
      setProgram({
        ...program,
        exercises: [...(program.exercises || []), exercise],
      });
      setShowAddExercise(false);
      setNewExercise({
        name: "",
        description: "",
        sets: 3,
        repetitions: 10,
        time: "",
      });
    } catch {
      alert("Failed to add exercise");
    }
  };

  const handleDeleteExercise = async (exerciseId: number) => {
    if (!confirm("Remove this exercise?") || !program) return;
    try {
      await apiService.deleteExercise(exerciseId);
      setProgram({
        ...program,
        exercises:
          program.exercises?.filter((e) => e.exerciseId !== exerciseId) || [],
      });
    } catch {
      alert("Failed to remove exercise");
    }
  };

  if (isLoading) return null;
  if (error || !program)
    return (
      <ErrorMessage message={error || "Program not found"} onBack={onBack} />
    );

  return (
    <>
      <button
        onClick={onBack}
        className="text-blue-600 hover:underline text-sm mb-6 block"
      >
        ← Back to Programs
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-200 flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {program.name || "Unnamed Program"}
            </h1>
            <p className="mt-2 text-gray-600">
              {program.description || "No description"}
            </p>
          </div>
          {isTrainer && (
            <button
              onClick={() => onEdit(program.workoutProgramId)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
            >
              Edit Program
            </button>
          )}
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Exercises ({program.exercises?.length || 0})
            </h2>
            {isTrainer && (
              <button
                onClick={() => setShowAddExercise(!showAddExercise)}
                className="text-blue-600 hover:underline text-sm"
              >
                {showAddExercise ? "Cancel" : "+ Add Exercise"}
              </button>
            )}
          </div>

          {showAddExercise && (
            <form
              onSubmit={handleAddExercise}
              className="bg-gray-50 p-4 rounded-lg mb-4 space-y-3"
            >
              <input
                type="text"
                placeholder="Exercise name"
                value={newExercise.name || ""}
                onChange={(e) =>
                  setNewExercise({ ...newExercise, name: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg text-gray-900"
                required
              />
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="number"
                  placeholder="Sets"
                  value={newExercise.sets || ""}
                  onChange={(e) =>
                    setNewExercise({
                      ...newExercise,
                      sets: parseInt(e.target.value) || null,
                    })
                  }
                  className="px-3 py-2 border rounded-lg text-gray-900"
                />
                <input
                  type="number"
                  placeholder="Reps"
                  value={newExercise.repetitions || ""}
                  onChange={(e) =>
                    setNewExercise({
                      ...newExercise,
                      repetitions: parseInt(e.target.value) || null,
                    })
                  }
                  className="px-3 py-2 border rounded-lg text-gray-900"
                />
                <input
                  type="text"
                  placeholder="Time"
                  value={newExercise.time || ""}
                  onChange={(e) =>
                    setNewExercise({ ...newExercise, time: e.target.value })
                  }
                  className="px-3 py-2 border rounded-lg text-gray-900"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Exercise
              </button>
            </form>
          )}

          {program.exercises?.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No exercises in this program yet.
            </p>
          ) : (
            <div className="space-y-3">
              {program.exercises?.map((exercise, index) => (
                <div
                  key={exercise.exerciseId}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {exercise.name || "Unnamed"}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {exercise.sets && `${exercise.sets} sets`}{" "}
                        {exercise.repetitions &&
                          `× ${exercise.repetitions} reps`}{" "}
                        {exercise.time && `• ${exercise.time}`}
                      </p>
                    </div>
                  </div>
                  {isTrainer && (
                    <button
                      onClick={() => handleDeleteExercise(exercise.exerciseId)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export { default as ProgramDetail } from "./ProgramDetail";
