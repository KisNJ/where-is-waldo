import React,{useState} from 'react'
import './addToLeaderBoard.css'
const AddToLeaderBoard = ({time,level,submit,show}) => {
const [pressedX, setPressedX] = useState(false)
const [name, setName] = useState("")
  return (
    <div className='addtoleaderboard'>
       
        
        <div className='x' onClick={()=>setPressedX(old=>!old)}>{pressedX?">":"X"}</div>
        {!show&&
        <>
        <div style={!pressedX?{}:{display:"none"}}></div>
        <div style={{fontWeight:"bold"}}>Your Name</div>
        <input value={name} onChange={(e)=>setName(e.target.value)}type="text" placeholder='Your name...' />
        <div><span style={{fontWeight:"bold"}}>Time:</span> {time}s</div>
        <div><span style={{fontWeight:"bold"}}>Level: </span>{level}</div>
        <button onClick={()=>submit(name)}>Submit Result</button>
        </>
        }
        {show&&<div style={!pressedX?{}:{display:"none"}}>Result added to database navigate to leaderboard page to see results.</div>}
    </div>
  )
}

export default AddToLeaderBoard