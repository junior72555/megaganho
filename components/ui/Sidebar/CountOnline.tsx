"use client"
import { UserIcon } from "@heroicons/react/20/solid";

export default function CountOnline() {

  return (
    <div className="flex h-10 bg-zinc-800 items-center justify-center rounded font-bold gap-2 text-sm">
      <UserIcon className="w-4 h-4 text-green-500" />
      147 Jogadores Online
    </div>
  )
}