import { useState } from "react";
import "./App.css";
import List from "./components/List";
import ProgressBar from "./components/ProgressBar";

function App() {
  const [count, setCount] = useState(0);
  const [state, setState] = useState(false);

  const [currentDate, setDate] = useState(new Date());

  const [name, setName] = useState("Max");

  const [menuItem, setMenuItem] = useState(1);

  return (
    <>
      <button onClick={() => setMenuItem(1)}>Click counter</button>
      <button onClick={() => setMenuItem(2)}>State changer</button>
      <button onClick={() => setMenuItem(3)}>Date changer</button>
      <button onClick={() => setMenuItem(4)}>Name changer</button>
      <button onClick={() => setMenuItem(5)}>List</button>
      <button onClick={() => setMenuItem(6)}>Progress bar</button>
      {menuItem == 1 && (
        <>
          <h1>Count: {count}</h1>
          <button
            onClick={() =>
              setCount((prev) => {
                return prev + 1;
              })
            }
          >
            Click
          </button>
        </>
      )}
      {menuItem == 2 && (
        <>
          <h1>State: {state ? "true" : "false"}</h1>
          <button onClick={() => setState(!state)}>Click</button>
        </>
      )}
      {menuItem == 3 && (
        <>
          <h1>
            Date: {currentDate.toLocaleDateString()} -{" "}
            {currentDate.toLocaleTimeString()}
          </h1>

          <button
            onClick={() =>
              setDate((prev) => {
                return new Date(prev.setDate(prev.getDate() + 1));
              })
            }
          >
            Click
          </button>
        </>
      )}
      {menuItem == 4 && (
        <>
          <h1>Name: {name}</h1>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Enter a name"
          />
        </>
      )}

      {menuItem == 5 && <List />}

      {menuItem == 6 && <ProgressBar />}
    </>
  );
}

export default App;
