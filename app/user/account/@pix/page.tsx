"use client"

import { use, useEffect, useState } from "react"
import * as yup from "yup";
import BadgeErrorsMessage from "@/components/ui/Errors/BadgeErrorsMessage"
import Input from "@/components/ui/Form/Input"
import { CheckIcon } from "@heroicons/react/20/solid"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAccount } from "@/contexts/AccountContext";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";

interface IFormInputs {
  pix_key_type: 'cpf' | 'email' | 'phone' | 'random' | 'cnpj'
  pix_key: string
}

const schema = yup
  .object({
    pix_key_type: yup.string()
      .required("Tipo de chave obrigatório")
      .oneOf(['cpf', 'email', 'phone', 'random', 'cnpj'], "Tipo de chave inválida"),
    pix_key: yup.string()
      .required("Chave obrigatória"),
  })
  .required();

export default function Pix() {
  const [messageError, setMessageError] = useState({ type: '', message: '' })
  const { user } = useAuth()
  const { changePix } = useAccount()

  const {
    register,
    handleSubmit,
    setError,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: async () => api.get('/account/profile').then(response => response.data.user)
  });

  const watchPixKeyType = watch("pix_key_type");

  useEffect(() => {
    const keyTypeMappings = {
      'cpf': user?.document,
      'phone': user?.phone,
      'email': user?.email,
      'random': undefined,
      'cnpj': undefined,
    };
  
    const keyType = keyTypeMappings[watchPixKeyType];
  
    setValue('pix_key', keyType ? keyType ?? '' : '');
  }, [watchPixKeyType, setValue, user?.document])

  const onSubmit = async ({
    pix_key_type,
    pix_key
  }: IFormInputs) => {
    setMessageError({ message: '', type: 'loading' })

    const response = await changePix({
      pix_key_type,
      pix_key,
    })

    setMessageError({ message: response.message, type: response.type })

    if (response.type === 'error' && response.errors) {
      for (let key in response.errors) {
        /* @ts-ignore */
        setError(key, {
          type: "manual",
          message: response.errors[key][0]
        });
      }
    }
  };

  return (
    <div className="rounded bg-zinc-700 p-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-white text-lg font-bold mb-4 uppercase">Meu PIX</h2>

        <BadgeErrorsMessage
          message={messageError.message}
          type={messageError.type}
        />

        <div className="space-y-2">
          <div className="grid grid-cols-1 gap-x-2 sm:grid-cols-6">
            <div className="sm:col-span-2">

              <div className='floating mb-3 relative'>
                <select
                  {...register("pix_key_type")}
                  className={`${errors.pix_key_type?.message && 'border-red-500 border rounded-b-none'} disabled:cursor-not-allowed bg-zinc-900 text-base text-zinc-300 appearance-none block w-full px-4 h-14 leading-10 rounded shadow-sm placeholder-gray-400 focus:outline-none focus:ring-0`}
                >
                  <option value="cpf">CPF</option>
                  <option value="cnpj">CNPJ</option>
                  <option value="email">E-mail</option>
                  <option value="phone">Telefone</option>
                  <option value="random">Chave Aleatória</option>
                </select>
                <label
                  className="block mb-2 uppercase text-zinc-400 text-xs font-bold absolute top-0 left-0 px-4 py-[1.35rem] h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out "
                >
                  Tipo da Chave
                </label>

                {errors.pix_key_type?.message &&
                  <div className="text-xs p-1 text-white text-center font-normal bg-red-500 w-full rounded-b-md">
                    {errors.pix_key_type?.message}
                  </div>
                }
              </div>
            </div>

            <div className="sm:col-span-4">
              <Input
                title="Chave PIX"
                type={watchPixKeyType === 'email' ? 'email' : 'text'}
                {...register("pix_key")}
                errors={errors.pix_key?.message}
                mask={
                  watchPixKeyType === 'cpf' ? '999.999.999-99' :
                  watchPixKeyType === 'cnpj' ? '99.999.999/9999-99' :
                  watchPixKeyType === 'phone' ? '(99) 99999-9999' : null
                }
                alwaysShowMask={false}
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-x-6">
            <span className="text-xs text-zinc-400">*Sua chave Pix deve estar ligada ao seu CPF</span>

            <button
              type="submit"
              className="flex items-center gap-1 rounded-md bg-green-500 px-3 py-2 text-sm font-bold uppercase text-zinc-900 shadow-sm hover:bg-green-600"
            >
              <CheckIcon className="h-5 w-5" />
              Salvar
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}