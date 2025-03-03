import axios from "axios"
import { useEffect, useState } from "react"

const useFetch = (endPoint) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const fetchData = async () => {
        try {
            setLoading(true)
            const response = await axios.get(endPoint)
            setLoading(false)
            setData(response.data.results)
        }
        catch (error) {
            console.log("useFetch err:", error)
        }
    }


    useEffect(() => {
        fetchData()
    }, [])
    return { data, loading }
}

export default useFetch