import { Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";

interface Trip {
  destination: string;
  ends_at: string;
  id: string;
  is_confirmed: boolean;
  starts_at: string;
}

export function Header() {
  // Usar parâmetro da URL para buscar os dados da viagem
  const { tripId } = useParams();
  const [trip, setTrip] = useState<Trip | undefined>();

  // A função somente será executada novamente se o tripId for alterado
  useEffect(() => {
    api.get(`trips/${tripId}`).then((response) => setTrip(response.data.trip));
  }, [tripId]);

  const displayedDate = trip ? 
  format(trip.starts_at, "d ' de ' LLL").concat( " até ").concat(format(trip.ends_at, "d ' de ' LLL"))
  : null


  return (
    <div className="px-6 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <p className="text-zinc-100">{trip?.destination}</p>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <p className="text-zinc-100">{displayedDate}</p>
        </div>

        <div className="w-px h-6 bg-zinc-800" />

        <Button buttonType="secondary">
          <p>Alterar local/data</p>
          <Settings2 className="size-5" />
        </Button>
      </div>
    </div>
  );
}
