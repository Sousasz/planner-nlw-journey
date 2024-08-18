import { Calendar, Tag, X } from "lucide-react";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { FormEvent } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface closeCreateActivityModalProps {
  closeCreateActivityModal: () => void;
}

export function CreateActivityModal({
  closeCreateActivityModal,
}: closeCreateActivityModalProps) {

  const { tripId } = useParams()

  async function createActivity(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const data = new FormData(e.currentTarget)

    const title = data.get("title")?.toString()
    const occurs_at = data.get("occurs_at")?.toString()

    await api.post(`/trips/${tripId}/activities`, {
      title,
      occurs_at
    })

    window.document.location.reload()
}

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
        <div className="w-[620px] rounded-xl shadow-shape py-5 px-6 bg-zinc-900 space-y-5">
          <div className="space-y-2">
            <div className="flex items-center">
              <h2 className="flex-1 text-lg font-semibold">
                Cadastrar atividade
              </h2>
              <button type="button">
                <X
                  onClick={closeCreateActivityModal}
                  className="size-5 text-zinc-400"
                />
              </button>
            </div>

            <p className="text-sm text-zinc-400">
              Todos convidados podem visualizar as atividades.
            </p>
          </div>

          <form onSubmit={createActivity} className="space-y-3">
            <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <Tag className="size-5 text-zinc-400" />
              <Input
                name="title"
                placeholder="Qual a atividade?"
                inputSize="default"
              />
            </div>

            <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <Calendar className="size-5 text-zinc-400" />
              <Input
                type="datetime-local"
                name="occurs_at"
                placeholder="Data e horário da atividade"
                inputSize="default"
              />
            </div>
            <Button buttonSize="full">
              <p>Salvar atividade</p>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
