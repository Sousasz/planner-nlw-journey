import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InviteGuestsModal } from "./invite-guests-modal";
import { ConfirmTripModal } from "./confirm-trip-modal";
import { DestinationAndDateStep } from "./steps/destination-and-date-step";
import { InviteGuestsSteps } from "./steps/invite-guests-steps";
import { DateRange } from "react-day-picker";
import { api } from "../../lib/axios";


export function CreateTripPage() {
  const navigate = useNavigate();

  const [isTravelInputOpen, setIsTravelInputOpen] = useState(false);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([]);
  const [destination, setDestination] = useState("")
  const [selected, setSelected] = useState<DateRange | undefined>();
  const [ownerName, setOwnerName] = useState("")
  const [ownerEmail, setOwnerEmail] = useState("")
  

  function openTravelInput() {
    setIsTravelInputOpen(true);
  }

  function closeTravelInput() {
    setIsTravelInputOpen(false);
  }

  function openGuestModal() {
    setIsGuestModalOpen(true);
  }

  function closeGuestModal() {
    setIsGuestModalOpen(false);
  }

  function openConfirmationModal() {
    setConfirmationModalOpen(true);
  }

  function closeConfirmationModal() {
    setConfirmationModalOpen(false);
  }

  function removeEmailFromInvite(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(
      (emailInvited) => emailInvited !== emailToRemove
    );
    setEmailsToInvite(newEmailList);
  }

  function addNewEmailForInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString();

    if (!email) {
      return;
    }

    if (emailsToInvite.includes(email)) {
      return;
    }

    setEmailsToInvite([...emailsToInvite, email]);

    event.currentTarget.reset();
  }

  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log(destination);
    console.log(ownerEmail);
    console.log(ownerName);
    console.log(selected);
    console.log(emailsToInvite);

    if(!destination) {
      return
    }

    if(!selected?.from || !selected?.to) {
      return
    }

    if(emailsToInvite.length === 0) {
      return
    }

    if(!ownerEmail || !ownerName) {
      return 
    }

    const response = await api.post("/trips", {
      destination,
      starts_at: selected.from,
      ends_at: selected.to,
      emails_to_invite: emailsToInvite,
      owner_name: ownerName,
      owner_email: ownerEmail
    })
    

    console.log(response)
    const { tripId } = response.data

    navigate(`/trips/${tripId}`);
  }

  return (
    <div className="h-screen flex justify-center items-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex items-center flex-col gap-3">
          <img src="./public/logo.svg" alt="Logo plann.er" />
          <p className="text-zinc-300 text-lg">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>

        <div className="space-y-4">
          <DestinationAndDateStep
            closeTravelInput={closeTravelInput}
            openTravelInput={openTravelInput}
            isTravelInputOpen={isTravelInputOpen}
            setDestination={setDestination}
            setSelected={setSelected}
            selected={selected}
          />

          {isTravelInputOpen ? (
            <InviteGuestsSteps
              openGuestModal={openGuestModal}
              emailsToInvite={emailsToInvite}
              openConfirmationModal={openConfirmationModal}
            />
          ) : null}
        </div>

        <p className="text-zinc-500 text-sm">
          Ao planejar sua viagem pela plann.er você automaticamente concorda{" "}
          <br />
          com nossos{" "}
          <a href="#" className="text-zinc-300 underline">
            termos de uso
          </a>{" "}
          e{" "}
          <a href="#" className="text-zinc-300 underline">
            políticas de privacidade
          </a>
        </p>
      </div>

      {isGuestModalOpen && (
        // Componente pai que está enviando as variáveis para o filho
        <InviteGuestsModal
          emailsToInvite={emailsToInvite}
          addNewEmailForInvite={addNewEmailForInvite}
          removeEmailFromInvite={removeEmailFromInvite}
          closeGuestModal={closeGuestModal}
        />
      )}

      {confirmationModalOpen && (
        <ConfirmTripModal
          createTrip={createTrip}
          closeConfirmationModal={closeConfirmationModal}
          setOwnerName={setOwnerName}
          setOwnerEmail={setOwnerEmail}
        />
      )}
    </div>
  );
}
