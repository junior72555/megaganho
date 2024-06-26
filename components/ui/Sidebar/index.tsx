"use client"
import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import CountOnline from './CountOnline';
import BonusDeposit from './BonusDeposit';

export default function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  return (
    <div className={`${isMenuOpen ? 'block fixed h-full' : 'hidden'} overflow-y-auto h-full z-50 md:h-auto md:relative md:block transition-all min-w-[16rem] w-[17rem] border-r border-zinc-500 bg-zinc-700`}>
      <div className="border-b border-zinc-500 p-6 flex flex-col gap-4">
        {/* <CountOnline /> */}
        <BonusDeposit />
      </div>

      <Menu>
        {({ open }) => (
          <div className="border-b border-zinc-500 p-6  flex flex-col gap-4">
            <Menu.Button className="cursor-pointer font-bold text-xs text-zinc-400 flex justify-between">
              <span>
                CASSINO
              </span>
              {open ?
                <ChevronDownIcon width={18} fill="white" /> :
                <ChevronUpIcon width={18} fill="white" />
              }
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
              show={!open}
            >
              <Menu.Items className="flex flex-col">
                {/* <Menu.Item as={Fragment}>
                  {({ active }) => (
                    <Link
                      href={'/crash'}
                      className="hover:bg-zinc-900 text-zinc-400 hover:text-green-500 rounded-lg min-w-full py-2.5 px-4 flex gap-4 items-center"
                    >
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_29_75)">
                          <path d="M11.263 4.7143C10.8773 5.10001 10.4058 5.26287 10.2001 5.06573C9.99442 4.86858 10.2001 4.39715 10.5601 4.00287C10.9201 3.60858 11.4173 3.4543 11.623 3.65144C11.8287 3.84858 11.6573 4.31144 11.263 4.7143Z" fill="#ADADAD" />
                          <path d="M15.4286 0.428589H1.71429C1.25963 0.428589 0.823594 0.609201 0.502103 0.930691C0.180612 1.25218 0 1.68822 0 2.14287V17.5714C5.38286 17.5714 9.08571 13.9372 10.5 9.5743C10.9791 9.75756 11.4871 9.85339 12 9.85716C12.0943 9.85716 12.1714 9.85716 12.2657 9.85716C11.3343 13.1056 9.18497 15.8691 6.26571 17.5714H15.4286C15.8832 17.5714 16.3192 17.3908 16.6407 17.0693C16.9623 16.7478 17.1429 16.3118 17.1429 15.8572V2.14287C17.1429 1.68822 16.9623 1.25218 16.6407 0.930691C16.3192 0.609201 15.8832 0.428589 15.4286 0.428589ZM12 8.14287C11.4915 8.14287 10.9942 7.99206 10.5714 7.70951C10.1485 7.42695 9.81891 7.02536 9.62434 6.55549C9.42969 6.08562 9.37877 5.56859 9.47794 5.06979C9.5772 4.57098 9.82209 4.11279 10.1817 3.75317C10.5413 3.39355 10.9995 3.14865 11.4983 3.04942C11.9972 2.95021 12.5142 3.00113 12.9841 3.19575C13.4539 3.39038 13.8555 3.71997 14.1381 4.14284C14.4207 4.56571 14.5714 5.06287 14.5714 5.57145C14.5714 6.25343 14.3005 6.90748 13.8183 7.38972C13.336 7.87196 12.682 8.14287 12 8.14287Z" fill="#FDFFFF" />
                          <path d="M17.0914 1.74861C17.0914 1.67147 17.0914 1.58576 17.0229 1.50861C17.0069 1.48093 16.9926 1.4523 16.98 1.4229L16.8771 1.23433L16.8171 1.14004L16.7229 0.994328C16.6989 0.958956 16.6701 0.927203 16.6371 0.900042L16.4743 0.788613L16.3543 0.702899C16.3171 0.677828 16.2767 0.657662 16.2343 0.642899C16.1172 0.576378 15.9938 0.521817 15.8657 0.480042C15.8778 0.605467 15.8778 0.731759 15.8657 0.857185V14.7858C15.8657 15.1836 15.7077 15.5651 15.4264 15.8464C15.1451 16.1277 14.7635 16.2858 14.3657 16.2858H8.06573C7.49146 16.765 6.87787 17.1951 6.23145 17.5715H15.4286C15.8833 17.5715 16.3193 17.3908 16.6407 17.0694C16.9623 16.7479 17.1429 16.3118 17.1429 15.8572V2.1429C17.1564 2.03188 17.1564 1.91963 17.1429 1.80861C17.1297 1.78548 17.1123 1.76511 17.0914 1.74861Z" fill="#ADADAD" />
                        </g>
                        <defs>
                          <clipPath id="clip0_29_75">
                            <rect width="18" height="18" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>

                      <span
                        className={`${active && 'drop-shadow-green'} hover:shadow text-base font-bold`}
                      >Crash</span>
                    </Link>
                  )}
                </Menu.Item> */}

                <Menu.Item as={Fragment}>
                  {({ active }) => (
                    <Link
                      href={'/double'}
                      className="hover:bg-zinc-900 text-zinc-400 hover:text-green-500 rounded-lg min-w-full py-2.5 px-4 flex gap-4 items-center"
                    >
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_29_82)">
                          <path d="M0.9 5.40002H0V12.6H0.9C1.1387 12.6 1.36761 12.5052 1.5364 12.3364C1.70518 12.1677 1.8 11.9387 1.8 11.7V6.30002C1.8 6.06133 1.70518 5.83241 1.5364 5.66363C1.36761 5.49485 1.1387 5.40002 0.9 5.40002Z" fill="#FDFFFF" />
                          <path d="M17.1 5.40002C16.8613 5.40002 16.6323 5.49485 16.4636 5.66363C16.2948 5.83241 16.2 6.06133 16.2 6.30002V11.7C16.2 11.9387 16.2948 12.1677 16.4636 12.3364C16.6323 12.5052 16.8613 12.6 17.1 12.6H18V5.40002H17.1Z" fill="#FDFFFF" />
                          <path d="M8.1001 12.6V3.59998H5.4001C4.92271 3.59998 4.46487 3.78961 4.12731 4.12719C3.78974 4.46475 3.6001 4.92259 3.6001 5.39998V12.6C3.6001 13.0773 3.78974 13.5352 4.12731 13.8728C4.46487 14.2103 4.92271 14.4 5.4001 14.4H8.1001V12.6Z" fill="#ADADAD" />
                          <path d="M12.5999 3.59998H9.8999V14.4H12.5999C13.0773 14.4 13.5351 14.2103 13.8727 13.8728C14.2103 13.5352 14.3999 13.0773 14.3999 12.6V5.39998C14.3999 4.92259 14.2103 4.46475 13.8727 4.12719C13.5351 3.78961 13.0773 3.59998 12.5999 3.59998Z" fill="#ADADAD" />
                          <path d="M8.1001 17.1C8.1001 17.3387 8.19492 17.5677 8.3637 17.7364C8.53248 17.9052 8.7614 18 9.0001 18C9.23878 18 9.46774 17.9052 9.63649 17.7364C9.80524 17.5677 9.9001 17.3387 9.9001 17.1V14.4H8.1001V17.1Z" fill="#FDFFFF" />
                          <path d="M9.9001 0.9C9.9001 0.661306 9.80524 0.432387 9.63649 0.263604C9.46774 0.0948213 9.23878 0 9.0001 0C8.7614 0 8.53248 0.0948213 8.3637 0.263604C8.19492 0.432387 8.1001 0.661306 8.1001 0.9V3.6H9.9001V0.9Z" fill="#FDFFFF" />
                        </g>
                        <defs>
                          <clipPath id="clip0_29_82">
                            <rect width="18" height="18" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>


                      <span
                        className={`${active && 'drop-shadow-green'} hover:shadow text-base font-bold`}
                      >Double</span>
                    </Link>)}
                </Menu.Item>

                <Menu.Item as={Fragment}>
                  {({ active }) => (
                    <Link
                      href={'/mines'}
                      className="hover:bg-zinc-900 text-zinc-400 hover:text-green-500 rounded-lg min-w-full py-2.5 px-4 flex gap-4 items-center"
                    >
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_29_104)">
                          <path fillRule="evenodd" clipRule="evenodd" d="M14.48 5.68736L13.769 6.38936C13.436 6.72236 12.23 6.05636 11.069 4.89536C10.6404 4.46828 10.2572 3.99774 9.92603 3.49136C9.60203 2.97836 9.44903 2.59136 9.53003 2.32136C8.99526 2.20179 8.44898 2.14143 7.90102 2.14136C6.14779 2.14149 4.44474 2.72668 3.06171 3.8042C1.67868 4.88172 0.694773 6.38995 0.265883 8.08991C-0.163007 9.78985 -0.012351 11.5844 0.69398 13.189C1.40032 14.7937 2.62192 16.1167 4.16525 16.9485C5.70858 17.7804 7.48537 18.0735 9.21404 17.7812C10.9428 17.489 12.5245 16.6283 13.7087 15.3355C14.893 14.0426 15.6119 12.3916 15.7516 10.6439C15.8913 8.89623 15.4438 7.15193 14.48 5.68736ZM4.80502 6.35336C3.90502 7.30736 2.78902 7.76636 2.42002 7.39736C2.05102 7.02836 2.51902 5.95736 3.46402 5.01236C4.40902 4.06736 5.48002 3.59936 5.84902 3.96836C6.21802 4.33736 5.75002 5.39936 4.80502 6.35336Z" fill="#FDFFFF" />
                          <path fillRule="evenodd" clipRule="evenodd" d="M9.02601 16.7665C7.53645 16.7663 6.07745 16.3436 4.81841 15.5476C3.55936 14.7514 2.55192 13.6147 1.91303 12.2691C1.27414 10.9234 1.03 9.42417 1.20896 7.94535C1.38792 6.46654 1.98262 5.06881 2.92405 3.91443C2.0652 4.60875 1.36202 5.47596 0.860128 6.45974C0.358245 7.44351 0.0688971 8.52185 0.0108759 9.62469C-0.0471453 10.7276 0.127457 11.8303 0.523345 12.8614C0.919233 13.8924 1.52755 14.8286 2.3088 15.6091C3.09004 16.3898 4.02674 16.9973 5.05807 17.3924C6.0894 17.7874 7.19229 17.9611 8.29511 17.9023C9.39798 17.8433 10.4761 17.5531 11.4594 17.0504C12.4428 16.5478 13.3094 15.8439 14.003 14.9845C12.6019 16.1394 10.8419 16.7696 9.02601 16.7665Z" fill="#ADADAD" />
                          <path d="M13.0761 3.49146C13.0065 3.4916 12.9381 3.47294 12.8781 3.43746C12.8249 3.41154 12.7772 3.37536 12.738 3.331C12.6988 3.28663 12.6686 3.23496 12.6494 3.17893C12.6302 3.12292 12.6222 3.06364 12.626 3.00453C12.6296 2.94542 12.645 2.88762 12.6711 2.83446C12.793 2.59843 12.9509 2.38285 13.1391 2.19546C12.0951 1.23246 11.0781 0.701455 10.8261 1.00746C10.5741 1.31346 11.1591 2.53746 12.3201 3.70746C13.4811 4.87746 14.6871 5.50746 15.0201 5.20146C15.3531 4.89546 14.7951 3.88746 13.8321 2.83446C13.7087 2.95192 13.6054 3.08872 13.5261 3.23946C13.484 3.32092 13.4189 3.38824 13.3389 3.43304C13.2589 3.47784 13.1676 3.49815 13.0761 3.49146Z" fill="#ADADAD" />
                          <path d="M17.6569 0.0443944C17.6032 0.0185872 17.5449 0.00370377 17.4854 0.000607822C17.4259 -0.00248813 17.3664 0.00626506 17.3103 0.0263594C17.2542 0.0464538 17.2026 0.0774891 17.1586 0.117664C17.1146 0.157839 17.0791 0.206355 17.0539 0.260394C16.7569 0.890394 16.0549 1.0614 15.2539 1.2594C14.4827 1.36094 13.7543 1.67225 13.1479 2.1594L13.4809 2.4654L13.7869 2.7894C14.2747 2.41588 14.8519 2.17692 15.4609 2.0964C15.9495 2.06086 16.4227 1.91023 16.8419 1.65683C17.2611 1.40343 17.6144 1.05445 17.8729 0.638394C17.8986 0.585347 17.9134 0.527699 17.9163 0.468857C17.9193 0.410015 17.9105 0.351171 17.8903 0.2958C17.8702 0.24043 17.8392 0.189655 17.7991 0.146475C17.759 0.103295 17.7107 0.0685848 17.6569 0.0443944Z" fill="#ADADAD" />
                        </g>
                        <defs>
                          <clipPath id="clip0_29_104">
                            <rect width="18" height="18" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>

                      <span
                        className={`${active && 'drop-shadow-green'} hover:shadow text-base font-bold`}
                      >Mines</span>
                    </Link>)}
                </Menu.Item>

                <Menu.Item as={Fragment}>
                  {({ active }) => (
                    <Link
                      href={'/cassino'}
                      className="hover:bg-zinc-900 text-zinc-400 hover:text-green-500 rounded-lg min-w-full py-2.5 px-4 flex gap-4 items-center"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path d="M18.75 5H1.25C0.918479 5 0.600537 5.1317 0.366117 5.36612C0.131696 5.60054 0 5.91848 0 6.25L0 18.75C0 19.0815 0.131696 19.3995 0.366117 19.6339C0.600537 19.8683 0.918479 20 1.25 20H18.75C19.0815 20 19.3995 19.8683 19.6339 19.6339C19.8683 19.3995 20 19.0815 20 18.75V6.25C20 5.91848 19.8683 5.60054 19.6339 5.36612C19.3995 5.1317 19.0815 5 18.75 5ZM15 18.12C15 18.2854 14.935 18.4441 14.819 18.562C14.703 18.6798 14.5453 18.7474 14.38 18.75H1.88C1.71291 18.75 1.55267 18.6836 1.43452 18.5655C1.31637 18.4473 1.25 18.2871 1.25 18.12V6.88C1.25 6.71291 1.31637 6.55267 1.43452 6.43452C1.55267 6.31637 1.71291 6.25 1.88 6.25H14.38C14.5453 6.25262 14.703 6.32016 14.819 6.43802C14.935 6.55589 15 6.71463 15 6.88V18.12ZM17.5 15C17.2528 15 17.0111 14.9267 16.8055 14.7893C16.6 14.652 16.4398 14.4568 16.3451 14.2284C16.2505 13.9999 16.2258 13.7486 16.274 13.5061C16.3223 13.2637 16.4413 13.0409 16.6161 12.8661C16.7909 12.6913 17.0137 12.5722 17.2561 12.524C17.4986 12.4758 17.7499 12.5005 17.9784 12.5952C18.2068 12.6898 18.402 12.85 18.5393 13.0555C18.6767 13.2611 18.75 13.5028 18.75 13.75C18.75 14.0815 18.6183 14.3995 18.3839 14.6339C18.1495 14.8683 17.8315 15 17.5 15ZM17.5 10C17.2528 10 17.0111 9.92669 16.8055 9.78934C16.6 9.65199 16.4398 9.45676 16.3451 9.22835C16.2505 8.99995 16.2258 8.74861 16.274 8.50614C16.3223 8.26366 16.4413 8.04093 16.6161 7.86612C16.7909 7.6913 17.0137 7.57225 17.2561 7.52402C17.4986 7.47579 17.7499 7.50054 17.9784 7.59515C18.2068 7.68976 18.402 7.84998 18.5393 8.05554C18.6767 8.2611 18.75 8.50277 18.75 8.75C18.75 9.08152 18.6183 9.39946 18.3839 9.63388C18.1495 9.8683 17.8315 10 17.5 10Z" fill="#8C9099"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M7.64995 14.8C7.28311 14.9624 6.87832 15.0194 6.48091 14.9646C6.08351 14.9099 5.70921 14.7455 5.39995 14.49C3.87995 13 7.09995 9.39 8.12995 8.75C9.12995 9.39 12.3699 12.97 10.8499 14.49C10.5407 14.7455 10.1664 14.9099 9.76898 14.9646C9.37158 15.0194 8.96678 14.9624 8.59995 14.8L9.33995 16.25H6.90995L7.64995 14.8Z" fill="#414952"></path><path d="M10.62 6.25003C10.4561 6.24677 10.2992 6.1826 10.18 6.07003L5.18003 1.07003C5.06455 0.95067 5 0.7911 5 0.625027C5 0.458955 5.06455 0.299385 5.18003 0.180027C5.29938 0.0645548 5.45895 0 5.62503 0C5.7911 0 5.95067 0.0645548 6.07003 0.180027L11.07 5.18003C11.1855 5.29938 11.2501 5.45895 11.2501 5.62503C11.2501 5.7911 11.1855 5.95067 11.07 6.07003C10.9483 6.18492 10.7874 6.24927 10.62 6.25003Z" fill="#8C9099"></path><path d="M10.62 6.25001C10.4561 6.24675 10.2992 6.18258 10.18 6.07001C10.0646 5.95065 10 5.79108 10 5.62501C10 5.45894 10.0646 5.29937 10.18 5.18001L13.93 1.43001C14.0498 1.32086 14.207 1.26204 14.369 1.26579C14.531 1.26954 14.6853 1.33557 14.7999 1.45015C14.9145 1.56473 14.9805 1.71905 14.9842 1.88104C14.988 2.04304 14.9292 2.20025 14.82 2.32001L11.07 6.07001C10.9483 6.18491 10.7874 6.24925 10.62 6.25001Z" fill="#8C9099"></path></g><defs><clipPath id="clip0"><rect width="20" height="20" fill="white"></rect></clipPath></defs></svg>

                      <span
                        className={`${active && 'drop-shadow-green'} hover:shadow text-base font-bold`}
                      >Cassino Ao Vivo
                      </span>
                    </Link>)}
                </Menu.Item>

                <Menu.Item as={Fragment}>
                  {({ active }) => (
                    <Link
                      href={'/dice'}
                      className="hover:bg-zinc-900 text-zinc-400 hover:text-green-500 rounded-lg min-w-full py-2.5 px-4 flex gap-4 items-center"
                    >
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask id="mask0_29_93" maskUnits="userSpaceOnUse" x="0" y="0" width="18" height="17">
                          <path d="M17.757 0.900024H0V16.866H17.757V0.900024Z" fill="white" />
                        </mask>
                        <g mask="url(#mask0_29_93)">
                          <path d="M8.99985 6.84901C8.99131 6.64933 9.04949 6.4525 9.16514 6.28955C9.28088 6.12659 9.44756 6.00678 9.63881 5.94901L17.7388 3.51901C17.6337 3.39487 17.4968 3.30156 17.3428 3.24901L9.77381 1.017C9.26891 0.865914 8.73078 0.865914 8.22585 1.017L0.638845 3.28501C0.447525 3.34278 0.280878 3.46259 0.165179 3.62555C0.0494801 3.7885 -0.00868861 3.98533 -0.000155404 4.18501V5.28301H2.69985L8.99985 7.08301V6.84901ZM7.19985 3.03301C7.19985 2.60101 8.00985 2.25901 8.99985 2.25901C9.98981 2.25901 10.7998 2.60101 10.7998 3.03301C10.7998 3.46501 9.98981 3.80701 8.99985 3.80701C8.00985 3.80701 7.19985 3.45601 7.19985 3.03301Z" fill="#ADADAD" />
                          <path d="M10.1609 16.632C10.0232 16.6738 9.87749 16.6821 9.73601 16.656C9.59453 16.63 9.46133 16.5703 9.34766 16.4822C9.2339 16.3941 9.143 16.28 9.08252 16.1494C9.02195 16.0189 8.99364 15.8757 8.99987 15.732V6.849C9.00836 6.64932 8.95023 6.45249 8.83453 6.28954C8.71883 6.12658 8.55219 6.00677 8.36087 5.949L1.16087 3.789C1.02321 3.74714 0.877526 3.73889 0.736026 3.76494C0.594527 3.791 0.461336 3.8506 0.347623 3.93876C0.23391 4.0269 0.142987 4.14103 0.0824795 4.27157C0.0219717 4.4021 -0.00635788 4.54525 -0.000134028 4.689V13.608C-0.00866723 13.8077 0.0495015 14.0045 0.165201 14.1674C0.280899 14.3304 0.447547 14.4502 0.638866 14.508L5.13887 15.849L8.26187 16.749C8.7668 16.9001 9.30491 16.9001 9.8099 16.749L10.1609 16.632ZM1.41287 7.983C0.899866 7.983 0.449866 7.38 0.449866 6.633C0.449866 5.886 0.899866 5.283 1.41287 5.283C1.92587 5.283 2.37587 5.886 2.37587 6.633C2.37587 7.38 1.94387 7.983 1.41287 7.983ZM4.11287 11.583C3.58187 11.583 3.14987 10.98 3.14987 10.233C3.14987 9.486 3.59987 8.883 4.11287 8.883C4.62587 8.883 5.07587 9.486 5.07587 10.233C5.07587 10.98 4.64387 11.583 4.11287 11.583ZM6.81287 15.183C6.28187 15.183 5.84987 14.58 5.84987 13.833C5.84987 13.086 6.28187 12.483 6.81287 12.483C7.34387 12.483 7.77587 13.086 7.77587 13.833C7.77587 14.58 7.34387 15.183 6.81287 15.183Z" fill="#FDFFFF" />
                          <path d="M11.3129 9.78301C10.7819 9.78301 10.3499 9.18001 10.3499 8.43301C10.3499 7.68601 10.7819 7.08301 11.3129 7.08301C11.8439 7.08301 12.2759 7.68601 12.2759 8.43301C12.2759 9.18001 11.8439 9.78301 11.3129 9.78301Z" fill="#FDFFFF" />
                          <path d="M15.8129 13.383C15.2819 13.383 14.8499 12.78 14.8499 12.033C14.8499 11.286 15.2819 10.683 15.8129 10.683C16.3439 10.683 16.7759 11.286 16.7759 12.033C16.7759 12.78 16.3439 13.383 15.8129 13.383Z" fill="#FDFFFF" />
                        </g>
                      </svg>

                      <span
                        className={`${active && 'drop-shadow-green'} hover:shadow text-base font-bold`}
                      >Dice
                        <small className='text-red-500 font-bold ml-2 text-[10px]'>em breve</small>
                      </span>
                    </Link>)}
                </Menu.Item>


                <Menu.Item
                  as={Fragment}>
                  {({ active }) => (
                    <Link
                      href={'/tower'}
                      className="hover:bg-zinc-900 text-zinc-400 hover:text-green-500 rounded-lg min-w-full py-2.5 px-4 flex gap-4 items-center"
                    >
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 3.62812V0H13.5113V2.70563H11.8125V0H6.27187V2.70563H4.5675V0H0V3.62812H2.72812V14.3831H0.86625V16.1606H0V18H18V16.1606H17.1337V14.3831H15.2719V3.62812H18ZM7.25063 12.5887H5.41125V10.7494H7.25063V12.5887ZM7.25063 9.90563H5.41125V8.055H7.25063V9.90563ZM7.25063 7.21688H5.41125V5.3775H7.25063V7.21688ZM9.88875 12.5887H8.03813V10.7494H9.88875V12.5887ZM9.88875 9.90563H8.03813V8.055H9.88875V9.90563ZM9.88875 7.21688H8.03813V5.3775H9.88875V7.21688ZM12.5831 12.5887H10.7325V10.7494H12.5831V12.5887ZM12.5831 9.90563H10.7325V8.055H12.5831V9.90563ZM12.5831 7.21688H10.7325V5.3775H12.5831V7.21688Z" fill="#ADADAD" />
                        <path d="M4.5 4.4325V13.4663H12.5831V14.3269H9.88313V16.0538H12.5831V17.9944H0V16.1606H0.86625V14.3831H2.72812V3.62812H0V0H4.5675V2.70563H6.27187V0H11.8125V2.70563H12.5831V4.4325H4.5Z" fill="#FDFFFF" />
                      </svg>

                      <span
                        className={`${active && 'drop-shadow-green'} hover:shadow text-base font-bold`}
                      >Tower
                        <small className='text-red-500 font-bold ml-2 text-[10px]'>em breve</small>
                      </span>
                    </Link>)}
                </Menu.Item>
                
              </Menu.Items>
            </Transition>
          </div>
        )}
      </Menu>

      <div className="hidden border-b border-zinc-500 p-6  flex flex-col gap-4">
        <div className="flex flex-col">
          <Link
            href={'/'}
            className="hover:bg-zinc-900 text-zinc-400 hover:text-green-500 rounded-lg min-w-full py-2.5 px-4 flex gap-4 items-center"
          >
            <span className='hover:shadow shadow-green-500 text-base font-bold'>Suporte Ao Vivo</span>
          </Link>

          <Link
            href={'/'}
            className="hover:bg-zinc-900 text-zinc-400 hover:text-green-500 rounded-lg min-w-full py-2.5 px-4 flex gap-4 items-center"
          >
            <span className='hover:shadow shadow-green-500 text-base font-bold'>Promoções</span>
          </Link>

          <Link
            href={'/'}
            className="hover:bg-zinc-900 text-zinc-400 hover:text-green-500 rounded-lg min-w-full py-2.5 px-4 flex gap-4 items-center"
          >
            <span className='hover:shadow shadow-green-500 text-base font-bold'>Indique Um Amigo</span>
          </Link>

          <Link
            href={'/'}
            className="hover:bg-zinc-900 text-zinc-400 hover:text-green-500 rounded-lg min-w-full py-2.5 px-4 flex gap-4 items-center"
          >
            <span className='hover:shadow shadow-green-500 text-base font-bold'>Central de Apoio</span>
          </Link>
        </div>
      </div>


    </div>
  )
}