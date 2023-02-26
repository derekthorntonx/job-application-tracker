import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useNavigate } from 'react-router-dom';

export const useSignup = () => {
    const [isLoading, setIsLoading] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null)
    const {dispatch} = useAuthContext();
    const navigate = useNavigate();

    const signup = async (email,password) => {
        setIsLoading(true)
        setErrorMessage(null)

        const response = await fetch(process.env.REACT_APP_FETCH_URL + '/user/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email,
                password,
            })
        })
        const result = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setErrorMessage(result.error);
        }

        if (response.ok) {
            setIsLoading(false);
            localStorage.setItem('user', JSON.stringify(result));
            dispatch({type: 'LOGIN', payload: result})
            navigate('/')
        }
    }
    
    return { signup, isLoading, errorMessage }
}