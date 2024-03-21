"use client"

import { useEffect, useState } from "react"

export default function SaldoApi(){
    const [balance, setBalance] = useState(0)
    useEffect(() => {
        (async () => {
            const base_url = `https://nislotbet.com/api/balanceapi?database=${process.env.DATABASE}`
            const request = await fetch(base_url, { method: 'GET'})
            const response = await request.json()
            setBalance(response.balance)
        })()
    }, [])
    return(
        <div className="flex flex-col w-full h-full px-2 py-2 justify-center items-center">
            <div className="text-white text-xl px-10 py-10">
                SALDO FIVESCAN: R$ {balance}
            </div>
        </div>
    )
}