import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null)
    const {dispatch} = useAuthContext();
    const navigate = useNavigate();

    const login = async (email,password) => {
        setIsLoading(true)
        setErrorMessage(null)

        const response = await fetch('http://localhost:5000/user/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email,
                password
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
            const extendLife = await fetch(process.env.REACT_APP_FETCH_URL + '/user/active', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email})
        })

            if(extendLife){
                console.log('User logged back in, deletion timer extended 3 months.')
                navigate('/');
            }
        }
    }
    
    return { login, isLoading, errorMessage }
}