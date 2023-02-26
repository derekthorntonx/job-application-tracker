import { useEffect } from 'react';
import Application from '../Application';


function ViewAll( {applications, setApplications} ) {

    const user = JSON.parse(localStorage.getItem('user'));

useEffect(() =>  {
  if (!user){return}
  async function fetchApplicationList() {
  const response = await fetch(process.env.REACT_APP_FETCH_URL + `/applications/${user.email}`, {
    method: 'GET',
    headers: {'Authorization': user.token}})
  const applicationList = await response.json();
  setApplications(applicationList)
  }
  fetchApplicationList();
}, []);

    return(
        <ul className="viewAllContainer">
            {applications.map(application => 
                 <Application key={application._id} application={application} setApplications={setApplications}/>
            )}
        </ul>
    )
}

export default ViewAll;
