import Logo from "@/components/Logo";

export default function Loading() {
  return (
    <div className="z-50 w-full h-full fixed bg-zinc-900 text-white flex items-center justify-center">
      <div className='animate-pulse h-16'>
        <Logo />
      </div>
    </div>
  );
}