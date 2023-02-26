import { useState, useEffect } from 'react';

function Customization() {
    const  [ rangeInput, setRangeInput ] = useState(5);
    const [ autoDelete, setAutoDelete ] = useState(6);

    function handleGoalChange(e) {
        setRangeInput(e.target.value);
    }

    function handleDeletionChange(e) {
        setAutoDelete(e.target.value);
    }

    


    function handleSave() {
        localStorage.removeItem('dailyGoal');
        localStorage.setItem('dailyGoal', rangeInput);
        localStorage.removeItem('autodelete');
        localStorage.setItem('autodelete', autoDelete);
    }

    useEffect(() => {
        setRangeInput(localStorage.getItem('dailyGoal'));
        setAutoDelete(localStorage.getItem('autodelete'))
    }, [])

    return(
        <form className='optionsMenuPage'>
        <label htmlFor='dailyGoal'>Daily goal of sent {rangeInput} per day </label>
        <input className='rangeSlider' onChange={handleGoalChange} type='range' id='dailyGoal' name='dailyGoal' defaultValue={localStorage.getItem('dailyGoal')} min='1' max='10'/>
        <label htmlFor='autodeleteTime'>Auto-delete applications in: {autoDelete} months</label>
        <input className='rangeSlider' onChange={handleDeletionChange} type='range' id='autodeleteTime' name='autodeleteTime' defaultValue={autoDelete} min='2' max='6'/>
        <button style={{alignSelf: 'flex-end'}} onClick={handleSave}>Save</button>
        </form>
    )
}

export default Customization;