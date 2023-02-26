import { useNavigate } from 'react-router-dom';
import { useAuthContext } from './useAuthContext';

export const useDelete = () => {
    const { user, dispatch } = useAuthContext();
    const navigate = useNavigate();

    const deleteUser = async () => {
        const response = await fetch(process.env.REACT_APP_FETCH_URL + '/user/delete', { 
            method: 'DELETE',
            headers: {'Content-Type': 'application/json',
                      'Authorization': user.token},
            body: JSON.stringify({
                email: user.email
            })
        })
        const result = await response.json();

        if (result) {
            console.log('Account deleted')
            localStorage.removeItem('user');
            dispatch({type: 'LOGOUT'})
            navigate('/')
        }
    }

    const deleteUserDocuments = async () => {
        const response = await fetch(process.env.REACT_APP_FETCH_URL + '/applications', {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json',
                      'Authorization': user.token},
            body: JSON.stringify({
                email: user.email
            })
        })
       const result = await response.json();

        if (result) {
            console.log('Documents deleted')
        }
    }
    
    return { deleteUser, deleteUserDocuments }
}