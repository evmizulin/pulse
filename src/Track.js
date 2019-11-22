import cn from './App.module.scss'
import * as PropTypes from 'prop-types'
import React from 'react'

export function Track(props) {
  return <div className={cn.table}>
    <div className={cn.header}>
      <div className={cn.annotation}></div>
      <div className={cn.annotation}>B</div>
      <div className={cn.annotation}>t</div>
      <div className={cn.annotation}>S</div>
    </div>
    {props.track.map((row, rowIndex) => (
      <TrackRow key={rowIndex}
                rowIndex={rowIndex}
                activeRowIndex={props.activeRowIndex}
                row={row}
                onCellClick={props.onCellClick}/>))}
  </div>
}

Track.propTypes = {
  track: PropTypes.array,
  activeRowIndex: PropTypes.number,
  onCellClick: PropTypes.func,
}

export function TrackRow(props) {
  return <div className={`${cn.row} ${props.rowIndex === props.activeRowIndex ? cn.active : ''}`}>
    <div className={cn.annotation}>{props.rowIndex + 1}</div>
    {props.row.map((item, cellIndex) => <TrackCell key={cellIndex}
                                                   active={!!item}
                                                   rowIndex={props.rowIndex} cellIndex={cellIndex}
                                                   onClick={props.onCellClick}/>,
    )}
  </div>
}

TrackRow.propTypes = {
  row: PropTypes.array,
  rowIndex: PropTypes.number,
  activeRowIndex: PropTypes.number,
  onCellClick: PropTypes.func,
}

function TrackCell(props) {
  return <div
    className={`${props.active ? cn.active : ''} ${cn.cell}`}>
    <div
      className={cn.inner}
      data-row-index={props.rowIndex}
      data-cell-index={props.cellIndex}
      onClick={props.onClick}
    />
  </div>
}

TrackCell.propTypes = {
  active: PropTypes.bool,
  rowIndex: PropTypes.number,
  cellIndex: PropTypes.number,
  onClick: PropTypes.func,
}



