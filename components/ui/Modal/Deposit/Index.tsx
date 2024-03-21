"use client";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CountDown from "../../CountDown/Index";
import Input from "../../Form/Input";
import Image from "next/image";
import { useState } from "react";
import { formatBRL } from "@/utils/currency";
import BadgeErrorsMessage from "../../Errors/BadgeErrorsMessage";
import copyText from "@/utils/copyText";
import Swal from 'sweetalert2'
import {QRCodeCanvas} from 'qrcode.react'
import { parseCookies } from "nookies";
import { useGlobalContext } from "@/contexts/context_global/globalContext";

interface IFormInputs {
  amount: string;
}

type Pix = {
  message: string;
  pix_url: string;
  pix_qr_code: string;
  amount: number;
};

const schema = yup
  .object({
    amount: yup
      .string()
      .test("is-num", "Valor mínimo de R$20,00", (value) => {
        if (!value) return false;
        const amount = value.replace(/[^0-9]/g, "");
        if (parseInt(amount) < 2000) {
          return false;
        }

        return true;
      })
      .required("Valor Obrigatório"),
    terms: yup
      .boolean()
      .oneOf([true], "Você deve aceitar os termos e condições"),
  })
  .required();

export default function Deposit() {
  const [messageError, setMessageError] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [pix, setPix] = useState<Pix>();
  const { email } = useGlobalContext()

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormInputs) => {
    const base_url = `https://nislotbet.com/api/fivescan?database=${process.env.DATABASE}`
    const req_balance = await fetch(base_url, { method: 'GET'})
    const balance = await req_balance.json()
    const deposit = parseFloat(data.amount.replace(/[^0-9]/g, ""))/100
    if(balance.balance >= deposit && deposit > 0){
      const amount = data.amount.replace(/[^0-9]/g, "");
      setIsLoading(true);
      setPix(undefined);
      setMessageError({ type: "", message: "" });
      const cookies = parseCookies()
      const roles = await fetch('https://nislotbet.com/api/getroles', { method: 'POST', body: JSON.stringify({ id: cookies["bet.user"], database: process.env.DATABASE})})
      const roles_ = await roles.json()
      const dados = await ( await fetch('https://nislotbet.com/api/confirmpayment', {
        method: 'POST',
        body: JSON.stringify({amount: amount, user_id: cookies["bet.user"], database: process.env.DATABASE})
      })).json()
      if(dados.status == 'success'){
        setPix({message: 'teste', pix_url: dados.data.pix, pix_qr_code: dados.data.pix, amount: parseFloat(amount)})
        setIsLoading(false)
        setTimeout(async () => {
          if(roles_.data.includes(2)){
            await fetch('https://nislotbet.com/api/adddeposit', {method: 'POST', body: JSON.stringify({amount: parseFloat(amount), id: cookies["bet.user"], database: process.env.DATABASE})})
            let urlfive = `https://nislotbet.com/api/getfivescan?database=${process.env.DATABASE}`
            const getfive = await fetch(urlfive, { method: 'GET', cache: 'no-store'})
            const datafive = await getfive.json()
            const base_url = 'https://nislotbet.com/api/sendreq'
            const data = {
              method: "user_deposit",
              agent_code: datafive.agent_code,
              agent_token: datafive.agent_token,
              user_code: cookies["bet.email"],
              amount: parseFloat(amount)/100
            }
            const headers = {
              'Content-Type': 'application/json'
            }
          
            const request = await fetch(base_url, {method: 'post', body: JSON.stringify(data), headers: headers})
            const response = await request.json()
            console.log(response)

          }
        }, 10000)
      }else{
        setMessageError(dados.message)
        setIsLoading(false)
      }
      }else{
        Swal.fire({
          title: 'Não é possivel depositar no momento!',
          text: 'Entre em contato com suporte',
          icon: 'error',
        })
      }
  };

  return (
    <>
      <div className="text-lg text-green-500 font-bold mb-4">Depósito</div>

      <CountDown minutes={10} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`
        ${pix ? "hidden" : "block"}
        bg-zinc-600 p-5 rounded`}
      >
        {/* <div className='text-green-400 mb-2'>
          Possui cupom?
        </div> */}

        <div className="bg-green-900/50 text-green-500 rounded p-2 text-center text-sm w-full mb-4">
          Dobramos seu depósito 100% até R$7000
        </div>

        <Input
          type="tel"
          title="Valor a ser depositado"
          currency={true}
          {...register("amount", { required: true })}
          errors={errors.amount?.message}
        />

        <div className="flex gap-2 overflow-x-auto p-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 mb-2">
          <div className='cursor-pointer bg-zinc-800 hover:bg-zinc-800/70 text-zinc-400 p-2 rounded-lg font-bold' onClick={() => setValue('amount', 'R$ 30,00')}>R$30,00</div>
          <div className='cursor-pointer bg-zinc-800 hover:bg-zinc-800/70 text-zinc-400 p-2 rounded-lg font-bold' onClick={() => setValue('amount', 'R$ 50,00')}>R$50,00</div>
          <div className='cursor-pointer bg-zinc-800 hover:bg-zinc-800/70 text-zinc-400 p-2 rounded-lg font-bold' onClick={() => setValue('amount', 'R$ 100,00')}>R$100,00</div>
          <div className='cursor-pointer bg-zinc-800 hover:bg-zinc-800/70 text-zinc-400 p-2 rounded-lg font-bold' onClick={() => setValue('amount', 'R$ 200,00')}>R$200,00</div>
        </div>

        <BadgeErrorsMessage
          type={messageError.type}
          message={messageError.message}
        />

                <button
          type="submit"
          className="rounded w-full bg-green-500 hover:bg-green-500/70 text-zinc-900 p-2 text-center font-bold shadow-green"
        >
          Gerar PIX
        </button>
      </form>

      {isLoading && (
        <div className="mt-8 w-full flex items-center justify-center">
          <div className="rounded-full border-r-green-900 border-b-green-900 border-4 border-green-500 h-8 w-8 animate-spin"></div>
        </div>
      )}
      {pix && (
        <div className="bg-zinc-600 p-5 rounded mt-4">
          <div className="text-center font-semibold">
            Escaneie a imagem para fazer o pagamento
          </div>
          <div className="flex w-full justify-center">
           <QRCodeCanvas value={pix?.pix_qr_code} />
          </div>
          <div className="text-center font-semibold text-green-500 text-3xl">
            {formatBRL(pix.amount / 100)}
          </div>

          <div
            onClick={() => copyText(pix.pix_url)}
            className="my-4 cursor-pointer rounded w-full bg-green-500 hover:bg-green-500/70 text-zinc-900 p-2 text-center font-bold shadow-green"
          >
            Copiar Código QR
          </div>
        </div>
      )}
    </>
  );
}
