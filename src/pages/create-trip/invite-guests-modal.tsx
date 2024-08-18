import { X, AtSign, Plus } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
  
// As propriedades são o envio de variáveis/valores do componente pai para o filho
interface InviteGuestsModalProps {
  closeGuestModal: () => void;
  emailsToInvite: string[];
  addNewEmailForInvite: (event: FormEvent<HTMLFormElement>) => void;
  removeEmailFromInvite: (emailToRemove: string) => void;
}

// Desestruturação
export function InviteGuestsModal({
  closeGuestModal,
  emailsToInvite,
  addNewEmailForInvite,
  removeEmailFromInvite,
}: InviteGuestsModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[720px] rounded-xl shadow-shape py-5 px-6 bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center">
            <h2 className="flex-1 text-lg font-semibold">
              Selecionar convidados
            </h2>
            <button type="button" onClick={closeGuestModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            Os convidados irão receber e-mails para confirmar a participação na
            viagem.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {emailsToInvite.map((email) => {
            return (
              <div
                key={email}
                className=" none py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2"
              >
                <span className="text-zinc-300">{email}</span>
                <button
                  type="button"
                  onClick={() => removeEmailFromInvite(email)}
                >
                  <X className="size-4 text-zinc-400" />
                </button>
              </div>
            );
          })}
        </div>

        <div className="w-full h-px bg-zinc-800" />

        <form
          onSubmit={addNewEmailForInvite}
          className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex flex-row items-center gap-2"
        >
          <div className="px-3 flex-1 flex items-center gap-2">
            <AtSign className="text-zinc-400 sie-5" />
            <Input
              type="email"
              name="email"
              placeholder="Digite o e-mail do convidado"
              inputSize="default"
            />
          </div>

          <Button type="submit" buttonType="primary">
            <p>Convidar</p>
            <Plus />
          </Button>
        </form>
      </div>
    </div>
  );
}
