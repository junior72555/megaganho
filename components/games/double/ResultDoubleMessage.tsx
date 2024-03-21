import { useDouble } from "@/contexts/Games/DoubleContext";
import LoadingNextGameDouble from "./LoadingNextGameDouble";

export default function ResultDoubleMessage() {
  const { game } = useDouble()

  return (
    <>
      {!!game && game.status == 'finished' && (
        <div className="mt-4 h-10 text-center text-white text-base font-medium w-full">
          {process.env.NEXT_PUBLIC_SITE_NAME} girou {game.winning_number}!
        </div>
      )}

      {!!game && game.status == 'started' && (
        <div className="mt-4 h-10 text-center text-white text-base font-medium w-full">
          Girando...
        </div>
      )}

      {!!game && game.status == 'pending' && (
        <div className="pb-4 w-[90%]  mx-auto">
          <LoadingNextGameDouble date={game.pending_at} />
        </div>
      )}
    </>
  )
}