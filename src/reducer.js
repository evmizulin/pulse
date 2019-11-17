import { audios } from './audios'

const query = decodeURI(window.location.search.substr(1))

export const initialState =
  !query ?
    {
      playRow: 0,
      signature: '--------',
      track: Array(8)
        .fill(null)
        .map((item) => Array(3).fill(false)),
    } :
    {
      playRow: 0,
      signature: query,
      track: signatureToTrack(query),
    }

const onLengthChange = (state, action) => {
  const { length } = action.payload
  const newTrack = Array(length)
    .fill(null)
    .map((item, index) => {
      return state.track[index] || Array(3).fill(false)
    })

  return {
    ...state,
    track: newTrack,
    signature: trackToSignature(newTrack),
  }
}

function trackToSignature(track) {
  let signature = ''
  track.forEach(function(row) {
    if (row[0]) signature += 'B'
    else if (row[1]) signature += 't'
    else if (row[2]) signature += 'S'
    else signature += '-'
  })
  return signature
}

function signatureToTrack(signature) {
  const normalizedSignature = signature.toLowerCase().replace(/\s/g, '')
  return Array(normalizedSignature.length)
    .fill(null)
    .map((item, index) => {
      const row = Array(3).fill(false)
      switch (normalizedSignature[index]) {
        case 'b':
          row[0] = true
          break
        case 't':
          row[1] = true
          break
        case 's':
          row[2] = true
          break
        default:
          break
      }
      return row
    })
}

const onSignatureChange = (state, action) => {
  const signature = action.payload.signature.value

  const newTrack = signatureToTrack(signature)

  return {
    ...state,
    signature: signature,
    track: newTrack,
  }
}

const onCellClick = (state, action) => {
  const { rowIndex, cellIndex } = action.payload

  const newTrack = state.track.map((item, index) => {
    return rowIndex !== index
      ? item
      : item.map((item, index) => {
        return index !== cellIndex ? false : !item
      })
  })

  return {
    ...state,
    track: newTrack,
    signature: trackToSignature(newTrack),
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
  onCellClick,
  onPlayNext,
  onSignatureChange,
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

export const onSignatureChangeAction = (signature) => ({
  type: 'onSignatureChange',
  payload: {
    signature,
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
