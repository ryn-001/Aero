import './App.css';
import {Routes,Route} from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar.js";
import LandingPage from './components/LandingPage/LandingPage.js';
import Register from './components/Register/Register.js';
import Login from './components/Login/Login.js';

function App() {
  return (
    <div className="App">
      <Navbar/>

      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
