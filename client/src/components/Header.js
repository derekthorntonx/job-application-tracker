import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink, Link } from 'react-router-dom';
import { faHouse, faMagnifyingGlass, faGear } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

function Header( {dailyApplications, setDailyApplications} ) {
    const [todaysDate, setTodaysDate] = useState('');
    const [dailyGoal] = useState(localStorage.getItem('dailyGoal'));
    const { user } = useAuthContext();

    useEffect(() => {
        let temp = new Date()
        console.log(temp.toLocaleDateString())
        setTodaysDate(temp.toLocaleDateString());
        if (localStorage.getItem('todaysDate') !== temp.toLocaleDateString()){
            console.log('dates didnt match');
            localStorage.removeItem('todaysDate');
            localStorage.setItem('todaysDate', temp.toLocaleDateString());
            localStorage.removeItem('applicationsSentToday');
            localStorage.setItem('applicationsSentToday', 0);
            setDailyApplications(localStorage.getItem('applicationsSentToday'));
        } else {
            setDailyApplications(localStorage.getItem('applicationsSentToday'))
        }

        if (!localStorage.getItem('dailyGoal')){
            localStorage.setItem('dailyGoal', 5);
        }

    }, [setDailyApplications]);


    return (
        <div className="header">
            <ul>
                <li>
                <NavLink
                 to='/'
                 style={({ isActive }) => ({color: isActive ? ' #F0D1E2' : '#efefef'})}
                 ><FontAwesomeIcon icon={faHouse} className='fa-solid fa-3x' /></NavLink>
                 </li>

                <li>
                <NavLink
                 to='/search'
                 style={({ isActive }) => ({color: isActive ? ' #F0D1E2' : '#efefef'})}
                ><FontAwesomeIcon icon={faMagnifyingGlass} className='fa-solid fa-3x'/></NavLink>
                </li>

                <li>
                <NavLink
                 to='/options'
                 style={({ isActive }) => ({color: isActive ? ' #F0D1E2' : '#efefef'})}
                ><FontAwesomeIcon icon={faGear} className='fa-solid fa-3x'/></NavLink>
                </li>
                
            </ul>
            <div className="header-main-display">
                {user ? <div className='welcomeBackBanner'>
                    <div>Welcome back,</div><div style={{fontSize: 'clamp(1rem, 2vw, 1.5rem)'}}>{user.email}</div> </div>:
                 <div className='headerLoginSignup'><Link to='/login'>Login</Link><Link to='/signup'>Signup</Link>
                </div>}
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px'}}>
                    <h2>{todaysDate}</h2>
                    <h4>{dailyApplications}/{dailyGoal} applications sent</h4>
                </div>
                
            </div>
        </div>
    )
}

export default Header;