import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faStar, faCircleArrowDown, faCircleArrowUp } from '@fortawesome/free-solid-svg-icons'

function FavApplication( {application, setApplications} ) {
    const [isExpanded, setIsExpanded] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));

    async function handleFavouriting(application) {
        await fetch(process.env.REACT_APP_FETCH_URL + `/applications/${application._id}`, {
            method: 'POST',
            headers: {'Authorization': user.token}
        });
        fetchUpdatedFavList();
    }

    function handleDelete(application) {
        fetch(process.env.REACT_APP_FETCH_URL + `/applications/${application._id}`, {
            method: 'DELETE',
            headers: {'Authorization': user.token}
        })
        fetchUpdatedFavList();
    }

    async function fetchUpdatedFavList() {
        const response = await fetch(process.env.REACT_APP_FETCH_URL + `/applications/favourites/${user.email}`, {method: 'GET',
        headers: {'Authorization': user.token}})
        const results = await response.json();
        setApplications(results);
    }

    function handleExpanding() {
        setIsExpanded(!isExpanded);
    }


    return (
        <>
        {!isExpanded ?
        <li className="viewAllApplications">
        <div>{application.jobTitle}</div>
        <div>{application.companyName}</div>
                <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                    {(application.dateApplied).split('T')[0]}
                    <span className={(application.isfavourited ? 'favourited' : '')}><FontAwesomeIcon icon={faStar}  onClick={() => {handleFavouriting(application)}}/></span>
                    <span><FontAwesomeIcon icon={faCircleArrowDown} onClick={handleExpanding}/></span>
                    <span><FontAwesomeIcon icon={faTrash} onClick={() => {handleDelete(application)}}/></span>
                </div>
        </li>
        : <li className='expandedViewAllApplication'>
            <div>{application.jobTitle}</div>
            <div>{application.companyName}</div>
                <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                    {(application.dateApplied).split('T')[0]}
                    <span className={(application.isfavourited ? 'favourited' : '')}><FontAwesomeIcon icon={faStar}  onClick={() => {handleFavouriting(application)}}/></span>
                    <span><FontAwesomeIcon icon={faCircleArrowUp} onClick={handleExpanding}/></span>
                    <span><FontAwesomeIcon icon={faTrash} onClick={() => {handleDelete(application)}}/></span>
                </div>
            <div style={{gridColumn: '1 / span 3', marginBottom: '1rem', paddingRight: '1rem'}}>{application.notes}</div>
            <div style={{gridColumn: '1', marginBottom: '1rem'}}><a href={`${application.postingLink}`}>{application.postingLink}</a></div>
            <div style={{gridColumn: '3', marginBottom: '1rem'}}>{application.jobLocation}</div>
        </li>
        }
        </>
        )
}

export default FavApplication;