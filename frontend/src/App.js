import './App.css';
import {Routes,Route} from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar.js";
import LandingPage from './components/LandingPage/LandingPage.js';

function App() {
  return (
    <div className="App">
      <Navbar/>

      <Routes>
        <Route path='/' element={<LandingPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
