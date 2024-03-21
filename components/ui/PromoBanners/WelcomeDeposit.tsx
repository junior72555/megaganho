"use client"
import { useModal } from "@/contexts/ModalContext"

export default function WelcomeDeposit() {
  const { setOpenModal } = useModal()

  return (
    <div className="flex w-full flex-col gap-4 justify-center relative rounded-2xl bg-no-repeat bg-right-bottom py-6 lg:justify-between items-center bg-zinc-700 overflow-hidden">
      <div
        onClick={() => setOpenModal('deposit')}
        className="z-20 w-[90%] lg:w-fit text-center mx-4 lg:ml-14 lg:mr-14 shadow-yellow bg-yellow-500 text-zinc-900 rounded-lg font-bold uppercase  px-4 py-4 cursor-pointer  transition duration-300 ease-in-out"
      >
        Depositar
      </div >
      <div className="flex-1 min-w-[330px] z-20">
        <h2 className="text-2xl text-white font-extrabold">BEM VINDO</h2>
        <p className="text-white drop-shadow-yellow text-base lg:text-lg">
          Registre-se agora mesmo e começe <br />
          a ganhar muito dinheiro online!
        </p>
      </div>
      <div className="bg-money-rain bg-no-repeat bg-right-bottom absolute left-0 top-0 w-full h-full opacity-25 sm:opacity-25 md:opacity-25 lg:opacity-75 z-10"></div>
    </div>
  )
}