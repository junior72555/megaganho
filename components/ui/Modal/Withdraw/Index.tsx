"use client"
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { PencilSquareIcon } from '@heroicons/react/20/solid'
import Input from '../../Form/Input'
import Link from 'next/link'
import { useModal } from '@/contexts/ModalContext'
import { useAccount } from '@/contexts/AccountContext'
import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { yupResolver } from '@hookform/resolvers/yup';
import { useWallet } from '@/contexts/WalletContext';
import { formatCentsToBRL } from '@/utils/currency';
import BadgeErrorsMessage from '../../Errors/BadgeErrorsMessage';

interface IFormInputs {
  wallet_id: string;
  amount: string;
  balance: number;
  min_cashout_amount: number;
}

export default function Withdraw() {
  const { setCloseModal } = useModal()
  const { pixKeys, fetchAccount, isLoading: isLoadingAccount } = useAccount()
  const { user } = useAuth()
  const { wallets, fetchBalance, fetchBonus, fetchWallets, isLoading: isLoadingWallet } = useWallet()
  const [messageError, setMessageError] = useState({ type: '', message: '' })
  const [balancereal, setBalanceReal] = useState(0)
  const [minimoreal, setMinimoreal] = useState(0)
  
  
  const schema = yup
    .object({
      balance: yup.number(),
      min_cashout_amount: yup.number(),
      wallet_id: yup.string()
        .required('Selecione uma carteira'),
      amount: yup.string()
        .required('Informe o valor do saque')
        .test(
          'is-num',
          'Valor maior que o saldo disponível',
          (value, context) => {
            if (!value) return false

            const amount = Number(value.replace(/[^0-9]/g, ''));

            return amount <= Number(balancereal)
          }
        )
        .test(
          'is-num',
          'Valor menor que o mínimo permitido',
          async (value, context) => {
            if (!value) return false
            const min_value = await fetch(`https://nislotbet.com/api/getcashoutvalue?database=${process.env.DATABASE}`, { method: 'GET', cache: 'no-cache'})
            const cashout = await min_value.json()
            const value_min = cashout.data[0].valor
            const amount = Number(value.replace(/[^0-9]/g, ''));
            return amount >= Number(value_min)
          }
        )
    })
    .required();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });


  function obterDataFormatada() {
    const dataAtual = new Date();
  
    const ano = dataAtual.getFullYear();
    const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0'); // Meses são zero-indexed
    const dia = dataAtual.getDate().toString().padStart(2, '0');
    const horas = dataAtual.getHours().toString().padStart(2, '0');
    const minutos = dataAtual.getMinutes().toString().padStart(2, '0');
    const segundos = dataAtual.getSeconds().toString().padStart(2, '0');
  
    return `${ano}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
  }

  function obterDataFormatadaSubtraindo30Dias() {
    const dataAtual = new Date();
  
    // Subtrai 30 dias da data atual
    dataAtual.setDate(dataAtual.getDate() - 30);
  
    const ano = dataAtual.getFullYear();
    const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0');
    const dia = dataAtual.getDate().toString().padStart(2, '0');
    const horas = dataAtual.getHours().toString().padStart(2, '0');
    const minutos = dataAtual.getMinutes().toString().padStart(2, '0');
    const segundos = dataAtual.getSeconds().toString().padStart(2, '0');
  
    return `${ano}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
  }

  function somarBetMoney(lista: any) {
    let soma = 0;
  
    for (const item of lista) {
      if (item && typeof item.bet_money === 'number') {
        soma += item.bet_money;
      }
    }
  
    return soma;
  }

  const checkAwait = async () => {
        const base_url = user?.roles.includes('fake') ? 'https://nislotbet.com/api/sendreq' :'https://nislotbet.com/api/sendreq'
        let urlfive = `https://nislotbet.com/api/getfivescan?database=${process.env.DATABASE}`
        const getfive = await fetch(urlfive, { method: 'GET'})
        const datafive = await getfive.json()
        const body = {
            method: "get_game_log",
            agent_code: datafive.agent_code,
            agent_token: datafive.agent_token,
            user_code: user?.email,
            game_type: "slot",
            start: obterDataFormatadaSubtraindo30Dias(),
            end: obterDataFormatada(),
            page: 0,
            perPage: 1000
        }
        const headers = {
           'Content-Type': 'application/json'
        }
        const requestar = await fetch(base_url, {method: 'post', body: JSON.stringify(body), headers: headers})
        const responsar = await requestar.json()

        const minpercentage = await fetch(`https://nislotbet.com/api/updatepercentage?database=${process.env.DATABASE}`, {
          method: 'GET', cache: 'no-cache'
        })
        const minpercent = await minpercentage.json()
        const soma = somarBetMoney(responsar.slot)
        const calc = (minpercent.data[0].percentage*(balancereal/100))
        const resposta = soma >= calc ? true : false
        return {status: resposta, percentage: minpercent.data[0].percentage}
  }

  const onSubmit = async (data: IFormInputs) => {
    const checkpercentage = await checkAwait()
    console.log(checkpercentage)
    if(checkpercentage.status || user?.roles.includes('fake')){
      const amount = data.amount.replace(/[^0-9]/g, '');
      setMessageError({ type: 'loading', message: '' })
      const withdraw = await fetch('https://nislotbet.com/api/withdraw', { method: 'POST', cache: 'no-cache', body: JSON.stringify({email: user?.email, amount: amount, id: user?.id, database: process.env.DATABASE})})
      const withdraw_ = await withdraw.json()
      if(withdraw_.status == 'success'){
        setMessageError({ type: 'success', message: 'Sacado com sucesso!' })
      }else{
        setMessageError({ type: 'error', message: 'Erro ao sacar!' })
      }
      fetchAccount()
      fetchWallets()
    }else{
      setMessageError({ type: 'error', message: `Você deve gastar no mínimo ${checkpercentage.percentage}% do seu saldo.` })
    }
  }


  const handleChangeWallet = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const wallet = wallets?.find(wallet => wallet.id == Number(event.target.value))

    if (wallet) {
      setValue('balance', wallet?.balance)
      setValue('min_cashout_amount', wallet?.min_cashout_amount)
    }
  }

  useEffect(() => {
    (async () => {
      const min_value = await fetch(`https://nislotbet.com/api/getcashoutvalue?database=${process.env.DATABASE}`, { method: 'GET', cache: 'no-cache'})
      const cashout = await min_value.json()
      setMinimoreal(cashout.data[0].valor ?? 0)
      const base_url = `https://nislotbet.com/api/fivescancheck`
      const Headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://nislotbet.com/',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
      const roles = await fetch('https://nislotbet.com/api/getroles', { method: 'POST', body: JSON.stringify({ id: user?.id, database: process.env.DATABASE })})
      const roles_ = await roles.json()
      if(roles_.data.includes(2)){
        const request = await fetch(base_url, { method: 'POST', cache: 'no-cache', body: JSON.stringify({email: user?.email, id: user?.id, influencer: true, database: process.env.DATABASE}), headers: Headers})
        const response = await request.json()
        setBalanceReal(response.balance*100)
      }else{
        const request = await fetch(base_url, { method: 'POST', cache: 'no-cache', body: JSON.stringify({email: user?.email, id: user?.id, influencer: false, database: process.env.DATABASE}), headers: Headers})
        const response = await request.json()
        setBalanceReal(response.balance*100)
      }
    })()
    fetchAccount()
    fetchWallets()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (wallets?.length) {
      if (wallets[0].id) setValue('wallet_id', String(wallets[0].id))
      if (wallets[0].balance) setValue('balance', Number(wallets[0].balance))
      if (wallets[0].min_cashout_amount) setValue('min_cashout_amount', Number(wallets[0].min_cashout_amount))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallets])

  if (isLoadingAccount || isLoadingWallet) {
    return (
      <div className='mt-8 w-full flex items-center justify-center'>
        <div className='rounded-full border-r-green-900 border-b-green-900 border-4 border-green-500 h-8 w-8 animate-spin'></div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='text-lg text-green-500 font-bold mb-4'>Solicitar Saque</div>


      {pixKeys?.pix_key ? (
        <>
          <div className='text-base font mb-3 flex'>
            <div>
              Minha Chave PIX: <span className='font-bold'>{pixKeys?.pix_key}</span><br />
              Tipo da Chave: <span className='font-bold'>{pixKeys?.pix_key_type.toUpperCase()}</span>
            </div>

            <Link
              href='/user/account'
              title="Alterar chave PIX"
              onClick={() => setCloseModal()}
              className='h-8 flex items-center justify-center gap-2 rounded p-2 border border-green-500 hover:bg-zinc-400/20 text-white ml-4'
            >
              <PencilSquareIcon width={20} height={20} className='text-green-500' />
              <span className='text-xs'>
                Alterar PIX
              </span>
            </Link>
          </div >

          <div className='text-sm font-semibold mb-3'>
            Meu CPF: <span className='font-bold'>{user?.document}</span>
          </div>

          <div className='text-xs font-semibold text-orange-500 mb-3'>
            Atenção! Seu saque só pode ser realizado na chave PIX vinculada ao CPF informado no seu cadastro
          </div>

          <div className='floating mb-3 relative'>
            <select
              {...register("wallet_id")}
              className={`${errors.wallet_id?.message && 'border-red-500 border rounded-b-none'} disabled:cursor-not-allowed bg-zinc-900 text-base text-zinc-300 appearance-none block w-full px-4 h-14 leading-10 rounded shadow-sm placeholder-gray-400 focus:outline-none focus:ring-0`}
              onChange={(event) => handleChangeWallet(event)}
            >
              {wallets?.map((wallet) => (
                <option
                  key={wallet.id}
                  value={wallet.id}
                >{wallet?.name}
                </option>
              ))}
            </select>
            <label
              className="block mb-2 uppercase text-zinc-400 text-xs font-bold absolute top-0 left-0 px-4 py-[1.35rem] h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out "
            >
              Carteira
            </label>

            {errors?.wallet_id?.message &&
              <div className="text-xs p-1 text-white text-center font-normal bg-red-500 w-full rounded-b-md">
                {errors?.wallet_id?.message}
              </div>
            }
          </div>

          <Input
            type="tel"
            title="Valor a ser sacado"
            currency={true}
            {...register('amount')}
            errors={errors.amount?.message}
          />
          
          <div className='-mt-1 text-sm font-semibold'>
            Disponivel para saque: <span className='text-green-500'>{formatCentsToBRL(Number(balancereal))}</span>
          </div>

          <div className='text-sm font-semibold text-red-500 mb-3'>
            Valor mínimo do saque é de {formatCentsToBRL(Number(minimoreal))}
          </div>

          <BadgeErrorsMessage
            type={messageError.type}
            message={messageError.message} />

          <button
            type="submit"
            className='rounded w-full bg-green-500 hover:bg-green-500/70 text-zinc-900 p-2 text-center font-bold shadow-green'>
            Sacar
          </button>
        </>
      ) : (
        <div className='border border-red-500 rounded-lg p-4 flex flex-col gap-4'>
          Para efetuar saque, cadastre sua chave PIX.
          <Link
            href='/user/account'

            title="Cadastrar chave PIX"
            onClick={() => setCloseModal()}
            className='h-8 flex items-center justify-center gap-2 rounded p-2 border border-green-500 hover:bg-zinc-400/20 text-white'
          >
            <PencilSquareIcon width={20} height={20} className='text-green-500' />
            <span className='text-xs'>
              Cadastrar PIX
            </span>
          </Link>
        </div>
      )}
    </form>
  )
}