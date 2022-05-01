import Home from "../pages/home/Home";
import SignUp from "./RegoPage/SignUp";
import Login from "./RegoPage/Login";
import {BrowserRouter as Router, Switch} from "react-router-dom";
import {auth} from "../Firebase/firebase";



function App() {
  return (
    <div className="App">
        <Home />
        <SignUp />
        <Login /> 
    </div>
  );
}

export default App;
