"use client"
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "@/components/ui/Form/Input";
import { CheckIcon } from "@heroicons/react/20/solid";
import { api } from "@/lib/api";
import BadgeErrorsMessage from "@/components/ui/Errors/BadgeErrorsMessage";
import { useState } from "react";


interface IFormChangePasswordInputs {
  current_password: string;
  password: string;
  password_confirmation: string;
}

const schema = yup
  .object({
    current_password: yup.string()
      .min(8, 'A senha deve ter no mínimo 8 caracteres')
      .required("Senha Obrigatória"),
    password: yup.string()
      .min(8, 'A senha deve ter no mínimo 8 caracteres')
      .required("Senha Obrigatória"),
    password_confirmation: yup.string()
      .oneOf([yup.ref('password'), ''], 'As senhas devem ser iguais')
      .required("Senha Obrigatória"),
  })
  .required();


async function fetchChangePassword({ current_password, password, password_confirmation }: IFormChangePasswordInputs) {
  try {
    const response = await api.put('/account/change-password', {
      current_password,
      password,
      password_confirmation
    });

    return {
      type: 'success',
      message: response.data.message,
    }

  } catch (error: any) {
    return {
      type: 'error',
      message: error.response.data.message,
    }
  }
}

export default function UserChangePassword() {
  const [messageError, setMessageError] = useState({ type: '', message: '' })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormChangePasswordInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({
    current_password,
    password,
    password_confirmation
  }: IFormChangePasswordInputs) => {
    setMessageError({ message: '', type: 'loading' })

    const response = await fetchChangePassword({ current_password, password, password_confirmation });

    setMessageError({ message: response.message, type: response.type })

    if (response.type === 'success') {
      reset()
    }
  };

  return (
    <>
      <div className="rounded bg-zinc-700 p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-white text-lg font-bold mb-4 uppercase">Alterar Senha</h2>

          <BadgeErrorsMessage
            type={messageError.type}
            message={messageError.message}
          />

          <div className="space-y-2">
            <div className="grid grid-cols-1 gap-x-2 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <Input
                  title="Senha atual"
                  type="password"
                  {...register("current_password")}
                  errors={errors.current_password?.message}
                />
              </div>

              <div className="sm:col-span-4">
                <Input
                  title="Nova senha"
                  type="password"
                  {...register("password")}
                  errors={errors.password?.message}
                />
              </div>

              <div className="sm:col-span-4">
                <Input
                  title="Confirmar nova senha"
                  type="password"
                  {...register("password_confirmation")}
                  errors={errors.password_confirmation?.message}
                />
              </div>
            </div>

            <div className="flex items-center justify-between gap-x-6">
              <button
                type="submit"
                className="flex items-center gap-1 rounded-md bg-green-500 px-3 py-2 text-sm font-bold uppercase text-zinc-900 shadow-sm hover:bg-green-600"
              >
                <CheckIcon className="h-5 w-5" />
                Alterar
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
} 