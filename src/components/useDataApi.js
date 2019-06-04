import { useState, useEffect, useReducer } from 'react'

export const useDataApi = (initialUrl, initConfig, initialData, dataFetchReducer) => {

  const [url, setUrl] = useState(initialUrl)
  const [config, setConfig] = useState(initConfig)
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  })

  useEffect(() => {
    // 设置接口只发送一次
    let didCancel = false
    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' })
      try {
        const result = await fetch(url, Object.assign(initConfig)).then(function(resolve){
          return resolve.json()
        })
        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload: result })
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE' })
        }
      }
    }
    fetchData()
    return () => {
      didCancel = true
    }
  }, [url, config])
  const doFetch = url => {
    setUrl(url)
  }
  const doSetconfig = config => {
    setConfig(config)
  }
  return { ...state, doFetch, doSetconfig }
}
