import axios from "axios"
import { useEffect, useState } from "react"

const useFetchDetail = (endPoint) => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    const fetchData = async () => {
        try {
            setLoading(true)
            const response = await axios.get(endPoint)
            setLoading(false)
            setData(response.data)
        }
        catch (error) {
            console.log("useFetch err:", error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [endPoint])
    return { data, loading }
}

export default useFetchDetail