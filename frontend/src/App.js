import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from "./components/About";
import Notestate from './context/notes/Notestate';
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <div>
      <Notestate>
        <Router>
          <Navbar />
          <div>
            <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route exact path="/About" element={<About/>} />
              <Route exact path="/login" element={<Login/>} />
              <Route exact path="/signup" element={<Signup/>} />
            </Routes>
          </div>
        </Router>
      </Notestate>
    </div>
  );
}

export default App;
