import { useState } from "react";
import Main from "./Main.js";
import CreateForm from "./CreateForm.js";
import ViewAll from "./ViewAll.js";

function Home({ applications, setApplications, setDailyApplications, dailyApplications}) {

    const [showMain, setShowMain] = useState(true);
    const [showCreate, setShowCreate] = useState(false);
    const [showView, setShowView] = useState(false);

    function handleMain () {
        setShowMain(true);
        setShowCreate(false);
        setShowView(false);
    }

    function handleCreate () {
        setShowMain(false);
        setShowCreate(true);
        setShowView(false);
    }

    function handleView () {
        setShowMain(false);
        setShowCreate(false);
        setShowView(true);
    }

    return(
    <div className="main-container">
        <div className='navbar'>
            <input type='radio' name="mainOption" id='mainBtn' value='mainBtn' defaultChecked/>
            <label onClick={handleMain} htmlFor='mainBtn'>Main</label>

            <input type='radio' name="mainOption" id='createBtn' value='createBtn'/>
            <label onClick={handleCreate} htmlFor='createBtn'>Create New</label>  

            <input type='radio' name="mainOption" id='viewBtn' value='viewBtn'/>
            <label onClick={handleView} htmlFor='viewBtn'>View All</label>
        </div>
        <div className="mainDisplay">
            {showMain ? <Main applications={applications} setApplications={setApplications}/> : null}
            {showCreate ? <CreateForm setDailyApplications={setDailyApplications} dailyApplications={dailyApplications}/> : null}
            {showView ? <ViewAll applications={applications} setApplications={setApplications}/> : null}
        </div>
    </div>
    )
    
}

export default Home;