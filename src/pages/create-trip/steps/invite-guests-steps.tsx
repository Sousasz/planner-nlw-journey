import { ArrowRight, UserRoundPlus } from "lucide-react";
import { Button } from "../../../components/button";

interface InviteGuestsStepsProps {
  openGuestModal: () => void;
  emailsToInvite: string[];
  openConfirmationModal: () => void;
}

export function InviteGuestsSteps({
  openGuestModal,
  emailsToInvite,
  openConfirmationModal,
}: InviteGuestsStepsProps) {
  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <button
        type="button"
        onClick={openGuestModal}
        className="flex items-center gap-2 flex-1"
      >
        <UserRoundPlus className="size-5 text-zinc-400" />
        {emailsToInvite.length > 0 ? (
          <span className="text-left text-lg">
            {emailsToInvite.length} pessoa(s) convidada(s)
          </span>
        ) : (
          <span className="text-zinc-400 text-left text-lg placeholder-zinc-400 focus: outline-none flex-1">
            Quem estará na viagem?
          </span>
        )}
      </button>
      <div className="w-px h-6 bg-zinc-800" />

      <Button onClick={openConfirmationModal} buttonType="primary">
        <p>Confirmar viagem</p>
        <ArrowRight className="size-5" />
      </Button>
    </div>
  );
}
