import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Header from './components/Header';

const App = () => {
  return (
    <Routes>
      <Route path='/upload' element={<Upload/>}/>
      <Route path='/' element={<Home/>}/>
      <Route/>
    </Routes>
  );
}

export default App;
