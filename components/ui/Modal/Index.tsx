"use client"
import React, { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { useModal } from '@/contexts/ModalContext'

export default function Modal() {
  const {
    isOpenModal: isOpen,
    childrenModal,
    setCloseModal: setClose
  } = useModal();

  let initialFocus = useRef(null)

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        initialFocus={initialFocus}
        as="div"
        className="relative z-50"
        onClose={setClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-zinc-950 opacity-60" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center sm:p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className="min-h-screen sm:min-h-0 sm:h-auto w-full flex flex-col overflow-y-auto sm:overflow-visible justify-center  sm:max-w-sm md:max-w-md transform sm:rounded-xl bg-zinc-700 p-6 text-left align-middle shadow-xl transition-all">
                <div
                  onClick={setClose}
                  aria-label="Fechar Modal"
                  className='cursor-pointer shadow-lg absolute z-50 top-3 right-3 sm:-top-2 sm:-right-2 rounded bg-zinc-800 hover:bg-zinc-800 p-2 w-10 h-10 flex items-center justify-center'>
                  <XMarkIcon width={20} height={20} />
                </div>

                {/* hack para o focus não pegar no primeiro input */}
                <button type='button' className='hidden' ref={initialFocus}></button>

                {childrenModal}

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}