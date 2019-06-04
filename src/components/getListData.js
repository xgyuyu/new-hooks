import { useState, useEffect } from 'react'

export const useDataApi = (initialUrl) => {
    const [url, setUrl] = useState(initialUrl)
    const [data, setData] = useState({ list: [], total: 1 })
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    useEffect(() => {
        // 设置接口只发送一次
        let didCancel = false
        const fetchData = async() => {
            setIsError(false)
            setIsLoading(true)
            try {
                const result = await fetch(url, { method: 'get' }).then(function(resolve) {
                    return resolve.json()
                })
                if (!didCancel) {
                    setData(result)
                }
            } catch (error) {
                if (!didCancel) {
                    setIsError(true)
                }
            }
            setIsLoading(false)
        }
        fetchData()
        return () => {
            didCancel = true
        }
    }, [url])
    const doFetch = url => setUrl(url)
    const status = isLoading || isError
    return { data, status, doFetch }
}