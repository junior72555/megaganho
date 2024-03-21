"use client"

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "@/components/ui/Form/Input";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import BadgeErrorsMessage from "@/components/ui/Errors/BadgeErrorsMessage";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useModal } from "@/contexts/ModalContext";

interface IFormRecoveryPasswordInputs {
  token: string;
  password: string;
  password_confirmation: string;
}

const schema = yup
  .object({
    token: yup.string()
      .required("Token Obrigatório"),
    password: yup.string()
      .min(8, 'A senha deve ter no mínimo 8 caracteres')
      .required("Senha Obrigatória"),
    password_confirmation: yup.string()
      .oneOf([yup.ref('password'), ''], 'As senhas devem ser iguais')
      .required("Senha Obrigatória"),
  })
  .required();

type PageProps = {
  params: {
    token: string;
  }
}

export default function RecoveryPassword({ params }: PageProps) {
  const { token } = params;
  const [messageError, setMessageError] = useState({ type: '', message: '' })
  const { resetPassword } = useAuth()
  const router = useRouter()
  const { setOpenModal } = useModal()

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormRecoveryPasswordInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormRecoveryPasswordInputs) => {
    setMessageError({ message: '', type: 'loading' })

    const response = await resetPassword(data.token, data.password, data.password_confirmation)
    setMessageError({ message: response.message, type: response.type })

    if (response.type === 'success') {
      setTimeout(() => {
        router.push('/')
        setOpenModal('login')
      }, 3000)
    }
  };

  useEffect(() => {
    if (token) {
      setValue("token", token);
    }
  }, [token, setValue]);

  return (
    <>
      <div className="rounded bg-zinc-700 p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-white text-lg font-bold mb-4 uppercase">Recuperar Senha</h2>

          <BadgeErrorsMessage
            type={messageError.type}
            message={messageError.message}
          />

          <div className="space-y-2">
            <div className="grid grid-cols-1 gap-x-2 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <Input
                  title="Token"
                  type="text"
                  {...register("token")}
                  errors={errors.token?.message}
                  disabled={true}
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
                Trocar Senha
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}