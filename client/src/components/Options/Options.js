import Customization from "./Customization";
import Database from './Database';
import { useState } from 'react';

function Options() {

    const [showCustomize, setShowCustomize] = useState(true);
    const [showDatabase, setShowDatabase] = useState(false);

    function handleCustomize () {
        setShowCustomize(true);
        setShowDatabase(false);
    }

    function handleDatabase () {
        setShowCustomize(false);
        setShowDatabase(true);
    }

    return(
        <div className="main-container">
        <div className='navbar'>

            <input type='radio' name="optionsOption" id='customizeBtn' value='customizeBtn' defaultChecked/>
            <label onClick={handleCustomize} htmlFor='customizeBtn'>Settings</label>

            <input type='radio' name="optionsOption" id='databaseBtn' value='databaseBtn'/>
            <label onClick={handleDatabase} htmlFor='databaseBtn'>Account</label>  

        </div>
        <div className="mainDisplay">
            {showCustomize ? <Customization/> : null}
            {showDatabase ? <Database/> : null}
        </div>
        </div>
    )
}

export default Options;