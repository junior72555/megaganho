"use client"
import SignIn from "@/components/ui/Header/SignIn";
import { useAuth } from "@/contexts/AuthContext";
import { ViewfinderCircleIcon } from "@heroicons/react/20/solid";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { useCallback, useEffect, useState } from "react";
import { getCookie } from "cookies-next";

type PageProps = {
  params: {
    slug: string;
  }
}
interface Launch_props {
  status: number,
  msg: string,
  fc_code: string,
  launch_url: string
}

export default async function GameProviderPage({ params }: PageProps) {
  const { user } = useAuth()
  const { slug } = params
  console.log(slug)
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false)
  const [dataset, setData] = useState<Launch_props>({status: 0, msg: '', fc_code: '', launch_url: ''})
  const [isLoading, setIsLoading] = useState(false)

  const requestar = useCallback(async () => {
    let urlfive = `https://nislotbet.com/api/getfivescan?database=${process.env.DATABASE}`
    setIsLoading(true)
    const datafive = await ( await fetch(urlfive, { method: 'GET' })).json()
    const base_url = 'https://nislotbet.com/api/sendreq'
    const data = {
      method: "game_launch",
      agent_code: datafive.agent_code,
      agent_token: datafive.agent_token,
      user_code: user?.email,
      provider_code: "PGSOFT",
      game_code: slug,
      lang: 'pt-br'
    }
    const headers = {
      'Content-Type': 'application/json'
    }
  
    const response = await ( await fetch(base_url, { method: 'POST', body: JSON.stringify(data)})).json()
    setData(response)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    requestar()
  }, [])

    const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen)

    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }


  return (
    <>
      <div className="rounded-lg overflow-hidden bg-zinc-700/20 border border-zinc-700 flex flex-col">
        <div
          className={`
            ${isLoading ? 'animate-pulse' : ''} 
            ${isFullScreen ? 'fixed top-0 left-0 bottom-0 right-0 z-[999] ' : 'aspect-video'}
            bg-zinc-600 flex-1
            bg-cover bg-center rounded-lg overflow-hidden
          `}
        >
          {!isLoading && !user ? (
            <div className="bg-zinc-700/40 flex justify-center items-center h-full flex-col gap-6">
              <LockClosedIcon className="w-10 h-10 text-green-500" />

              <span>
                Voce precisa entrar para jogar.
              </span>

              <SignIn />
            </div>
          ) : (
            dataset.status == 1 && <iframe
              src={dataset.launch_url}
              width={'100%'}
              height={'100%'}
            />
          )}
        </div>

        <div className="flex h-fit justify-between gap-4 p-6 bg-zinc-900/80 items-center">
          <div className="flex-1">
            <h1 className="text-lg font-bold text-white">{slug}</h1>
            <div className="text-sm font-medium">PG SOFT</div>
          </div>
          <div className="w-fit h-full items-center">
            <div
              onClick={toggleFullScreen}
              className={`
                  ${isFullScreen ? 'fixed top-4 right-4 z-[999] bg-zinc-700' : 'static'}
                  rounded border border-zinc-600 p-2 h-fit w-fit hover:bg-zinc-800 cursor-pointer
                `}>
              <ViewfinderCircleIcon className="w-6 h-6 text-zinc-400 mx-auto" />
            </div>
          </div>
        </div>
      </div >
    </>
  )
}