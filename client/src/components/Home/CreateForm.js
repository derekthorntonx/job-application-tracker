import { useState } from "react";
import { useAuthContext } from '../../hooks/useAuthContext';


function CreateForm( {setDailyApplications} ) {
    const [titleInput, setTitleInput] = useState('');
    const [companyInput, setCompanyInput] = useState('');
    const [notesInput, setNotesInput] = useState('');
    const [linkInput, setLinkInput] = useState('');
    const [locationInput, setLocationInput] = useState('');
    const { user } = useAuthContext();

    function handleFormSubmit() {
        if (titleInput === '' || companyInput === '' || linkInput === '' || locationInput === ''){return}

        const autoDeletionTimer = (localStorage.getItem('autodelete')*2630000);
        console.log(autoDeletionTimer)

        fetch(process.env.REACT_APP_FETCH_URL + '/applications', {
            method: 'POST',
            headers: {'Content-type': 'application/json',
                      'Authorization': user.token},
            body: JSON.stringify({
                jobTitle: titleInput,
                companyName: companyInput,
                notes: notesInput,
                postingLink: linkInput,
                jobLocation: locationInput,
                dateApplied: (localStorage.getItem('todaysDate')),
                expiresAt: autoDeletionTimer,
                user: user.email
            })
        })
        localStorage.applicationsSentToday = Number(localStorage.applicationsSentToday) +1;
        setDailyApplications(localStorage.applicationsSentToday);
    }

    return (
        <form className="createForm">
            <div className="formDiv">
                <label htmlFor="jobTitle">Job Title</label>
                <input type='text' id='jobTitle' value={titleInput} onChange={(e) => setTitleInput(e.target.value)} required={true} placeholder='...'></input>
            </div>

            <div className="formDiv">
                <label htmlFor='companyName'>Company Name</label>
                <input type='text' id='companyName' required={true} value={companyInput} onChange={(e) => setCompanyInput(e.target.value)} placeholder='...'></input>
            </div>

            <div className="formDiv">
                <label htmlFor='formNotes' style={{marginLeft: '2%'}}>Notes</label>
                <textarea id='formNotes' name='formNotes' value={notesInput} onChange={(e) => {setNotesInput(e.target.value)}} placeholder="..."></textarea>
            </div>

            <div className="formDiv">
                <label htmlFor="postingLink">Posting Link</label>
                <input type='text' required={true} id='postingLink' value={linkInput} onChange={(e) => {setLinkInput(e.target.value)}} placeholder='...'></input>
            </div>

            <div className="formDiv">
                <label htmlFor="jobLocation">Location</label>
                <input type='text' required={true} id='jobLocation' value={locationInput} onChange={(e) => {setLocationInput(e.target.value)}} placeholder='...'></input>
            </div>

            <button onClick={handleFormSubmit}>Submit</button>
            
        </form>
    )
}

export default CreateForm;