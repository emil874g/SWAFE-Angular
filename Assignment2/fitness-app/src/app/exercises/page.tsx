"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import ExerciseList from "./exercises-components/ExerciseList";
import ExerciseForm from "./exercises-components/ExerciseForm";

type ViewMode = "list" | "create" | "edit";

function ExercisesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  const exerciseId = searchParams.get("id");
  const mode = (searchParams.get("mode") as ViewMode) || "list";

  const isTrainer =
    user?.accountType === "PersonalTrainer" || user?.accountType === "Manager";

  if (!isTrainer) {
    return (
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg">
          This page is only accessible to personal trainers and managers.
        </div>
      </div>
    );
  }

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
    <Suspense fallback={null}>
      <ExercisesContent />
    </Suspense>
  );
}
