'use client'
import { GiConfirmed } from "react-icons/gi"
import { MdCancel } from "react-icons/md"
import { cache, useCallback, useEffect, useState } from "react";
import Swal from 'sweetalert2'
import axios from 'axios'

interface DATA_PROPS {
    hash: string,
    user_id: number,
    created_at: string,
    status: string,
    amount: number,
}
interface DATA2_PROPS {
    id: number,
    email: string
}

function formatarData(dataString: string) {
    const data = new Date(dataString);
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0'); // Lembrando que os meses são zero-indexed
    const ano = data.getFullYear();
    const horas = data.getHours().toString().padStart(2, '0');
    const minutos = data.getMinutes().toString().padStart(2, '0');
    const segundos = data.getSeconds().toString().padStart(2, '0');
    return `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;
}

function encontrarDadosPorId(id: number, lista: DATA2_PROPS[] ) {
    const dadosEncontrados = lista.find(item => item.id === id);
    return dadosEncontrados?.email || id
}

export default function TableElegant(){
    const [data, setData] = useState<DATA_PROPS[]>([])
    const [data2, setData2] = useState<DATA2_PROPS[]>([])

    const buttoncr = useCallback(async (action: string, hash: string) => {
        const request = await fetch('https://nislotbet.com/api/updatecashout', { method: 'POST', cache: 'no-store', body: JSON.stringify({ status: action, hash: hash, database: process.env.DATABASE})})
        const response = await request.json()
        if(response.data.affectedRows === 1){
            Swal.fire({
                title: 'Pagamento!',
                text: `Pagamento ${action == 'approved' ? 'aprovado': 'negado'} com sucesso!`,
                icon: 'success',
                showConfirmButton: false,
                timer: 3000
              })
              const requestreq = await fetch(`https://nislotbet.com/api/getallsaquesreq?database=${process.env.DATABASE}`,  {
                method: 'GET',
                cache: 'no-cache'
              })
              const datareq = await requestreq.json()
              setData(datareq.data)
        }else{
            Swal.fire({
                title: 'Pagamento!',
                text: 'Ocorreu algum erro!',
                icon: 'error',
                showConfirmButton: false,
                timer: 3000
              })
        }
    }, [])

    useEffect(() => {
        (async () => {
            const requestreq = await fetch(`https://nislotbet.com/api/getallsaquesreq?database=${process.env.DATABASE}`,  {
              method: 'GET',
              cache: 'no-cache'
            })
            const datareq = await requestreq.json()

            const requestreq2 = await fetch(`https://nislotbet.com/api/getallusers?database=${process.env.DATABASE}`,  {
              method: 'GET',
              cache: 'no-cache'
            })
            const datareq2 = await requestreq2.json()
            setData2(datareq2.data)
            setData(datareq.data)
        })()
    }, [])
    return(
        <table className="min-w-full bg-slate-600 border border-gray-200 shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="py-3 px-4 text-left font-semibold text-gray-200">Email</th>
            <th className="py-3 px-4 text-left font-semibold text-gray-200">Data/hora</th>
            <th className="py-3 px-4 text-left font-semibold text-gray-200">Valor</th>
            <th className="py-3 px-4 text-left font-semibold text-gray-200">Status</th>
            <th className="py-3 px-4 text-left font-semibold text-gray-200">Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className={'bg-slate-600'}>
              <td className="py-2 px-4 border-b border-gray-200">{encontrarDadosPorId(item.user_id, data2)}</td>
              <td className="py-2 px-4 border-b border-gray-200">{formatarData(item.created_at)}</td>
              <td className="py-2 px-4 border-b border-gray-200">R$ {item.amount/100}</td>
              <td className="py-2 px-4 border-b border-gray-200">{item.status === 'pending' && 'Pendente'}</td>
              <td className="py-2 px-4 border-b border-gray-200">
                <GiConfirmed onClick={() => {buttoncr('approved', item.hash)}} className="text-green-400 cursor-pointer hover:text-green-500" size={20}/> <MdCancel onClick={() => {buttoncr('error', item.hash)}} className="text-red-400 cursor-pointer hover:text-red-600" size={20}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
}