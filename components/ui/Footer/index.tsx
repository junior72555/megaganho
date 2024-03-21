"use client"
import Logo from "@/components/Logo";
import { useModal } from "@/contexts/ModalContext";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const { setOpenModal } = useModal()

  return (
    <div className="w-full bg-zinc-900 py-6">
      <div className="flex flex-col md:flex-row justify-between px-4 md:px-6 py-6 mx-auto w-[calc(98vw)] md:w-[calc(100vw-18rem)] lg:max-w-6xl gap-4">
        <div className="w-full md:w-3/12 flex flex-col gap-8">
          <Logo />

          <Image src={`/${process.env.NEXT_PUBLIC_SITE_NAME}/gaming-curacao.png`} width={180} height={69} alt="Gaming Curacao" />
        </div>

        <div className="flex-1 flex gap-2 md:gap-4">
          <div className="w-full">
            <h3 className="text-sm text-white font-bold uppercase mb-4">Jogos</h3>
            <ul className="flex flex-col gap-2">
              {/* <li>
                <Link href={'/crash'} className="text-sm text-zinc-400 hover:text-zinc-200">Crash</Link>
              </li> */}
              <li>
                <Link href={'/double'} className="text-sm text-zinc-400 hover:text-zinc-200">Double</Link>
              </li>
              <li>
                <Link href={'/mines'} className="text-sm text-zinc-400 hover:text-zinc-200">Mines</Link>
              </li>
              <li>
                <Link href={'/dice'} className="text-sm text-zinc-400 hover:text-zinc-200">Dice</Link>
              </li>
              <li>
                <Link href={'/tower'} className="text-sm text-zinc-400 hover:text-zinc-200">Tower</Link>
              </li>
            </ul>
          </div>
          <div className="w-full">
            <h3 className="text-sm text-white font-bold uppercase mb-4">Links</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href={'/user/account'} className="text-sm text-zinc-400 hover:text-zinc-200">Conta</Link>
              </li>
              <li>
                <div
                  onClick={() => setOpenModal('deposit')}
                  className="cursor-pointer text-sm text-zinc-400 hover:text-zinc-200">Depositar</div>
              </li>
              <li>
                <div
                  onClick={() => setOpenModal('withdraw')}
                  className="cursor-pointer text-sm text-zinc-400 hover:text-zinc-200">Sacar</div>
              </li>
            </ul>
          </div>
          <div className="w-full">
            <h3 className="text-sm text-white font-bold uppercase mb-4">Siga-nos</h3>
            <ul className="flex gap-2 w-full flex-wrap">
              {
                process.env.NEXT_PUBLIC_FOOTER_INSTAGRAM &&
                <li className="w-8 h-8">
                  <Link href={process.env.NEXT_PUBLIC_FOOTER_INSTAGRAM} className="w-8 h-8 flex items-center justify-center text-sm text-zinc-900 hover:text-zinc-900 rounded-full bg-zinc-400 hover:bg-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4">
                      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                    </svg>
                  </Link>
                </li>
              }
              {
                process.env.NEXT_PUBLIC_FOOTER_TELEGRAM &&
                <li className="w-8 h-8">
                  <Link
                    href={process.env.NEXT_PUBLIC_FOOTER_TELEGRAM}
                    className="w-8 h-8 flex items-center justify-center text-sm text-zinc-900 hover:text-zinc-900 rounded-full bg-zinc-400 hover:bg-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-4 h-4">
                      <rect width="256" height="256" fill="none" />
                      <path d="M88,134.87,178.26,214a8,8,0,0,0,13.09-4.21L232,33.22a1,1,0,0,0-1.34-1.15L28,111.38A6.23,6.23,0,0,0,29,123.3Z" fill="none" stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="16" />
                      <line x1="88" y1="134.87" x2="231.41" y2="32.09" fill="none" stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="16" /><path d="M132.37,173.78l-30.61,31.76A8,8,0,0,1,88,200V134.87" fill="none" stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="16" />
                    </svg>
                  </Link>
                </li>
              }
              {
                process.env.NEXT_PUBLIC_FOOTER_FACEBOOK &&
                <li className="w-8 h-8">
                  <Link
                    href={process.env.NEXT_PUBLIC_FOOTER_FACEBOOK}
                    className="w-8 h-8 flex items-center justify-center text-sm text-zinc-900 hover:text-zinc-900 rounded-full bg-zinc-400 hover:bg-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-4 h-4">
                      <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
                    </svg>
                  </Link>
                </li>
              }
              {
                process.env.NEXT_PUBLIC_FOOTER_TWITTER &&
                <li className="w-8 h-8">
                  <Link
                    href={process.env.NEXT_PUBLIC_FOOTER_TWITTER}
                    className="w-8 h-8 flex items-center justify-center text-sm text-zinc-900 hover:text-zinc-900 rounded-full bg-zinc-400 hover:bg-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4">
                      <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
                    </svg>
                  </Link>
                </li>
              }
              {
                process.env.NEXT_PUBLIC_FOOTER_YOUTUBE &&
                <li className="w-8 h-8">
                  <Link
                    href={process.env.NEXT_PUBLIC_FOOTER_YOUTUBE}
                    className="w-8 h-8 flex items-center justify-center text-sm text-zinc-900 hover:text-zinc-900 rounded-full bg-zinc-400 hover:bg-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-4 h-4">
                      <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path>
                    </svg>
                  </Link>
                </li>
              }
              {
                process.env.NEXT_PUBLIC_FOOTER_TIKTOK &&
                <li className="w-8 h-8">
                  <Link
                    href={process.env.NEXT_PUBLIC_FOOTER_TIKTOK}
                    className="w-8 h-8 flex items-center justify-center text-sm text-zinc-900 hover:text-zinc-900 rounded-full bg-zinc-400 hover:bg-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4">
                      <path d="M448 209.91a210.06 210.06 0 01-122.77-39.25v178.72A162.55 162.55 0 11185 188.31v89.89a74.62 74.62 0 1052.23 71.18V0h88a121.18 121.18 0 001.86 22.17A122.18 122.18 0 00381 102.39a121.43 121.43 0 0067 20.14z"></path>
                    </svg>
                  </Link>
                </li>
              }
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-zinc-400 py-10 px-4 md:px-6 border-t border-zinc-600 mx-auto  w-[calc(98vw)] md:w-[calc(100vw-18rem)] lg:max-w-6xl">
        <p className="mb-4">
          {process.env.NEXT_PUBLIC_SITE_NAME} é um site de apostas esportivas e cassino online, que oferece aos seus usuários uma experiência única de apostas em diversos esportes, incluindo futebol, basquete, tênis, vôlei, entre outros. Com uma plataforma intuitiva e fácil de usar, {process.env.NEXT_PUBLIC_SITE_NAME} permite que seus usuários apostem em jogos ao vivo, além de oferecer uma ampla variedade de opções de apostas pré-jogo.
        </p>
        <p className="mb-4">
          Com o objetivo de proporcionar a melhor experiência de apostas aos seus usuários, {process.env.NEXT_PUBLIC_SITE_NAME} oferece uma ampla gama de recursos e ferramentas, incluindo estatísticas detalhadas dos jogos, histórico de resultados, análises de especialistas e muito mais. Além disso, o site oferece diversas promoções e bônus exclusivos para seus usuários, aumentando as chances de lucro e proporcionando uma experiência ainda mais emocionante.
        </p>
        <p className="mb-4">
          {process.env.NEXT_PUBLIC_SITE_NAME} é uma plataforma segura e confiável, que oferece suporte ao cliente 24 horas por dia, sete dias por semana. Com uma equipe de especialistas em apostas esportivas e cassino online, {process.env.NEXT_PUBLIC_SITE_NAME} está comprometida em garantir que seus usuários tenham uma experiência positiva e segura, e possam desfrutar de todas as emoções e oportunidades oferecidas pelas apostas esportivas de forma responsável e consciente.
        </p>
      </div>

      <div className="text-center text-xs text-zinc-400 py-5 px-4 md:px-6 border-t border-zinc-600 mx-auto  w-[calc(98vw)] md:w-[calc(100vw-18rem)] lg:max-w-6xl">
        Este site oferece jogos com experiência de risco. Para ser um usuário do nosso site, você deve ter mais de 18 anos.
        <br />
        Não somos responsáveis pela violação de suas leis locais relacionadas ao i-gambling.
      </div>

      <div className="flex justify-between text-xs text-zinc-400 py-5 px-4 md:px-6 border-t border-zinc-600 mx-auto  w-[calc(98vw)] md:w-[calc(100vw-18rem)] lg:max-w-6xl">
        <div>
          © {process.env.NEXT_PUBLIC_SITE_NAME} | {new Date().getFullYear()} - Todos os direitos reservados.
        </div>
        <Link
          href={'#'}
        >
        </Link>
      </div>
    </div>
  )
}
