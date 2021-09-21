import logo from "./logo.svg";
import "./App.css";
import {
  BurgerSimple,
  Add,
  DivideStraight,
  Cloud,
  AddCircle,
  CameraFlip,
  Exit,
} from "@ikono/react";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <BurgerSimple />
        <Add />
        <Exit />
      </header>
    </div>
  );
}

export default App;
