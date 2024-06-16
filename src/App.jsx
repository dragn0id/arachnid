/* eslint-disable no-undef */
// import { useState } from 'react'
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
// import { useEffect } from "react";

function App() {
  // const [count, setCount] = useState(0)
  const changeColor = async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: () => {
        let body = document.querySelector("body");
        body.style.backgroundColor = "blue";
      },
    });
  };

  //make a useeffect to run the chnagecolor function on load
  // useEffect(() => {
  //   changeColor();
  // }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Arachnid</h1>
      <div className="card">
        <button onClick={changeColor}>
          {/* count is {count} */}
          Color
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
