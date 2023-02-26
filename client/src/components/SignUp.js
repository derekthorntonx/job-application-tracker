import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup, errorMessage, isLoading } = useSignup();

    async function handleFormSubmit(e) { 
        e.preventDefault();
        await signup(email, password)
    }

    return(
        <form className='loginSignup' onSubmit={handleFormSubmit}>
            <h2 style={{marginBottom: '3%'}}>Sign up</h2>
            <label htmlFor='userEmail'>Email: </label>
            <input type='text' id='userEmail' name='userEmail' onChange={(e) => setEmail(e.target.value)} value={email}/>

            <label htmlFor='userPassword'>Password: </label>
            <input type='text' id='userPassword' name='userPassword' onChange={(e) => setPassword(e.target.value)} value={password}/>

            <button style={{marginBottom:'3%'}} disabled={isLoading}>Submit</button>

            {errorMessage ? <div style={{marginTop: '1%', marginBottom:'5%'}}>{errorMessage}</div> : null}

            <p>Note: Passwords are not encrypted and have no strength requirements; do not use important passwords.
                This website is meant primarily for personal-use and demonstration; emails will not receive verification links.
                Accounts that have not logged in after 3 months are automatically deleted.
                Once deleted, information is not recoverable and the process is irreversible.
            </p>
        </form>
    )

}

export default SignUp;