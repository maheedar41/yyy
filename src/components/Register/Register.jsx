import React, { useState } from 'react'
import './register.css'
import { FIELDS } from './constants'

export default function Register({ onRegistered }){
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function onChange(e){
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function submit(e){
    e.preventDefault()
    setError('')
    setLoading(true)
    try{
      const res = await fetch('http://localhost:4000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      setLoading(false)
      if(!res.ok){ setError(data.error || 'Registration failed'); return }
      if(onRegistered) onRegistered(data.user)
    }catch(err){
      console.error(err)
      setLoading(false)
      setError('Network error')
    }
  }

  return (
    <form className="reg-form" onSubmit={submit}>
      <h2>Create account</h2>
      <label>Name</label>
      <input name={FIELDS.name} value={form.name} onChange={onChange} placeholder="Full name" />

      <label>Email</label>
      <input name={FIELDS.email} value={form.email} onChange={onChange} placeholder="you@company.com" />

      <label>Password</label>
      <input name={FIELDS.password} type="password" value={form.password} onChange={onChange} placeholder="password" />

      {error && <div className="reg-error">{error}</div>}

      <div className="reg-actions">
        <button type="submit" className="btn primary" disabled={loading}>{loading? 'Creating...':'Create account'}</button>
      </div>
    </form>
  )
}
