import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [name, setName] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  const handleClick = () => {
    fetch("/name")
      .then((res) => res.json())
      .then((data) => setName(data.message));
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>{!data ? "Loading..." : data}</p>
        <p>{!name ? "Loading name..." : name}</p>
        <button onClick={handleClick}>Generate a name</button>
      </header>
    </div>
  );
}

export default App;