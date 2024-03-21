"use client"
import { useModal } from "@/contexts/ModalContext"
import { ArrowRightOnRectangleIcon } from '@heroicons/react/20/solid'
import { useEffect } from "react";

export default function SignIn() {
  const { setOpenModal } = useModal();
  const bgGradient = { background: 'linear-gradient(to bottom, rgb(47 184 255), rgb(47 104 255))!important' };
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    if (urlSearchParams.has('ref')) {
      setOpenModal('register');
    }
  }, []);

  return (
    <div className="h-11 flex gap-4 items-center">
      <div
        onClick={() => setOpenModal('login')}
        className="font-bold hover:text-white/70 text-sm cursor-pointer">
        Entrar
      </div>

      <div
        onClick={() => setOpenModal('register')}
	style={bgGradient}
        className="h-11 items-center cursor-pointer rounded flex gap-1 shadow-green shadow-green-500 bg-green-500 text-zinc-900 hover:bg-blue-600 px-3 py-2 text-center font-bold text-sm">
        <ArrowRightOnRectangleIcon width={16} />
        Cadastre-se
      </div>
    </div>
  )
}
