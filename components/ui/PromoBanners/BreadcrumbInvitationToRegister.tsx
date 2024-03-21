import './style.css'

export default function BreadcrumbInvitationToRegister() {
  return (
    <div className="hidden lg:flex w-full rounded-2xl  justify-center items-center flex-wrap gap-y-4">
      <div className="dark-arrow w-[366px] h-[56px] flex gap-2 items-center justify-center">
        <span className="-ml-10 text-green-500 drop-shadow-green font-bold">01</span>
        <span className="text-sm font-medium">Cadastre-se</span>
      </div>
      <div className="dark-arrow w-[366px] h-[56px] flex gap-2 items-center justify-center">
        <span className="-ml-10 text-green-500 drop-shadow-green font-bold">02</span>
        <span className="text-sm font-medium">Deposite e jogue</span>
      </div>
      <div className="dark-arrow w-[366px] h-[56px] flex gap-2 items-center justify-center">
        <span className="-ml-10 text-green-500 drop-shadow-green font-bold">03</span>
        <span className="text-sm font-medium">Ganhe recompensas</span>
      </div>
    </div>
  )
}