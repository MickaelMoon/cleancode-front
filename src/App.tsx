import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Quizz from "./pages/Quizz/Quizz";



function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/quizz" element={<Quizz/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Router>

  );
}

export default App;
