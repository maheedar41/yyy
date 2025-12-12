import React from 'react'
import { Link } from 'react-router-dom'

const shortcuts = [
  { title: 'Home', icon: 'home', to: '/' },
  
  { title: 'Accreditation', icon: 'verified', to: '/accreditation/tracer-audit-comparison-dashboard' },
  { title: 'Compliance manager', icon: 'assignment_ind', to: '/compliance-manager/overview' },
  { title: 'Committee management', icon: 'groups', to: '/committee-management/committees' },
  { title: 'More', icon: 'add', to: '/more' }
]

export default function Home(){
  return (
    <div className="home-root">
      <div className="home-center">
        <div className="home-search">
          <input className="search-menu" placeholder="Search Medrank..." />
          <button className="search-button" aria-label="Search"><span className="material-symbols-outlined">search</span></button>
        </div>

        <div className="shortcuts">
          {shortcuts.map((s, i)=> (
            <Link key={i} to={s.to} className="shortcut" title={s.title}>
              <div className="shortcut-icon"><span className="material-symbols-outlined">{s.icon}</span></div>
              <div className="shortcut-title">{s.title}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

