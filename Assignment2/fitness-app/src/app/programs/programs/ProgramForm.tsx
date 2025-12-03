"use client";

import { useState, useEffect } from "react";
import apiService from "@/services/api";
import { CreateWorkoutDto, UpdateWorkoutDto, User } from "@/types";
import { LoadingSpinner, ErrorMessage } from "@/components/ui";

interface ProgramFormProps {
  id?: number;
  isTrainer: boolean;
  onBack: () => void;
  onSuccess: (id: number) => void;
}

export default function ProgramForm({
  id,
  isTrainer,
  onBack,
  onSuccess,
}: ProgramFormProps) {
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
export { default as ProgramForm } from "./ProgramForm";
