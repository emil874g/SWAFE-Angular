"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import apiService from "@/services/api";
import { Exercise, CreateExerciseDto, UpdateExerciseDto } from "@/types";
import { useAuth } from "@/contexts/AuthContext";

type ViewMode = "list" | "create" | "edit";
type FilterType = "all" | "assigned" | "unassigned";

function ExercisesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  const exerciseId = searchParams.get("id");
  const mode = (searchParams.get("mode") as ViewMode) || "list";

  const isTrainer =
    user?.accountType === "PersonalTrainer" || user?.accountType === "Manager";

  // Navigation helpers
  const goToList = () => router.push("/exercises");
  const goToEdit = (id: number) => router.push(`/exercises?id=${id}&mode=edit`);
  const goToCreate = () => router.push("/exercises?mode=create");

  return (
    <div className="max-w-7xl mx-auto px-8 py-8">
      {mode === "list" && (
        <ExerciseList
          isTrainer={isTrainer}
          onEdit={goToEdit}
          onCreate={goToCreate}
        />
      )}
      {mode === "create" && (
        <ExerciseForm
          isTrainer={isTrainer}
          onBack={goToList}
          onSuccess={goToList}
        />
      )}
      {mode === "edit" && exerciseId && (
        <ExerciseForm
          id={parseInt(exerciseId)}
          isTrainer={isTrainer}
          onBack={goToList}
          onSuccess={goToList}
        />
      )}
    </div>
  );
}

export default function ExercisesPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ExercisesContent />
    </Suspense>
  );
}

// ============ LIST VIEW ============
function ExerciseList({
  isTrainer,
  onEdit,
  onCreate,
}: {
  isTrainer: boolean;
  onEdit: (id: number) => void;
  onCreate: () => void;
}) {
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

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this exercise?")) return;
    try {
      await apiService.deleteExercise(id);
      setExercises(exercises.filter((e) => e.exerciseId !== id));
    } catch {
      alert("Failed to delete exercise");
    }
  };

  const filteredExercises = exercises.filter((exercise) => {
    if (filter === "assigned") return exercise.workoutProgramId !== null;
    if (filter === "unassigned") return exercise.workoutProgramId === null;
    return true;
  });

  if (isLoading) return <LoadingSpinner />;

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
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
          >
            + New Exercise
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
                ? "bg-blue-600 text-white"
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
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
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
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {exercise.workoutProgramId ? "Assigned" : "Unassigned"}
                    </span>
                  </td>
                  {isTrainer && (
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => onEdit(exercise.exerciseId)}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(exercise.exerciseId)}
                        className="text-red-600 hover:underline text-sm"
                      >
                        Delete
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

// ============ CREATE/EDIT FORM ============
function ExerciseForm({
  id,
  isTrainer,
  onBack,
  onSuccess,
}: {
  id?: number;
  isTrainer: boolean;
  onBack: () => void;
  onSuccess: () => void;
}) {
  const isEdit = !!id;
  const [formData, setFormData] = useState<CreateExerciseDto>({
    name: "",
    description: "",
    sets: 3,
    repetitions: 10,
    time: "",
  });
  const [isLoading, setIsLoading] = useState(isEdit);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      apiService
        .getExercise(id)
        .then((exercise) => {
          setFormData({
            name: exercise.name,
            description: exercise.description,
            sets: exercise.sets,
            repetitions: exercise.repetitions,
            time: exercise.time,
          });
        })
        .catch(() => setError("Failed to load exercise"))
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");

    try {
      if (isEdit && id) {
        await apiService.updateExercise(id, {
          exerciseId: id,
          ...formData,
        } as UpdateExerciseDto);
      } else {
        await apiService.createExercise(formData);
      }
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save exercise");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <button
        onClick={onBack}
        className="text-blue-600 hover:underline text-sm mb-6 block"
      >
        ← Back to Exercises
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden max-w-2xl">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">
            {isEdit ? "Edit Exercise" : "Create New Exercise"}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && <ErrorMessage message={error} />}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Exercise Name
            </label>
            <input
              type="text"
              value={formData.name || ""}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
              placeholder="e.g., Bench Press"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description || ""}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
              rows={3}
              placeholder="Describe the exercise..."
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sets
              </label>
              <input
                type="number"
                value={formData.sets || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sets: parseInt(e.target.value) || null,
                  })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                placeholder="3"
                min="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Repetitions
              </label>
              <input
                type="number"
                value={formData.repetitions || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    repetitions: parseInt(e.target.value) || null,
                  })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                placeholder="10"
                min="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time
              </label>
              <input
                type="text"
                value={formData.time || ""}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                placeholder="30 seconds"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              {isSaving
                ? "Saving..."
                : isEdit
                ? "Save Changes"
                : "Create Exercise"}
            </button>
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

// ============ SHARED COMPONENTS ============
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
}

function ErrorMessage({
  message,
  onBack,
}: {
  message: string;
  onBack?: () => void;
}) {
  return (
    <div>
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        {message}
      </div>
      {onBack && (
        <button onClick={onBack} className="mt-4 text-blue-600 hover:underline">
          ← Back
        </button>
      )}
    </div>
  );
}

function EmptyState({
  icon,
  title,
  message,
  children,
}: {
  icon: string;
  title: string;
  message: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6">{message}</p>
      {children}
    </div>
  );
}
