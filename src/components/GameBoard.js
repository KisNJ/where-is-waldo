import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import {setDoc,doc,serverTimestamp } from "firebase/firestore"
import {db} from "../firebase-config"
import Header from "./Header"
import { nanoid } from 'nanoid'
import AddToLeaderBoard from './AddToLeaderBoard'
const GameBoard = ({levels}) => {
    const [time, setTime] = useState(0)
    const [id,setId]=useState(nanoid())
    const [sucess,setSuccess]=useState(false)
    const [showNavigate,setShowNavigate]=useState(false)
    let gameId=useParams()
    let game=levels.find(level=>level.id===gameId.id.substring(1))
    useEffect(()=>{
      async function setInitial(){
        await setDoc(doc(db,"startGs",id),{id:id,timestamp: serverTimestamp()})
      }
      setInitial()
    },[])
    function handleClick(e) {
        if(!sucess){
        const x=e.pageX
        const y=e.pageY
        setDoc(doc(db,"guesess",id),{guess_for:gameId.id.substring(1),x:parseInt(x),y:parseInt(y),time:time,id:id,timestamp: serverTimestamp()}).then((msg)=>setSuccess(true)).catch((error)=>{
            setSuccess(false)
        })
      }
    }
    useEffect(()=>{
        const interval=setInterval(()=>{
             setTime(old=>old+1)
        },1000)
        if(sucess){
          clearInterval(interval)
        }
        return ()=>{
          clearInterval(interval)
        }
    },[sucess])
    async function submit(name){
      try{
        await setDoc(doc(db,"results",id),{time:time,id:id,name:name,result_for:gameId.id.substring(1)})
        setShowNavigate(true)
      }catch{

      }
    }
  return (
        <>
        <Header timer={time}/>
        <main style={{position:"relative"}}>
        {sucess&&<AddToLeaderBoard show={showNavigate} level={gameId.id.substring(1)} time={time} submit={submit}/>}
      {levels.length>0&&
        <img
        onClick={handleClick}
        src={game.imgLink}
        alt=""
      />}
        </main>
      </>
  )
}

export default GameBoard