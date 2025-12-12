import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const menus = [
  {
    key: 'accreditation',
    title: 'Accreditation',
    icon: 'verified',
    section: 'Accreditation & Compliance',
    submenu: [
      { title: 'Tracer Audit Comparison Dashboard', icon: 'dashboard' },
      { title: 'Assessment Dashboard', icon: 'dashboard' },
      { title: 'Accreditation List', icon: 'list' },
      { title: 'Accreditation Wizard', icon: 'school' }
    ]
  },
  {
    key: 'facility-management',
    title: 'Facility Management',
    icon: 'apartment',
    section: null,
    submenu: [
      { title: 'List Facilities', icon: 'list' },
      { title: 'Add Facility', icon: 'add' }
    ]
  }
]

export default function Sidebar(){
  // `open` stores the current open/closed state for each menu key.
  // `manual` marks keys that the user has explicitly toggled so we respect their choice
  const location = useLocation()
  const [open, setOpen] = useState(() => {
    // initialize empty open state and open any section matching the current path
    const init = {}
    menus.forEach(m => {
      if (location.pathname.startsWith('/' + m.key)) init[m.key] = true
    })
    return init
  })
  const [manual, setManual] = useState({})

  function toggle(key){
    setOpen(o => ({ ...o, [key]: !o[key] }))
    setManual(m => ({ ...m, [key]: true }))
  }

  return (
    <aside className="mat-sidenav sidenav" role="navigation" aria-hidden={false}>
      <div className="mat-drawer-inner-container">
        <section id="sidebar" className="sidebar">
          <div className="sidebar-content">
            <div className="sidebar-header">
              <Link to="/" className="logo" aria-label="Medrank">
                <div className="logo-text">Medrank</div>
              </Link>
            </div>

            <div className="sidebar-profile">
              <div className="user-pic">N</div>
              <div className="user-info">
                <span className="user-name">Hello! Sai</span>
                <span className="user-status"><span className="status-dot"/>Online</span>
              </div>
            </div>

            {/* sidebar search removed */}

            <nav className="sidebar-menu">
              <ul>
                <li>
                  <Link to="/" className="menu-home" style={{display:'flex',alignItems:'center'}}>
                    <span className="menu-icon-box"><span className="material-symbols-outlined">home</span></span>
                    <span>Home</span>
                  </Link>
                </li>

                {menus.reduce((acc, m)=>{
                  if(m.section){ acc.push({ header: m.section }) }
                  acc.push(m)
                  return acc
                },[]).map((item, idx)=>{
                  if(item.header) return <li key={`h-${idx}`} className="header-menu">{item.header}</li>

                  // Compute whether the menu should be open.
                  // If the user manually toggled this menu, respect their choice (manual overrides).
                  const routeMatches = location.pathname.startsWith('/' + item.key)
                  const isManual = !!manual[item.key]
                  const isOpen = isManual ? !!open[item.key] : (!!open[item.key] || routeMatches)
                  const submenuId = `submenu-${item.key}`
                  return (
                    <li key={item.key} className={`sidebar-dropdown ${isOpen? 'active':''}`}>
                      <div
                        className="menu-header"
                        onClick={()=>toggle(item.key)}
                        onKeyDown={(e)=>{ if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') { e.preventDefault(); toggle(item.key) } }}
                        role="button"
                        tabIndex={0}
                        aria-expanded={isOpen}
                        aria-controls={submenuId}
                      >
                        <div style={{display:'flex',alignItems:'center'}}>
                          <div className="menu-icon-box"><span className="material-symbols-outlined">{item.icon}</span></div>
                          <div className="menu-title">{item.title}</div>
                        </div>
                        <div className={`chev ${isOpen? 'open':''}`}><span className="material-symbols-outlined">expand_more</span></div>
                      </div>

                      <div
                        id={submenuId}
                        className={`sidebar-submenu ${isOpen? 'open':''}`}
                        role="region"
                        aria-hidden={!isOpen}
                      >
                        <ul className="submenu">
                          {item.submenu.map((s, i)=>{
                            const path = `/${item.key}/${s.title.toLowerCase().replace(/\s+/g,'-')}`
                            const active = location.pathname === path
                            return (
                              <li key={i} className="submenu-item">
                                <Link to={path} className={`submenu-link ${active? 'submenu-active':''}`}>
                                  <div className="submenu-icon"><span className="material-symbols-outlined">{s.icon}</span></div>
                                  <div className="submenu-text">{s.title}</div>
                                </Link>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </nav>

            {/* sidebar footer removed — bottom bar is global */}

          </div>
        </section>
      </div>
    </aside>
  )
}
