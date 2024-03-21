"use client"
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Logo from '@/components/Logo'
import Input from '../../Form/Input'
import { useModal } from "@/contexts/ModalContext";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import BadgeErrorsMessage from "../../Errors/BadgeErrorsMessage";
import { useGlobalContext } from "@/contexts/context_global/globalContext";

interface IFormInputs {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup.string()
      .email("E-mail inválido")
      .required("E-mail obrigatório"),
    password: yup.string()
      .min(8, 'A senha deve ter no mínimo 8 caracteres')
      .required("Senha Obrigatória"),
  })
  .required();


export default function Login() {
  const { setOpenModal, setCloseModal } = useModal()
  const [messageError, setMessageError] = useState({ type: '', message: '' })
  const { signIn } = useAuth()
  const {setEmail} = useGlobalContext()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormInputs) => {
    setMessageError({ message: '', type: 'loading' })

    const response = await signIn(data.email, data.password)
    //setMessageError({ message: response.message, type: response.type })

    if (response.type === 'success') {
      setEmail(data.email)
      setCloseModal()
    }
  };

  return (
    <>
      <div className="justify-center flex items-center w-full mb-10">
        <Logo />
      </div>

      <BadgeErrorsMessage
        type={messageError.type}
        message={messageError.message}
      />

      <form onSubmit={handleSubmit(onSubmit)} >
        <Input
          type="email"
          title="E-mail"
          placeholder="Digite seu e-mail"
          required
          {...register("email")}
          errors={errors.email?.message}
        />

        <Input
          type="password"
          title="Senha"
          required
          placeholder="Digite sua senha"
          {...register("password")}
          errors={errors.password?.message}
        />

        <div
          className='cursor-pointer w-full text-zinc-200 hover:text-white hover:underline text-right text-sm'
          onClick={() => setOpenModal('forgot')}
        >
          Esqueceu a senha?
        </div>

        <button
          className='mt-8 text-black uppercase font-bold text-sm rounded-lg shadow-green bg-green-500 hover:bg-green-600 p-3 w-full'
          type='submit'
        >
          Entrar
        </button>
      </form>

      <div className='w-full text-center text-xs text-zinc-400 mt-6'>
        Ainda não tem uma conta?
        <b
          className="ml-2 text-green-500 cursor-pointer"
          onClick={() => setOpenModal('register')}
        >
          Criar uma conta grátis
        </b>
      </div>
    </>
  )
}