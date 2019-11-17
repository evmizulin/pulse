import React, { useCallback, useReducer, useState, useEffect, useMemo } from 'react'
import { reducer, initialState, onLengthChangeAction, onCellClickAction } from './reducer'
import { onPlayNextAction } from './reducer'

import cn from './App.module.scss'

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [playing, setPlaying] = useState(false)
  const [temp, setTemp] = useState(150)

  const onTempChangeHandler = useCallback((event) => {
    const value = +event.target.value
    if (Number.isNaN(value) || value < 0) return
    setTemp(Math.round(value))
  }, [])

  const onDoubleTempHandler = useCallback((event) => {
    const value = temp * 2
    if (Number.isNaN(value) || value < 0) return
    setTemp(Math.round(value))
  }, [temp])

  const onHalfTempHandler = useCallback((event) => {
    const value = temp / 2
    if (Number.isNaN(value) || value < 0) return
    setTemp(Math.round(value))
  }, [temp])

  const onLengthChangeHandler = useCallback((event) => {
    const value = +event.target.value
    if (Number.isNaN(value) || value < 0) return
    dispatch(onLengthChangeAction(Math.round(value)))
  }, [])

  const onCellClickHandler = useCallback((event) => {
    const rowIndex = +event.target.getAttribute('data-row-index')
    const cellIndex = +event.target.getAttribute('data-cell-index')
    dispatch(onCellClickAction({ rowIndex, cellIndex }))
  }, [])

  const onPlayClick = useCallback(() => {
    setPlaying(true)
  }, [])

  const onStopClick = useCallback(() => {
    setPlaying(false)
  }, [])

  const activeRowIndex = useMemo(() => {
    if (!playing) return null
    return state.playRow === 0 ? state.track.length - 1 : state.playRow - 1
  }, [playing, state])

  useEffect(() => {
    if (!playing) return
    const intervalId = setInterval(() => {
      dispatch(onPlayNextAction())
    }, 60000 / temp)
    return () => clearInterval(intervalId)
  }, [temp, playing])

  return (
    <div className={cn.root}>
      <div>
        <div className={cn.table}>
          <div className={cn.header}>
            <div className={cn.anotation}></div>
            <div className={cn.anotation}>B</div>
            <div className={cn.anotation}>t</div>
            <div className={cn.anotation}>S</div>
          </div>
          {state.track.map((row, rowIndex) => (
            <div className={`${cn.row} ${rowIndex === activeRowIndex ? cn.active : ''}`} key={rowIndex}>
              <div className={cn.anotation}>{rowIndex + 1}</div>
              {row.map((item, cellIndex) => (
                <div
                  data-row-index={rowIndex}
                  data-cell-index={cellIndex}
                  key={cellIndex}
                  className={`${item ? cn.active : ''} ${cn.cell}`}
                  onClick={onCellClickHandler}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className={cn.input}>
          <div>Размер</div>
          <div>
            <input type="text" value={`${state.track.length}`} onChange={onLengthChangeHandler}/>
          </div>
        </div>
        <div className={cn.input}>
          <div>Темп</div>
          <div>
            <input type="text" value={`${temp}`} onChange={onTempChangeHandler}/>
            <button onClick={onDoubleTempHandler}>x2</button>
            <button onClick={onHalfTempHandler}>/2</button>
          </div>
        </div>
        <div className={cn.button}>
          <button onClick={onPlayClick}>Play</button>
          <button onClick={onStopClick}>Pause</button>
        </div>
      </div>
    </div>
  )
}

export default App
