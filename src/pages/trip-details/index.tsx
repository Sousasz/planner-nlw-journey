import { Plus } from "lucide-react";
import { useState } from "react";
import { CreateActivityModal } from "./create-activity-modal";
import { ImportantLinks } from "./important-links";
import { GuestsToTrip } from "./guests-to-trip";
import { Activities } from "./activities";
import { Header } from "./header";
import { Button } from "../../components/button";

export function TripDetailsPage() {
  const [createActivityModalOpen, setCreateActivityModalOpen] = useState(false);

  function openCreateActivityModal() {
    setCreateActivityModalOpen(true);
  }

  function closeCreateActivityModal() {
    setCreateActivityModalOpen(false);
  }

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <Header />

      <main className="flex px-6 gap-16">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-3xl">Atividades</h2>

            <Button onClick={openCreateActivityModal}>
              <Plus className="size-5" />
              <span>Cadastrar atividade</span>
            </Button>
          </div>

          <Activities />
        </div>

        <div className="w-80 space-y-6">
          <ImportantLinks />
          <div className="w-full h-px bg-zinc-800" />
          <GuestsToTrip />
        </div>
      </main>

      {createActivityModalOpen && (
        <CreateActivityModal
          closeCreateActivityModal={closeCreateActivityModal}
        />
      )}
    </div>
  );
}
