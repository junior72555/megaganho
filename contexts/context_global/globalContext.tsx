'use client'

import { createContext, useContext, Dispatch, SetStateAction, useState } from "react"

interface ContextProps {
    email: string;
    setEmail: Dispatch<SetStateAction<string>>;

}

const GlobalContext = createContext<ContextProps>({
    email: '',
    setEmail: (): string => '',
})

export const GlobalContextProvider = ( { children }: { children: React.ReactNode} ) => {
    const [email, setEmail] = useState('')

    return(
        <GlobalContext.Provider value={{ email, setEmail }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext)