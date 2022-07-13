import React from 'react'
import {NavLink} from 'react-router-dom'
const LevelsCard = ({level}) => {
  return (
    <NavLink to={`/:${level.id}`} className='level'>
        <img src={level.imgLink} alt="" />
        <div><span style={{fontWeight:"bold"}}>Level:</span>{level.id}</div>
        <div><span style={{fontWeight:"bold"}}>Difficulty:</span> {level.difficulty}</div>
    </NavLink>
  )
}

export default LevelsCard