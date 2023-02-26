import { useLogout } from '../../hooks/useLogout';
import { useDelete } from '../../hooks/useDelete.js';
import { useAuthContext } from '../../hooks/useAuthContext';


function Database() {
    const { logout } = useLogout();
    const { deleteUser, deleteUserDocuments } = useDelete();
    const { user } = useAuthContext();
  
    
    function handleLogout() {
        logout();
    }

    function handleDeleteAccount() {
        deleteUserDocuments();
        deleteUser();
    }


    return(
        <div className='accountMenuPage'>
        
        {user ? <div className='accountButtons'>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={handleDeleteAccount} className='deleteButton'>Delete Account
                <span className='tooltip'>This will delete your account and all associated documents.</span>
                </button>
            </div>
            : <h2>No account logged in.</h2>}

        </div>
    )
}

export default Database;