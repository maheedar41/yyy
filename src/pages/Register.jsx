import React from 'react'
import Register from '../components/Register/Register'

export default function RegisterPage(){
  function onRegistered(user){
    // Optionally redirect to login or auto-login
    alert('Registered ' + (user?.email || ''))
    window.location.href = '/login'
  }

  return (
    <div className="login-root">
      <div className="login-left">
        <a className="login-logo">logjn</a>
        <Register onRegistered={onRegistered} />
      </div>
      <div className="login-right" aria-hidden>
        {/* reuse illustration from login page */}
        <svg width="520" height="420" viewBox="0 0 520 420" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="g2" x1="0" x2="1">
              <stop offset="0" stopColor="#eef5ff" />
              <stop offset="1" stopColor="#f7faff" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="520" height="420" rx="8" fill="url(#g2)" />
        </svg>
      </div>
    </div>
  )
}
