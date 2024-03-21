"use client"
import { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useAccount } from "@/contexts/AccountContext";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/ui/Form/Input";
import BadgeErrorsMessage from "@/components/ui/Errors/BadgeErrorsMessage";
import { CheckIcon } from "@heroicons/react/20/solid";

import { cpf } from 'cpf-cnpj-validator';
import { api } from "@/lib/api";

interface IFormAccountInputs {
  name: string;
  email: string;
  document: string;
  phone: string;
  birth_date: string;
}

const schema = yup
  .object({
    name: yup.string()
      .required("Nome obrigatório"),
    email: yup.string()
      .email("E-mail inválido")
      .required("E-mail obrigatório"),
    document: yup.string()
      .min(11, 'O CPF deve ter no mínimo 11 caracteres')
      .required("CPF Obrigatório")
      .test('is-num', 'CPF inválido', (value) => cpf.isValid(value)),
    phone: yup.string()
      .required("Telefone obrigatório"),
    birth_date: yup.string()
      .required("Data de nascimento obrigatória"),
  })
  .required();

export default function Profile() {
  const [messageError, setMessageError] = useState({ type: '', message: '' })
  const { changeProfile } = useAccount()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IFormAccountInputs>({
    resolver: yupResolver(schema),
    defaultValues: async () => api.get('/account/profile').then(response => response.data.user)
  });

  const onSubmit = async ({
    name,
    email,
    document,
    phone,
    birth_date,
  }: IFormAccountInputs) => {
    setMessageError({ message: '', type: 'loading' })

    const response = await changeProfile({
      name,
      email,
      document,
      phone,
      birth_date,
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
        <h2 className="text-white text-lg font-bold mb-4 uppercase">Informações gerais</h2>

        <BadgeErrorsMessage
          message={messageError.message}
          type={messageError.type}
        />

        <div className="space-y-2">
          <div className="grid grid-cols-1 gap-x-2 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <Input
                title="Nome"
                type="text"
                {...register("name")}
                errors={errors.name?.message}
              />
            </div>

            <div className="sm:col-span-3">
              <Input
                title="E-mail"
                type="email"
                {...register("email")}
                errors={errors.email?.message}
              />
            </div>

            <div className="sm:col-span-3">
              <Input
                title="CPF"
                mask="999.999.999-99"
                type="text"
                {...register("document")}
                alwaysShowMask={false}
                errors={errors.document?.message}
              />
            </div>

            <div className="sm:col-span-3">
              <Input
                title="Telefone"
                type="text"
                mask="(99) 99999-9999"
                {...register("phone")}
                errors={errors.phone?.message}
              />
            </div>

            <div className="sm:col-span-3">
              <Input
                title="Data de nascimento"
                type="date"
                {...register("birth_date")}
                errors={errors.birth_date?.message}
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-x-6">
            <button type="button" className="hidden text-sm font-semibold leading-6 text-red-500">
              Cancelar Conta
            </button>

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