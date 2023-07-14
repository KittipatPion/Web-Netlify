import { useState, useEffect } from 'react'

class fetchs {
    
}

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const options = {
        method: "POST",
    };
    const getData = async () => {
        const response = await fetch(url, options)
        const userdata = await response.json()

        if (userdata.httpCode == 200) {
            setIsLoaded(true)
            setData(userdata)
        } else {
            setIsLoaded(false)
            console.log('error')
        }
    }

    useEffect(() => {
        getData();
    }, [url])

    return { data, error, isLoaded }
}


export default useFetch;




