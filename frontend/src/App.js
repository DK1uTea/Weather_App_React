import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import {Route, Routes, BrowserRouter as Router} from 'react-router-dom'
import Weather from './components/Weather';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <div className='app-container'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/weather' element={<Weather />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
