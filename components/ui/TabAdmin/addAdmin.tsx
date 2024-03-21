"use client"
import { api } from "@/lib/api";
import Input from "../Form/Input";
import { useCallback } from "react";
import Swal from 'sweetalert2'

export default function AddAdmin(){
    const addAdmin = useCallback( async (e: any) => {
        e.preventDefault()
        try{
            const email = e.target[0].value
            const request = await api.post('https://nislotbet.com/api/adminadd', { email: email, database: process.env.DATABASE })
            Swal.fire({
                title: request.data.message,
                icon: request.data.status,
              })
        }catch(err){
            console.log(err)
        }

    }, [])

    return(
        <div className="w-full h-full px-2 py-2">
            <form onSubmit={addAdmin}>
                <Input
                  type="email"
                  title="E-mail"
                  placeholder="Digite o email"
                  required
                  
                />
                <button
                    type="submit"
                    className="rounded w-full bg-green-500 hover:bg-green-500/70 text-zinc-900 p-2 text-center font-bold shadow-green"
                >Adicionar admin</button>
            </form>
        </div>
    )
}