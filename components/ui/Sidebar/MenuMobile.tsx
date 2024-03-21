"use client"
import Link from "next/link";

export default function MenuMobile() {

  return (
    <div className="fixed md:hidden z-[9999] bg-zinc-700/80 backdrop-blur-sm  border-t border-zinc-700 w-full h-30 bottom-0 p-5">
      <div className="w-full h-full flex items-center justify-evenly">
        <Link
          href="/"
          className="cursor-pointer h-full flex flex-col items-center gap-2 text-base font-semibold hover:text-green-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <path
              fill="#737576"
              d="M3 9.847a3 3 0 011.007-2.242l5.336-4.743a4 4 0 015.315 0l5.335 4.743A3 3 0 0121 9.847V18a4 4 0 01-4 4H7a4 4 0 01-4-4V9.847z"
            ></path>
            <path fill="#FDFFFF" d="M8 18a4 4 0 118 0v4H8v-4z"></path>
          </svg>

          <div>Home</div>
        </Link>
        <div
          className="cursor-pointer h-full flex flex-col items-center gap-2 text-base font-semibold hover:text-green-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle cx="7" cy="7" r="3" fill="#737576"></circle>
            <circle cx="17" cy="17" r="3" fill="#FDFFFF"></circle>
            <circle cx="7" cy="17" r="3" fill="#737576"></circle>
            <circle cx="17" cy="7" r="3" fill="#737576"></circle>
          </svg>
          <div>Menu</div>
        </div>
        <Link
          href="/"
          className="cursor-pointer h-full flex flex-col items-center gap-2 text-base font-semibold hover:text-green-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              fill="#FDFFFF"
              d="M15 21H6a3 3 0 01-3-3V6a3 3 0 013-3h9a3 3 0 013 3v12a3 3 0 01-3 3z"
              opacity="0.35"
            ></path>
            <path
              fill="#FDFFFF"
              d="M19.318 3.841l-2.916-.478A2.986 2.986 0 0118 6v12a3 3 0 01-3 3h-2.193l3.757.616a3 3 0 003.446-2.475l1.78-11.855a2.998 2.998 0 00-2.473-3.445zM10.05 11.5v1.8a1.8 1.8 0 01-1.8 1.8.45.45 0 100 .9h4.5a.45.45 0 100-.9 1.8 1.8 0 01-1.8-1.8v-1.8h-.9z"
            ></path>
            <path
              fill="#FDFFFF"
              d="M14.275 9.975c-.42-.42-2.962-2.535-3.139-2.71a.895.895 0 00-1.272 0c-.177.175-2.719 2.29-3.139 2.71a2.474 2.474 0 103.5 3.5c.105-.105.193-.219.275-.337.082.117.17.232.275.337a2.474 2.474 0 103.5-3.5z"
            ></path>
          </svg>
          <div>Jogos</div>
        </Link>
      </div>
    </div>
  )
}