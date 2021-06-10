import React, { useEffect, useState } from 'react';

const useApiCall = (url: string) => {
    const [data, setData] = useState()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchApi();
    },[])

    const fetchApi = async () => {
        setLoading(true)
        try {
            const response = await fetch(url)
            const data = await response.json();
            setData(data)
            setLoading(false)
        }
        catch(e) {
            setError(e.message)
            setLoading(false)
        }
       
    }

    return [{
        data: data,
        error: error,
        loading: loading
    }]


}

export default useApiCall