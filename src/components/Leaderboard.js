import React,{useState,useEffect} from "react";
import {getDocs,collection,query,where,orderBy,limit} from "firebase/firestore"
import Header from "./Header";
import {db} from "../firebase-config"
import "./leaderBoard.css"
const Leaderboard = ({levels}) => {
  const [tempL,setTempL]=useState(undefined)
  const[queriedValue,setQueriedValue]=useState([])
  const [selecetedLevel, setSelecetedLevel] = useState(levels?"1":levels[0].id)
  useEffect(()=>{
    const getLevels=async ()=>{
      const data=await getDocs(collection(db,'levels'))
      setTempL(data.docs.map(doc=>({...doc.data(),id:doc.id})))
    }
    if(!levels){
      getLevels()    
    }
  },[])
  useEffect(()=>{
    async function handleClick(){
      let q= query(collection(db,'results'),where("result_for","==",selecetedLevel),orderBy("time"),limit(20))
      const  data=await getDocs(q)
      setQueriedValue(data.docs.map(x=>({...x.data()})))
    }
    handleClick()
    console.log("change")
  },[selecetedLevel])


  return (
    <>
      <Header />
      <div className="main">
        <div className="choose">
        {levels?levels.map(level=><div className={level.id===selecetedLevel?"currentDiv":""} onClick={()=>setSelecetedLevel(level.id)}>{level.id}</div>):tempL.map(level=><div className="level-selector" onClick={()=>setSelecetedLevel(level.id)}>{level.id}</div>)}
        </div>
        {/* {JSONs.stringify(levels)} */}
        {queriedValue.length!==0&&<div className="Top"><div>Name:</div><div>Time: (s)</div></div>}
        {queriedValue.map((q,index)=><div className={index===queriedValue.length-1?"last":"line"}><div>{q.name}</div><div>{q.time}</div></div>)}
        {queriedValue.length===0?<div className="mark">No one has submitted a result for this level!</div>:""}
        </div>
    </>
  );
};

export default Leaderboard;
