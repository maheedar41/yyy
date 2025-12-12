import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function submit(e){
    e.preventDefault()
    setError('')
    try{
      const res = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if(!res.ok){ setError(data.error || 'Login failed'); return }
      if(data.token) localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user || {}))
      navigate('/')
    }catch(err){
      console.error(err)
      setError('Network error')
    }
  }

  return (
    <div className="login-root">
      <div className="login-left">
        <a className="login-logo">login</a>

        <form className="login-form" onSubmit={submit}>
          <label className="lbl">Username</label>
          <div className="input-with-icon">
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="nagendra" />
          </div>

          <label className="lbl">Password/OTP</label>
          <div className="input-with-icon">
            <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="********" />
          </div>

          {error && <div className="form-error">{error}</div>}

          <div className="form-actions">
            <button type="submit" className="btn primary">Login Again</button>
            <button type="button" className="btn outline">Send OTP</button>
          </div>
        </form>
      </div>

      <div className="login-right" aria-hidden>
        {/* decorative illustration - simple svg */}
        <svg width="520" height="420" viewBox="0 0 520 420" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="g" x1="0" x2="1">
              <stop offset="0" stopColor="#eef5ff" />
              <stop offset="1" stopColor="#f7faff" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="520" height="420" rx="8" fill="url(#g)" />
          <g transform="translate(40,40)">
            <rect x="0" y="40" width="320" height="200" rx="8" fill="#fff" opacity="0.9" />
            <rect x="20" y="60" width="80" height="12" rx="6" fill="#cfe3ff" />
            <rect x="20" y="82" width="200" height="12" rx="6" fill="#dfeeff" />
            <circle cx="260" cy="140" r="40" fill="#d9ecff" />
          </g>
        </svg>
      </div>
    </div>
  )
}
