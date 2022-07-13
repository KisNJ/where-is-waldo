import React from "react";
import Header from "./Header";
import LevelsCard from "./LevelsCard";
import './chooseLevels.css'
const ChooseLevels = ({ levels }) => {
  return (
    <>
      <Header />
      <main>
        <div id="levels">
          {levels.map((level) => (
            <LevelsCard level={level} />
          ))}
        </div>
      </main>
    </>
  );
};

export default ChooseLevels;
