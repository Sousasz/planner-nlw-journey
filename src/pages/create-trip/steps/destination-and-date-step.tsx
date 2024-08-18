import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import { Button } from "../../../components/button";
import { Input } from "../../../components/input";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";  
import { format } from 'date-fns'
import "react-day-picker/dist/style.css";

interface DestinationAndDateStepProps {
  closeTravelInput: () => void;
  openTravelInput: () => void;
  isTravelInputOpen: boolean;
  setDestination: (destination: string) => void,
  selected: DateRange | undefined
  setSelected: (dates: DateRange | undefined) => void
}

export function DestinationAndDateStep({
  closeTravelInput,
  openTravelInput,
  isTravelInputOpen,
  setDestination,
  selected,
  setSelected
}: DestinationAndDateStepProps) {

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  function openDatePicker() {
    setIsDatePickerOpen(true);
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false);
  }
  

  const displayedDate = selected && selected.from && selected.to ? 
    format(selected.from, "d ' de ' LLL").concat( " até ").concat(format(selected.to, "d ' de ' LLL"))
    : null

  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-400" />
        <Input
          type="text"
          disabled={isTravelInputOpen}
          placeholder="Para onde você vai?"
          inputSize="default"
          onChange={event => setDestination(event.target.value)}
        />
      </div>

      <button
        onClick={openDatePicker}
        disabled={isTravelInputOpen}
        className="flex items-center gap-2 cursor-pointer w-56"
      >
        <Calendar className="size-5 text-zinc-400" />
        <span className="text-lg text-zinc-400">{ displayedDate || "Quando?" }</span>
      </button>

      {isDatePickerOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="flex items-center flex-col rounded-xl shadow-shape py-5 px-6 bg-zinc-900 space-y-5">
              <div className="space-y-2 w-full">
                <div className="flex justify-between items-center">
                  <h2 className=" text-lg font-semibold">
                    Selecione a data
                  </h2>
                  <button type="button" onClick={closeDatePicker}>
                    <X className="size-5 text-zinc-400" />
                  </button>
                </div>
              </div>
              <DayPicker mode="range" selected={selected} onSelect={setSelected} />
            </div>
          </div>
        </div>
      )}

      <div className="w-px h-6 bg-zinc-800" />

      {isTravelInputOpen ? (
        <Button onClick={closeTravelInput} buttonType="secondary">
          <p>Alterar local/data</p>
          <Settings2 className="size-5" />
        </Button>
      ) : (
        <Button onClick={openTravelInput}>
          <p>Continuar</p>
          <ArrowRight className="size-5" />
        </Button>
      )}
    </div>
  );
}
