import React, { Fragment } from 'react'
import { useDataApi } from './useDataApi'
import { dataFetchReducer } from './Reducer'

function App() {
  const { data, isLoading, isError, doFetch, doSetconfig } = useDataApi(
    'url', // 放的url
    { method:'get' },
    { list: [] },
    dataFetchReducer
  )
  return (
    <Fragment>
      <button
        onClick={event => {
          doFetch(`url`) // 放的url
          doSetconfig({})
          event.preventDefault()
        }}
      >
        Search
      </button>

      {isError && <div>出现错误</div>}

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <ul>
         {data.list.map(item => (
            <li key={item.id}>
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  )
}

export default App
