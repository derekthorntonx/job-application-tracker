import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import Home from './components/Home/Home';
import Search from './components/Search';
import Options from './components/Options/Options';
import SignUp from './components/SignUp';
import Login from './components/Login';


function App() {
  const [applications, setApplications] = useState([]);
  const [dailyApplications, setDailyApplications] = useState(localStorage.getItem('applicationsSentToday'));

  return (
  <HashRouter>
  
    <div className='container'>
      <Header dailyApplications={dailyApplications} setDailyApplications={setDailyApplications}/>
      <Routes>
        <Route path='/' exact element={<Home applications={applications} setApplications={setApplications} setDailyApplications={setDailyApplications} dailyApplications={dailyApplications}/>}></Route>
        <Route path='/search' element={<Search/>}></Route>
        <Route path='/options' element={<Options/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
      </Routes>
    </div>
  </HashRouter>
  );
}

export default App;
