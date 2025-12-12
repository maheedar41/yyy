import React from 'react'
import { useParams, useLocation } from 'react-router-dom'
import AccreditationList from './AccreditationList'
import AccreditationView from './AccreditationView'
import AuditList from './AuditList'

export default function GenericPage(){
  const { section, page } = useParams()
  const title = page ? page.replace(/-/g,' ') : 'Page'

  // Render Accreditation list when route is /accreditation/accreditation-list
  // If the URL contains a trailing `/view/` segment, render the single-item view only.
  const location = useLocation()
  if(section === 'accreditation' && page === 'accreditation-list'){
    if(location.pathname && location.pathname.includes('/accreditation/accreditation-list/view/')){
      return <AccreditationView />
    }
    return <AccreditationList />
  }

  return (
    <div>
      <h1>{title.charAt(0).toUpperCase() + title.slice(1)}</h1>
      <p>This is a placeholder page for <strong>{section}</strong> / <strong>{page}</strong>.</p>
    </div>
  )
}
