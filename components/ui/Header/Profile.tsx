"use client"
import { useModal } from "@/contexts/ModalContext";
import BalanceProfile from "./BalanceProfile";
import UserMenu from "./UserMenu";

export default function Profile() {
  const { setOpenModal } = useModal()
  return (
    <div className="flex gap-2 items-center">
      <div
        onClick={() => setOpenModal('deposit')}
        className="h-10 flex first:items-center cursor-pointer md:mx-2 rounded shadow-green shadow-green-500 bg-green-500 text-zinc-900 hover:bg-green-700 px-2 py-2 text-center font-bold text-xs md:text-sm">
        Depositar
      </div>

      <BalanceProfile />
      <UserMenu />
    </div >
  )
}