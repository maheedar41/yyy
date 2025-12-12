import React from 'react'
import { Outlet, Link, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import AccreditationView from './pages/AccreditationView'
// top/bottom nav lives in `src/components/TopBar.jsx` if needed

export default function App(){
  return (
    <div className="app-root">
      <Sidebar />
        <main className="main-content">
          <div className="top-right-actions">
            <Link to="/notifications" className="top-notif bottom-badge" aria-label="Notifications">
              <svg className="notif-bell" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="false" role="img">
                <path fill="currentColor" d="M12 2c-1.657 0-3 1.343-3 3v.293C6.842 6.17 5 8.388 5 11v3l-1 1v1h16v-1l-1-1v-3c0-2.612-1.842-4.83-4-5.707V5c0-1.657-1.343-3-3-3zm0 20a2.5 2.5 0 0 0 2.45-2h-4.9A2.5 2.5 0 0 0 12 22z" />
              </svg>
              <span className="badge-sonar" />
            </Link>
          </div>

          <Routes>
            {/* ...existing routes... */}
              {/* view handled by GenericPage (avoids rendering list+view together) */}
            {/* ...existing routes... */}
          </Routes>

          <Outlet />
      </main>
      {/* Floating message button (bottom-right) */}
      <Link to="/messages" className="floating-msg" aria-label="Messages">
        <svg className="msg-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="false">
          <path fill="currentColor" d="M20 2H4a2 2 0 0 0-2 2v14l4-2h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM6.5 9.5c0 .828.672 1.5 1.5 1.5s1.5-.672 1.5-1.5S8.828 8 8 8s-1.5.672-1.5 1.5zm4 0c0 .828.672 1.5 1.5 1.5s1.5-.672 1.5-1.5S14.328 8 13.5 8s-1.5.672-1.5 1.5z" />
        </svg>
        <span className="msg-badge" />
      </Link>
    </div>
  )
}
