import { audios } from './audios'

export const initialState = {
  playRow: 0,
  track: Array(8)
    .fill(null)
    .map((item) => Array(3).fill(false)),
}

const onLengthChange = (state, action) => {
  const { length } = action.payload

  return {
    ...state,
    track: Array(length)
      .fill(null)
      .map((item, index) => {
        return state.track[index] || Array(3).fill(false)
      }),
  }
}

const onCellClick = (state, action) => {
  const { rowIndex, cellIndex } = action.payload

  return {
    ...state,
    track: state.track.map((item, index) => {
      return rowIndex !== index
        ? item
        : item.map((item, index) => {
            return index !== cellIndex ? false : !item
          })
    }),
  }
}

const onPlayNext = (state, action) => {
  const { playRow, track } = state

  if (!track.length) return { ...state, playRow: 0 }

  const realPlayRow = track[playRow] ? playRow : 0

  // audios.forEach((audio) => {
  //   audio.pause()
  //   audio.currentTime = 0
  // })

  const cellIndex = track[realPlayRow].findIndex((item) => item)

  if (cellIndex > -1) {
    audios[cellIndex].currentTime = 0
    audios[cellIndex].play()
  }

  return {
    ...state,
    playRow: track[realPlayRow + 1] ? realPlayRow + 1 : 0,
  }
}

const MAP = {
  onLengthChange,
  onCellClick: onCellClick,
  onPlayNext,
}

export const reducer = (state, action) => {
  return MAP[action.type](state, action)
}

export const onLengthChangeAction = (length) => ({
  type: 'onLengthChange',
  payload: {
    length,
  },
})

export const onCellClickAction = ({ rowIndex, cellIndex }) => ({
  type: 'onCellClick',
  payload: {
    rowIndex,
    cellIndex,
  },
})

export const onPlayNextAction = () => ({
  type: 'onPlayNext',
  payload: {},
})
