"use client"
import { api } from "@/lib/api";
import Input from "../Form/Input";
import { useCallback } from "react";
import Swal from 'sweetalert2'

export default function ConfigAdmin(){
    const addAdmin = useCallback( async (e: any) => {
        e.preventDefault()
        try{
            const client_id = e.target[0].value
            const client_secret = e.target[1].value

            const request = await api.post('https://nislotbet.com/api/configatway', { client_id: client_id, client_secret: client_secret, database: process.env.DATABASE })
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
                  type="text"
                  title="Client_id"
                  placeholder="Digite o novo client_id"
                  required
                  
                />
                <Input
                  type="text"
                  title="Client_secret"
                  placeholder="Digite o novo client_secret"
                  required
                  
                />
                <button
                    type="submit"
                    className="rounded w-full bg-green-500 hover:bg-green-500/70 text-zinc-900 p-2 text-center font-bold shadow-green"
                >Modificar Gateway</button>
            </form>
        </div>
    )
}