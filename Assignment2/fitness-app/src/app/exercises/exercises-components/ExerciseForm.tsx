"use client";

import { useState, useEffect } from "react";
import apiService from "@/services/api";
import { CreateExerciseDto, UpdateExerciseDto } from "@/types";
import { ErrorMessage } from "@/components/ui";

interface ExerciseFormProps {
  id?: number;
  isTrainer: boolean;
  onBack: () => void;
  onSuccess: () => void;
}

export default function ExerciseForm({
  id,
  isTrainer,
  onBack,
  onSuccess,
}: ExerciseFormProps) {
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

  if (isLoading) return null;

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
export { default as ExerciseForm } from "./ExerciseForm";
