import { useState, useCallback, useEffect,useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [passwaord, setPasswaord] = useState("");
// Use Ref Hooks
const passwaordRef = useRef(null);
  const passwaordGenerater = useCallback(
    function () {
      let pass = "";
      let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      if (number) str += "0123456789";
      if (character) str += "!@#$%^&*(){}[]";

      for (let i = 0; i < length; i++) {
        let char = Math.floor(Math.random() * str.length + 1);
        pass += str.charAt(char);
      }
      setPasswaord(pass);
    },
    [length, number, character, setPasswaord]
  );

  const copyPassword = () => {
    passwaordRef.current?.select();
    // this line is use for select the spacific range of text
    //  passwaordRef.current?.setSelectionRange(0,5 )
    window.navigator.clipboard.writeText(passwaord)
  };

useEffect(() => { 
  passwaordGenerater();
}, [length, number, character, passwaordGenerater]);


  return (
    <>
      <div className="w-full max-w-2xl mx-auto rounded-lg px-4 py-2 text-white bg-slate-800  bg-opacity-60">
        <h1 className="text-blue-400 text-center font-bold my-2 text-3xl">
          Password Generater
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-15s mx-6 ">
          <input
            type="text"
            value={passwaord}
            className="text-black outline-none w-full py-2 px-3  "
            placeholder="password"
            readOnly
            ref={passwaordRef}
          />
          <button
            onClick={copyPassword}
            className="px-2 py-2 text-white font-bold rounded-r-lg "
            style={{ backgroundColor: "#2b6cb0" }}
          >
            Copy{" "}
          </button>
        </div>


        <div className="flex text-sm gap-x-2 mx-5">
          <div className="flex items-center gap-x-1 mt-3 ">
            <input 
            type="range"
            min={8}
            max={100} 
            value={length} 
            className="pointer"
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label>length:{length}</label>
          </div>


          <div className="flex items-center gap-x-2">
            <input
            className="ml-10 mt-3"
            type="checkbox"
            defaultChecked={number}
            id="InputNumber"
            onChange= {(e) => {
              setNumber((prev)=>!prev);
            }}
            />
            <label className="mt-3">InputNumber</label>
            

            <input
            className="ml-10 mt-3"
            type="checkbox"
            defaultChecked={character}
            id="InputCharacter"
            onChange= {(e) => {
              setCharacter((prev)=>!prev);
            }}
            />
            <label className="mt-3">InputCharacter</label>

          </div>
        </div>
      </div>
    </>
  );
}

export default App;
