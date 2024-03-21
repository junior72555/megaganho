"use client"
import { useEffect, useState } from "react"
        
export default function TotalDeposits() {
    const [deposits , setDeposits] = useState(0)
    
    useEffect(() => {
        (async () => {
            const base_url = `https://nislotbet.com/api/apideposits?database=${process.env.DATABASE}`
            const request = await fetch(base_url, {
                method: 'GET'
            })
            const response = await request.json()
            const dataReformulada = response.data.map((item: any) => ({
                ...item,
                amount: item.amount / 100
            }))
            const somaTotal = dataReformulada.reduce((total: number, item: any) => total + item.amount, 0)
            setDeposits(somaTotal)
        })()
    }, [])

    return(
        <div className="flex flex-col w-full h-full px-2 py-2 justify-center items-center">
            <div className="text-white text-xl px-10 py-10">
                DEPÓSITOS: R$ {deposits}
            </div>
        </div>
    )
}