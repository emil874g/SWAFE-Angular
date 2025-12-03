"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

import { ProgramList, ProgramDetail, ProgramForm } from "@/components/programs";

type ViewMode = "list" | "view" | "create" | "edit";

function ProgramsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  const programId = searchParams.get("id");
  const mode =
    (searchParams.get("mode") as ViewMode) || (programId ? "view" : "list");

  const isTrainer =
    user?.accountType === "PersonalTrainer" || user?.accountType === "Manager";

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
    <Suspense fallback={null}>
      <ProgramsContent />
    </Suspense>
  );
}
