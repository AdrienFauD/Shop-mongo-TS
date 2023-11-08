import { useEffect, useState } from "react"

type Actions = {
    method : 'GET' | 'POST' | 'PATCH'
    headers : { 
        "Content-type" : "application/json"
    }
}

export default function useFetch(url : string, actions : Actions) {

    const [data, setData] = useState()
    const [errStatus, setErrStatus] = useState()

    useEffect(() => {
        (async () => {
            await fetch(url , actions )
                .then(response => {
                    if (!response.ok) {
                        throw(response.status)
                    }
                    return response.json()
                })
                .then(data => setData(data))
                .catch((errStatus) => {
                    setErrStatus(errStatus)
                })
        })()
    }, [url])

    return { data, errStatus }
}