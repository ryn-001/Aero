import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar.js";
import LandingPage from './components/LandingPage/LandingPage.js';
import Register from './components/Register/Register.js';
import Login from './components/Login/Login.js';
import Squares from './components/Animated Components/squareGrid.js';
import Trip from './components/Trip/Trip.js';

function App() {
  return (
    <div className="App">
      <Navbar />

      <Squares
        speed={0.5}
        squareSize={40}
        direction='diagonal'
        borderColor='#dddd'
        hoverFillColor='#ffff'
      />

      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/trip' element={<Trip />} />
      </Routes>
    </div>
  );
}

export default App;
