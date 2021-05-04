import React ,{ useState } from 'react';
import { RegisterForm } from '../components/register_form/register_form.component';

const RegisterPage = () => {

  const [{username, email, password, confirmPassword}, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword:''
  })
  const [error, setError] = useState('');

  const submitData = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    if (password == confirmPassword) {
      try {
        const body = { username, email, password }
        const res = await fetch('/api/user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        //await Router.push('/')
      } catch (error) {
        console.error(error)
      }
    } else {
      setError('make sure both passwords match.')
    }
  }

  return (
    <RegisterForm onSubmit={submitData}>
      <label htmlFor='username'> username</label>
      <input value={username} name='username' type='text' onChange={(event) => setRegisterData({
        username: event.target.value,
        email,
        password,
        confirmPassword,
      })} />
      <label htmlFor='email'> email</label>
      <input value={email} name='email' type='email' onChange={(event) => setRegisterData({
        username,
        email: event.target.value,
        password,
        confirmPassword,
      })} />
      <label htmlFor='password'> password</label>
      <input value={password} name='password' type='password' onChange={(event) => setRegisterData({
        username,
        email,
        password: event.target.value,
        confirmPassword,
      })} />
      <label htmlFor='confirmPassword'> confirmPassword</label>
      <input value={confirmPassword} name='confirmPassword' type='password' onChange={(event) => setRegisterData({
        username,
        email,
        password,
        confirmPassword: event.target.value,
      })} />
    <button type='submit'> Register </button>
    {error.length > 0 && <p> {error}</p>}
    </RegisterForm>
  )
}

export default RegisterPage;
