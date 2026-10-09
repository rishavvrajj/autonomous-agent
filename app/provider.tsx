import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import axios from "axios";

export default function Provider({ children }: { children: React.ReactNode }) {
    const { data } = useSession();

    useEffect(() => {
        data?.user?.email && createNewUser()
    }, [data])

    const createNewUser = async () => {
        const result = await axios.post('/api/user', {});
        console.log(result.data)
    }
    return (
        <div>
            {children}
        </div>
    )
}