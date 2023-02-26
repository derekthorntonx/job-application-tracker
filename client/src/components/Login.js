import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, errorMessage, isLoading } = useLogin();

    async function handleFormSubmit(e) { 
        e.preventDefault();
        await login(email, password)
    }

    return(
        <form className='loginSignup' onSubmit={handleFormSubmit}>
            <h2 style={{marginBottom: '3%'}}>Log in</h2>
            <label htmlFor='userEmail'>Email: </label>
            <input type='text' id='userEmail' name='userEmail' onChange={(e) => setEmail(e.target.value)} value={email}/>

            <label htmlFor='userPassword'>Password: </label>
            <input type='text' id='userPassword' name='userPassword' onChange={(e) => setPassword(e.target.value)} value={password}/>

            <button style={{marginBottom:'3%'}} disabled={isLoading}>Submit</button>

            {errorMessage ? <div>{errorMessage}</div> : null}
        </form>
    )

}

export default Login;