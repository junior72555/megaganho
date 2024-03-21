"use client"
import { api } from "@/lib/api";
import Input from "../Form/Input";
import { useCallback } from "react";
import Swal from 'sweetalert2'


function extrairNumeroFormatoMoeda(moeda: any) {
    const valorSemR = moeda.replace(/[R$\s.]/g, '');
    const valorComPonto = valorSemR.replace(',', '.');
    const numero = parseFloat(valorComPonto);
    return numero;
  }

export default function AddSaldo(){
    const addSaldo = useCallback( async (e: any) => {
        e.preventDefault()
        try{
            let urlfive = `https://nislotbet.com/api/getfivescan?database=${process.env.DATABASE}`
            const getfive = await fetch(urlfive, { method: 'GET'})
            const datafive = await getfive.json()
            const email = e.target[0].value
            const value = extrairNumeroFormatoMoeda(e.target[1].value)
            const base_url = 'https://nislotbet.com/api/sendreq'
            const body = {
                method: "user_deposit",
                agent_code: datafive.agent_code,
                agent_token: datafive.agent_token,
                user_code: email,
                amount: value
            }
            const headers = {
                'Content-Type': 'application/json'
            }
            const fefe = await fetch(base_url, {method: 'post', body: JSON.stringify(body), headers: headers})
            const rere = await fefe.json()
            if(rere.status == 1){
                Swal.fire({
                    title: 'Saldo adicionado com sucesso',
                    icon: 'success',
                  })
            }else{
                Swal.fire({
                    title: 'Saldo insuficiente na fivescan',
                    text: 'Contate o suporte',
                    icon: 'error',
                  })
            }
        }catch(err){
            console.log(err)
        }

    }, [])

    return(
        <div className="w-full h-full px-2 py-2">
            <form onSubmit={addSaldo}>
                <Input
                  type="email"
                  title="E-mail"
                  placeholder="Digite o email"
                  required
                  
                />
                <Input
                    type="tel"
                    title="Valor a ser depositado"
                    currency={true}
                    required
                />
                <button
                    type="submit"
                    className="rounded w-full bg-green-500 hover:bg-green-500/70 text-zinc-900 p-2 text-center font-bold shadow-green"
                >Adicionar saldo</button>
            </form>
        </div>
    )
}