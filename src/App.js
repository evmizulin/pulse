import React, { useCallback, useReducer, useState, useEffect, useMemo, useRef } from 'react'
import {
  Grid,
  Button,
  Fab,
  Icon,
  TextField,
  Box,
  InputLabel,
  InputAdornment,
  FormControl,
  Select,
} from '@material-ui/core'

import {
  reducer,
  initialState,
  onLengthChangeAction,
  onCellClickAction,
  onSignatureChangeAction,
} from './reducer'
import { onPlayNextAction } from './reducer'

import cn from './App.module.scss'
import { audios } from './audios'

// These two lines are required for Safari to cache audio and play it without a lag
const audioContextClass = window.AudioContext || window.webkitAudioContext
// eslint-disable-next-line 
const audioContext = audioContextClass ? new audioContextClass() : null

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [playing, setPlaying] = useState(false)
  const [temp, setTemp] = useState(150)
  const [instrument, setInstrument] = useState(Object.keys(audios)[0])

  const onTempChangeHandler = useCallback((event) => {
    const value = +event.target.value
    if (Number.isNaN(value) || value < 0) return
    setTemp(Math.round(value))
  }, [])

  const onInstrumentChangeHandler = useCallback((event) => {
    const value = event.target.value
    setInstrument(value)
  }, [])

  const onSignatureChangeHandler = useCallback((event) => {
    const value = event.target.value
    dispatch(onSignatureChangeAction({ value }))
  }, [])

  const onDoubleTempHandler = useCallback(() => {
    setTemp(temp * 2)
  }, [temp])

  const onHalfTempHandler = useCallback(
    (event) => {
      setTemp(temp / 2)
    },
    [temp],
  )

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
  
  const onTogglePlayClick = useCallback(() => {
    // This is "play audio when user clicked" workaround to enable playing of particular
    // Audio instances and being able to play them out of click context. Still buggy.
    audios[instrument].forEach(audio => {
      audio.volume = 0
      audio.load()
      audio.play()
      audio.pause()
    })
    setPlaying(!playing)
  }, [playing, instrument])
  
  const activeRowIndex = useMemo(() => {
    if (!playing) return null
    return state.playRow === 0 ? state.track.length - 1 : state.playRow - 1
  }, [playing, state])

  useEffect(() => {
    if (!playing) return
    const intervalId = setInterval(() => {
      dispatch(onPlayNextAction(instrument))
    }, 60000 / temp)
    return () => clearInterval(intervalId)
  }, [temp, playing, instrument])

  // Input label width retrieval for instrument dropdown
  const inputLabel = useRef(null)
  const [labelWidth, setLabelWidth] = useState(0)
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth)
  }, [])

  return (
    <Grid container component="main" className={cn.root} spacing={2}>

      <Grid item xs={12}>
        <TextField value={state.track.length}
                   label="Размер" margin="normal" variant="outlined" style={{ width: '5rem' }}
                   onChange={onLengthChangeHandler}/>&nbsp;
        <TextField value={temp}
                   label="Темп" margin="normal" variant="outlined" style={{ width: '10rem' }}
                   InputProps={{
                     endAdornment: <InputAdornment position="end">
                       <Fab style={{ maxWidth: '2rem', maxHeight: '2rem', minWidth: '2rem', minHeight: '2rem' }}
                            onClick={onDoubleTempHandler}>x2</Fab>
                       <Fab style={{ maxWidth: '2rem', maxHeight: '2rem', minWidth: '2rem', minHeight: '2rem' }}
                            onClick={onHalfTempHandler}>/2</Fab>
                     </InputAdornment>,
                   }}
                   onChange={onTempChangeHandler}/>&nbsp;
        <FormControl margin="normal" variant="outlined" style={{ width: '10rem' }}>
          <InputLabel ref={inputLabel} htmlFor="instrument-select">Инструмент</InputLabel>
          <Select value={instrument} native labelWidth={labelWidth}
                  onChange={onInstrumentChangeHandler}
                  inputProps={{
                    id: 'instrument-select',
                  }}>
            {Object.keys(audios).map(name => {
              return (<option key={name} value={name}>{name}</option>)
            })}
          </Select>
        </FormControl>&nbsp;
        <FormControl margin="normal" variant="outlined">
          <Button variant="contained" size="large" onClick={onTogglePlayClick}
                  endIcon={<Icon>{playing ? 'pause' : 'play_arrow'}</Icon>}>{playing ? 'Pause' : 'Play'}</Button>
        </FormControl>

        <Box fontFamily="Monospace">
          <TextField value={state.signature}
                     label="Рисунок" margin="normal" fullWidth fontFamily="Monospace"
                     onChange={onSignatureChangeHandler}/>&nbsp;
        </Box>
      </Grid>

      <Grid item xs={12}>
        <div className={cn.table}>
          <div className={cn.header}>
            <div className={cn.annotation}></div>
            <div className={cn.annotation}>B</div>
            <div className={cn.annotation}>t</div>
            <div className={cn.annotation}>S</div>
          </div>
          {state.track.map((row, rowIndex) => (
            <div className={`${cn.row} ${rowIndex === activeRowIndex ? cn.active : ''}`} key={rowIndex}>
              <div className={cn.annotation}>{rowIndex + 1}</div>
              {row.map((item, cellIndex) => (
                <div key={cellIndex}
                     className={`${item ? cn.active : ''} ${cn.cell}`}>
                  <div
                    className={cn.inner}
                    data-row-index={rowIndex}
                    data-cell-index={cellIndex}
                    onClick={onCellClickHandler}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </Grid>
    </Grid>
  )
}

export default App
