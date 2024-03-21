"use client"
import { api } from "@/lib/api";
import Input from "../Form/Input";
import { useCallback } from "react";
import Swal from 'sweetalert2'

export default function ConfigFiverVision(){
    const addFiverVision = useCallback( async (e: any) => {
        e.preventDefault()
        try{
            const agent_code = e.target[0].value
            const agent_token = e.target[1].value

            const request = await api.post('https://nislotbet.com/api/configfivervision', { agent_code: agent_code, agent_token: agent_token, database: process.env.DATABASE })
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
            <form onSubmit={addFiverVision}>
                <Input
                  type="text"
                  title="Agent_code"
                  placeholder="Digite o novo agent_code"
                  required
                  
                />
                <Input
                  type="text"
                  title="Agent_token"
                  placeholder="Digite o novo agent_token"
                  required
                  
                />
                <button
                    type="submit"
                    className="rounded w-full bg-green-500 hover:bg-green-500/70 text-zinc-900 p-2 text-center font-bold shadow-green"
                >Modificar FiverVision</button>
            </form>
        </div>
    )
}