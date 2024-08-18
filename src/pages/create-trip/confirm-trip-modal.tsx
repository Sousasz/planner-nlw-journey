import { Mail, User, X } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";
import { Input } from "../../components/input";

interface ConfirmTripModalProps {
  closeConfirmationModal: () => void;
  createTrip: (event: FormEvent<HTMLFormElement>) => void;
  setOwnerName: (name: string) => void
  setOwnerEmail: (email: string) => void
}

export function ConfirmTripModal({
  closeConfirmationModal,
  createTrip,
  setOwnerName,
  setOwnerEmail
}: ConfirmTripModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
        <div className="w-[620px] rounded-xl shadow-shape py-5 px-6 bg-zinc-900 space-y-5">
          <div className="space-y-2">
            <div className="flex items-center">
              <h2 className="flex-1 text-lg font-semibold">
                Confirmar criação de viagem
              </h2>
              <button type="button" onClick={closeConfirmationModal}>
                <X className="size-5 text-zinc-400" />
              </button>
            </div>

            <p className="text-sm text-zinc-400">
              Para concluir a criação da viagem para{" "}
              <span className="text-zinc-100 font-semibold">
                Florianópolis, Brasil
              </span>{" "}
              nas datas de{" "}
              <span className="text-zinc-100 font-semibold">
                16 a 27 de Agosto de 2024
              </span>{" "}
              preencha seus dados abaixo:
            </p>
          </div>

          <form onSubmit={createTrip} className="space-y-3">
            <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <User className="text-zinc-400 size-5" />
              <Input
                name="name"
                placeholder="Seu nome completo"
                inputSize="default"
                onChange={event => setOwnerName(event.target.value)}
              />
            </div>

            <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <Mail className="text-zinc-400 size-5" />
              <Input
                type="email"
                name="email"
                placeholder="Seu e-mail pessoal"
                inputSize="default"
                onChange={event => setOwnerEmail(event.target.value)}
              />
            </div>

            <Button type="submit" buttonSize="full">
              <p>Confirmar criação da viagem</p>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
