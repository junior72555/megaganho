"use client"
import { XMarkIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'

export default function TopBar() {
  const [active, setActive] = useState(false)

  if (!active) return null

  return (
    <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-green-300 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="text-sm leading-6 text-zinc-900">
          <strong className="font-semibold">Alerta</strong>
          <svg viewBox="0 0 2 2" className="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true">
            <circle cx={1} cy={1} r={1} />
          </svg>
          Aqui vai um texto de alerta
        </p>
        <a
          href="#"
          className="flex-none rounded-full bg-zinc-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
        >
          Convidar <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
      <div className="flex flex-1 justify-end">
        <button
          onClick={() => setActive(false)}
          type="button" className="-m-3 p-3 focus-visible:outline-offset-[-4px]">
          <span className="sr-only">Dismiss</span>
          <XMarkIcon className="h-5 w-5 text-zinc-900" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}