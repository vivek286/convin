import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getHistory } from '../../utils/cardSlice'

const History = () => {
  const {history} = useSelector(state => state.card)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getHistory())
  }, [])

  return (
    <div className='buckets-container'>
      <h1 style={{ marginBottom: "25px"}}>History</h1>
      {history?.map((each, index) => (
        <div key={index} className='each-bucket'>
          <div>{each.name}</div>
          <div>{new Date(parseInt(each.time)).toDateString().slice(0, 10)}, {new Date(parseInt(each.time)).toTimeString().slice(0, 8)}</div>
        </div>
      ))}
    </div>
  )
}

export default History