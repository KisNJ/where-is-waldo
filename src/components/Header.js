import React from 'react'
import './header.css'
import {NavLink} from 'react-router-dom'
const Header = ({timer}) => {
  return (
    <header>
        <h1>Find Waldo</h1>
        <div id='right'>
            <NavLink to="/leaderboard">Leaderboard</NavLink>
            <NavLink to="/">Levels</NavLink>
            <div>{timer<0||isNaN(timer)?0:timer}s</div>
        </div>
    </header>
  )
}

export default Header