"use client"
import { api } from "@/lib/api";
import Input from "../Form/Input";
import { useCallback } from "react";
import Swal from 'sweetalert2'

export default function UpdateSaque(){
    const updateSaque = useCallback( async (e: any) => {
        e.preventDefault()
        try{
            const saque = Number(e.target[0].value.replace(/[^0-9]/g, ''))
            const percentage = Number(e.target[1].value)
            const request = await fetch('https://nislotbet.com/api/updateminimo', {
                method: 'POST',
                body: JSON.stringify({valor: saque, database: process.env.DATABASE})
            })
            const request2 = await fetch('https://nislotbet.com/api/updatepercentage', {
                method: 'POST',
                body: JSON.stringify({valor: percentage, database: process.env.DATABASE})
            })

            const response = await request.json()
            const response2 = await request2.json()
            if(response.data.affectedRows == 1 && response2.data.affectedRows == 1){
                Swal.fire({
                    title: 'Saque mínimo!',
                    text: 'Saque alterado com sucesso!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 3000
                  })
            }else{
                Swal.fire({
                    title: 'Saque mínimo!',
                    text: 'Saque não alterado!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 3000
                  })
            }
        }catch(err){
            Swal.fire({
                title: 'Saque mínimo!',
                text: 'Saque não alterado!',
                icon: 'success',
                showConfirmButton: false,
                timer: 3000
              })
    }

    }, [])

    return(
        <div className="w-full h-full px-2 py-2">
            <form onSubmit={updateSaque}>
                <Input
                  type="valor"
                  title="Valor"
                  placeholder="Digite o valor"
                  currency={true}
                  required
                />
                <Input
                  type="porcentagem"
                  title="Porcentagem"
                  placeholder="Digite a porcentagem"
                  required
                />
                <button
                    type="submit"
                    className="rounded w-full bg-green-500 hover:bg-green-500/70 text-zinc-900 p-2 text-center font-bold shadow-green"
                >Alterar valor mínimo</button>
            </form>
        </div>
    )
}