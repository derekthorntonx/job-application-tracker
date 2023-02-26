import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import FavApplication from '../FavApplication';


function Main( { applications, setApplications } ) {
  
    const user = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        if (!user){return}
        async function fetchData(){
            const response =  await fetch(process.env.REACT_APP_FETCH_URL + `/applications/favourites/${user.email}`, {
                method: 'GET',
                headers: {'Authorization': user.token}
                })
            const favList = await response.json();
            setApplications(favList)
            }
            fetchData();
    },[])

    return (
        <div className="favouritesDisplay">
            <div style={{fontSize: '1.5rem', marginBottom: '1%'}}>Favourites <span style={{color: 'darkorange'}}><FontAwesomeIcon icon={faStar}/></span></div>
            {applications.map(application => 
                <FavApplication key={application._id} application={application} setApplications={setApplications}/>
            )}
        </div>
    )
}

export default Main;