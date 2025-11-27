"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import apiService from "@/services/api";
import {
  WorkoutProgram,
  CreateWorkoutDto,
  UpdateWorkoutDto,
  User,
  CreateExerciseDto,
} from "@/types";
import { useAuth } from "@/contexts/AuthContext";

type ViewMode = "list" | "view" | "create" | "edit";

function ProgramsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  // Determine current mode from URL params
  const programId = searchParams.get("id");
  const mode =
    (searchParams.get("mode") as ViewMode) || (programId ? "view" : "list");

  const isTrainer =
    user?.accountType === "PersonalTrainer" || user?.accountType === "Manager";

  // Navigation helpers
  const goToList = () => router.push("/programs");
  const goToView = (id: number) => router.push(`/programs?id=${id}`);
  const goToEdit = (id: number) => router.push(`/programs?id=${id}&mode=edit`);
  const goToCreate = () => router.push("/programs?mode=create");

  return (
    <div className="max-w-7xl mx-auto px-8 py-8">
      {mode === "list" && (
        <ProgramList
          isTrainer={isTrainer}
          onView={goToView}
          onCreate={goToCreate}
        />
      )}
      {mode === "view" && programId && (
        <ProgramDetail
          id={parseInt(programId)}
          isTrainer={isTrainer}
          onBack={goToList}
          onEdit={goToEdit}
        />
      )}
      {mode === "create" && (
        <ProgramForm
          isTrainer={isTrainer}
          onBack={goToList}
          onSuccess={goToView}
        />
      )}
      {mode === "edit" && programId && (
        <ProgramForm
          id={parseInt(programId)}
          isTrainer={isTrainer}
          onBack={() => goToView(parseInt(programId))}
          onSuccess={goToView}
        />
      )}
    </div>
  );
}

export default function ProgramsPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProgramsContent />
    </Suspense>
  );
}

// ============ LIST VIEW ============
function ProgramList({
  isTrainer,
  onView,
  onCreate,
}: {
  isTrainer: boolean;
  onView: (id: number) => void;
  onCreate: () => void;
}) {
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

  if (isLoading) return <LoadingSpinner />;

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

// ============ DETAIL VIEW ============
function ProgramDetail({
  id,
  isTrainer,
  onBack,
  onEdit,
}: {
  id: number;
  isTrainer: boolean;
  onBack: () => void;
  onEdit: (id: number) => void;
}) {
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

  if (isLoading) return <LoadingSpinner />;
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

// ============ CREATE/EDIT FORM ============
function ProgramForm({
  id,
  isTrainer,
  onBack,
  onSuccess,
}: {
  id?: number;
  isTrainer: boolean;
  onBack: () => void;
  onSuccess: (id: number) => void;
}) {
  const isEdit = !!id;
  const [formData, setFormData] = useState<CreateWorkoutDto | UpdateWorkoutDto>(
    { name: "", description: "", exercises: [], clientId: null }
  );
  const [clients, setClients] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(isEdit);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientsData = await apiService.getClients();
        setClients(clientsData);

        if (id) {
          const program = await apiService.getWorkoutProgram(id);
          setFormData({
            workoutProgramId: program.workoutProgramId,
            name: program.name,
            description: program.description,
            personalTrainerId: program.personalTrainerId,
            clientId: program.clientId,
          });
        }
      } catch {
        setError("Failed to load data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");

    try {
      if (isEdit && id) {
        await apiService.updateWorkoutProgram(id, formData as UpdateWorkoutDto);
        onSuccess(id);
      } else {
        const program = await apiService.createWorkoutProgram(
          formData as CreateWorkoutDto
        );
        onSuccess(program.workoutProgramId);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save program");
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
        ← Back
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden max-w-2xl">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">
            {isEdit ? "Edit Program" : "Create New Program"}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && <ErrorMessage message={error} />}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Program Name
            </label>
            <input
              type="text"
              value={formData.name || ""}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
              placeholder="e.g., Full Body Workout"
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
              placeholder="Describe the program..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assign to Client
            </label>
            <select
              value={formData.clientId || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  clientId: e.target.value ? parseInt(e.target.value) : null,
                })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
            >
              <option value="">No client assigned</option>
              {clients.map((client) => (
                <option key={client.userId} value={client.userId}>
                  {client.firstName} {client.lastName}
                </option>
              ))}
            </select>
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
                : "Create Program"}
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
          ← Back to Programs
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
