"use client"
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { cpf } from 'cpf-cnpj-validator';

import Logo from '@/components/Logo'
import Input from '../../Form/Input'
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { useModal } from "@/contexts/ModalContext";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { SignUpFormData } from "@/contexts/AuthContext/types";
import BadgeErrorsMessage from "../../Errors/BadgeErrorsMessage";
import { useGlobalContext } from "@/contexts/context_global/globalContext";


const schema = yup
  .object({
    name: yup.string()
      .required("Nome Obrigatório"),
/*    phone: yup.string()
      .required("Telefone Obrigatório"),
    document: yup.string()
      .min(11, 'O CPF deve ter no mínimo 11 caracteres')
      .required("CPF Obrigatório")
      .test('is-num', 'CPF inválido', (value) => cpf.isValid(value)),*/
    email: yup.string()
      .email("E-mail inválido")
      .required("E-mail obrigatório"),
    password: yup.string()
      .min(8, 'A senha deve ter no mínimo 8 caracteres')
      .required("Senha Obrigatória"),
/*    password_confirmation: yup.string()
      .oneOf([yup.ref('password'), ''], 'As senhas devem ser iguais')
      .required("Confirmação de senha obrigatória"),*/
  })
  .required();


export default function Register() {
  const { setOpenModal, setCloseModal } = useModal()
  const [messageError, setMessageError] = useState({ type: '', message: '' })
  const { signUp } = useAuth()
  const { setEmail } = useGlobalContext()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    setMessageError({ message: '', type: 'loading' })

    const response = await signUp(data)

    setMessageError({ message: response.message, type: response.type })

    for (let key in response.errors) {
      /* @ts-ignore */
      setError(key, {
        type: "manual",
        message: response.errors[key][0]
      });
    }

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

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="name"
          title="Nome"
          placeholder="Digite seu nome"
          required
          {...register("name")}
          errors={errors.name?.message}
        />


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

        <div className='w-full text-center text-xs text-zinc-400 mt-6'>
          Ao registrar-se, você concorda com os
          <b className="ml-2 text-green-500 cursor-pointer">
            termos e condições
          </b>
        </div>

        <button
          className='mt-8 flex items-center justify-center gap-2 text-black uppercase font-bold text-sm rounded-lg shadow-green bg-green-500 hover:bg-green-600 p-3 w-full'
          type='submit'
        >
          Criar conta <ArrowRightIcon className='w-5 h-5' />
        </button>
      </form>

      <div className='w-full text-center text-xs text-zinc-400 mt-6'>
        Já tem uma conta?
        <b
          className="ml-2 text-green-500 cursor-pointer"
          onClick={() => setOpenModal('login')}
        >
          Entre na sua conta
        </b>
      </div>
    </>
  )
}