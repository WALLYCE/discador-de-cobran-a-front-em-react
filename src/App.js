
//import Cliente from "./components/Cliente/Cliente";
import Login from "./components/Login/Login";
import Cliente from "./components/Cliente/Cliente";
import {BrowserRouter as Router, Routes,Route, Link} from 'react-router-dom'

function App() {
  return (
    <div className="App align-middle" >
      <Router>
      <Routes>
        <Route path='/' exact element={<Login/>}></Route>
        <Route path='/cliente'  element={<Cliente/>}></Route>
      </Routes>
      </Router>
    </div>
  );
}

export default App;
