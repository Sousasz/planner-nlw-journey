import { CircleCheck } from "lucide-react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from 'date-fns'
import { ptBR } from "date-fns/locale";

interface Activity {
  date: string,
  activities: {
    id: string,
    title: string,
    occurs_at: string
  }[]
}

export function Activities() {

  const { tripId } = useParams()
  const [activities, setActivities] = useState<Activity[]>()

  useEffect(() => {
    api
      .get(`/trips/${tripId}/activities`)
      .then((response) => setActivities(response.data.activities));
  }, [tripId]);
  
  return(
    <div className="space-y-8">
      {activities?.map(category => {
        return(
          <div key={category.date} className="space-y-2.5">
            <div className="flex gap-2 items-baseline">
              <span className="text-zinc-300 font-semibold text-xl">
                Dia {format(category.date, "d")}
              </span>
              <span className="text-xs text-zinc-500">{format(category.date, "EEEE", {locale: ptBR})}</span>
            </div>
            {category.activities.length > 0 ? (
              <div>
                {category.activities.map(activity => {
                  return(
                    <div key={activity.id} className="space-y-2.5">
                      <div className="my-2 px-4 py-2.5 bg-zinc-900 shadow-shape rounded-xl gap-3 flex items-center">
                        <CircleCheck className="size-5 text-lime-300" />
                        <span className="text-zinc-100">{activity.title}</span>
                        <span className="text-zinc-400 text-sm ml-auto">{format(activity.occurs_at, "hh':'mm'h'")}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            ): (
              <p className="text-sm text-zinc-500">Nenhuma atividade cadastrada nessa data</p>
            )}
            
        </div>
        )
      })}

      {/* <div className="space-y-2.5">
        <div className="flex gap-2 items-baseline">
          <span className="text-zinc-300 font-semibold text-xl">
            Dia 18
          </span>
          <span className="text-xs text-zinc-500">Domingo</span>
        </div>

        <div className="space-y-2.5">
          <div className="px-4 py-2.5 bg-zinc-900 shadow-shape rounded-xl gap-3 flex items-center">
            <CircleCheck className="size-5 text-lime-300" />
            <span className="text-zinc-100">Academia em grupo</span>
            <span className="text-zinc-400 text-sm ml-auto">08:00h</span>
          </div>
        </div>

        <div className="space-y-2.5">
          <div className="px-4 py-2.5 bg-zinc-900 shadow-shape rounded-xl gap-3 flex items-center">
            <CircleCheck className="size-5 text-lime-300" />
            <span className="text-zinc-100">Academia em grupo</span>
            <span className="text-zinc-400 text-sm ml-auto">08:00h</span>
          </div>
        </div>
      </div> */}
    </div>
  )
}