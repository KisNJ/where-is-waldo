import "./App.css";
import { useState,useEffect } from "react";
import ChooseLevels from "./components/ChooseLevels";
import Leaderboard from "./components/Leaderboard";
import {BrowserRouter,Route,Routes} from "react-router-dom"
import { db } from "./firebase-config";
import {getDocs,collection} from 'firebase/firestore'
import GameBoard from "./components/GameBoard";
function App() {
  const [levels,setLevels]=useState([])

  useEffect(()=>{
    const getLevels=async ()=>{
      const data=await getDocs(collection(db,'levels'))
      setLevels(data.docs.map(doc=>({...doc.data(),id:doc.id})))
    }
    getLevels()    
  },[])
  return (
    <BrowserRouter>
          <Routes>
            <Route path="/" element={<ChooseLevels levels={levels}/>}/>
            <Route path="/leaderboard" element={<Leaderboard levels={levels}/>}/>
            <Route path="/:id" element={<GameBoard levels={levels}/>}/>
          </Routes>
    </BrowserRouter>
  );
}

export default App;