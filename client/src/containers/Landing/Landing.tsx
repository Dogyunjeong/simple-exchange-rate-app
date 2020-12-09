import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Grid, TextField } from '../../components/MaterialUI'
import { publicRequest } from '../../utils/request'

export interface LandingProps { }

const Landing: React.FC<LandingProps> = () => {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  useEffect(() => {
    let err
    if (!email) {
      err = 'Email must be provided'
      setError(err)
      return
    }
    if (!(/(.+)@(.+){2,}\.(.+){2,}/.test(email))) {
      err = 'Email format is wrong'
      setError(err)
      return
    }
    setError('')
  }, [email])
  const handleLogin = async () => {
    if (error) {
      alert(error)
      return
    }
    try {
      await publicRequest.post('/auth/login', { email })
      history.push('/exchange-rates')
    } catch (err) {
      alert('Failed to Login')
    }
  }
  return (
    <div>
      <h1>
        Simple exchange rate app
      </h1>
      <Grid container direction="column" alignContent="flex-start">
        <p>Please login with email</p>
        <TextField
          label="Email"
          error={!!email && !!error}
          placeholder="Type email to login"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required={true}
          helperText={!!error ? error : null}
        />
        <br />
        <Button
          onClick={handleLogin}
          variant="contained"
          color="primary"
          disabled={!!error}
        >Login</Button>
      </Grid>
    </div>
  )
}

export default Landing