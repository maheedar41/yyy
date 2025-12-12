import React, { useEffect, useState } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import  { lazy, Suspense } from 'react'
import GeneralDetails from './GeneralDetails'
import AssessmentPage from './AssessmentPage'
import { assessmentTabs } from './assessmentTabs'
import AACRenderer from '../components/AACRenderer'
import AACLikeScreen from '../components/AACLikeScreen'
import StandardsGrid from '../components/StandardsGrid'
import copItems from './copItems.json'
import aacItems from './aacItems.json'
import MomItems from './momItems.json'
import PreItems from './preItems.json'
import IpcItems from './ipcItems.json'
import PsqItems from './psqItems.json'
import RomItems from './romItems.json'
import FmsItems from './fmsItems.json'
import ImsItems from './imsItems.json'
const AccreditationGeneral = lazy(() => import('../components/AccreditationGeneral'))
const AccreditationScope = lazy(() => import('../components/AccreditationScope'))

export default function AccreditationView(){
  const params = useParams()
  const location = useLocation()

  // Try params.id first. If missing (wildcard matched), extract the trailing part from pathname.
  const paramId = params.id || ''
  const prefix = '/accreditation/accreditation-list/view/'
  const trailing = location.pathname && location.pathname.startsWith(prefix)
    ? location.pathname.slice(prefix.length)
    : ''
  // Prefer paramId; otherwise use trailing. Decode so encoded slashes (%2F) become '/'.
  const rawId = paramId || trailing || ''
  const id = rawId ? decodeURIComponent(rawId) : ''

  const initial = location.state?.item || null
  const [item, setItem] = useState(initial)
  const [loading, setLoading] = useState(!initial)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('generalDetails')

  // AAC array supplied by user — rendered in AAC tab
  const aacItems2 = aacItems
const copItems2=copItems
  // `copItems` is imported from ./copItems.json

  // Map of standards arrays per badge key. When you provide arrays for COP/MOM/etc
  // we will add them to this object so the view can render the same StandardsGrid.
  const standardsData = {
    aac: aacItems2,
    cop:copItems2,
    mom: MomItems,
    pre: PreItems,
    ipc: IpcItems,
    psq: PsqItems,
    rom: RomItems,
    fms: FmsItems,
    ims: ImsItems,
    // cop: [], mom: [], pre: [], ipc: [], psq: [], rom: [], fms: [], hrm: [], ims: []
  }

  // Tab styling (inline to avoid touching global css)
  const tabBase = {
    padding: '8px 14px',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    fontSize: 15,
    fontFamily: 'Poppins, Arial, sans-serif',
    color: '#0f172a',
    borderRadius: 8,
    transition: 'all 120ms ease-in-out',
  }
  const tabActive = {
  
    background: '#eef2f3',
    boxShadow: '0 1px 0 rgba(15,23,42,0.04) inset',
    borderBottom: '3px solid #0ea5a4',
    fontWeight: 700,
  }

  // Render placeholder for tabs we don't implement yet
  function TabPlaceholder({tab}){
    return (
      <div style={{background:'#fff',border:'1px solid #eee',borderRadius:6,padding:24}}>
        <h3 style={{marginTop:0}}>{tab.title}</h3>
        <p style={{color:'#6b7280'}}>This tab is a placeholder. Content for <strong>{tab.title}</strong> will be added later.</p>
      </div>
    )
  }

  useEffect(()=>{
    let mounted = true
    async function load(){
      if(initial) return
      if(!id){ setLoading(false); return }
      setLoading(true); setError(null)
      try{
        const res = await fetch(`/api/accreditation/${encodeURIComponent(id)}`)
        if(!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = await res.json()
        if(mounted) setItem(json || null)
      }catch(e){
        if(mounted) setError('Could not load accreditation details. Open from list or implement API fetch-by-id.')
      }finally{ if(mounted) setLoading(false) }
    }
    load()
    return ()=>{ mounted = false }
  },[id, initial])

  const photos = (item && (item.photos || item.images || [])) || []

  return (
    <div className="accreditation-view" style={{padding:20,fontFamily:'Poppins, Arial, sans-serif',color:'#111'}}>
    
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
        <div>
          <h2 style={{margin:0,fontSize:18,fontWeight:700}}>Accreditation Details</h2>
          <div style={{marginTop:6,color:'#6b7280',fontSize:13}}>
            Accreditation — View {item?.applicationNo ? `— ${item.applicationNo}` : (id ? `— ${id}` : '')}
          </div>
        </div>
        <Link to="/accreditation/accreditation-list" className="btn" style={{textDecoration:'none',padding:'8px 12px',background:'#f1f5f9',borderRadius:6,color:'#0f172a'}}>Back to list</Link>
      </div>

      {/* Tabs header - always visible */}
      {/* Wrap tabs + content in a scrollable pane so only details scroll (sidebar stays fixed) */}
      <div style={{ maxHeight: 'calc(100vh - 140px)', overflowY: 'auto' }}>
        {/* Tabs header - always visible (render from assessmentTabs) */}
        <div style={{borderBottom:'1px solid #f3f4f6',display:'flex',gap:12,alignItems:'center',padding:'8px 12px',flexWrap:'wrap', position: 'sticky', top: 0, background: '#fff', zIndex: 20}}>
        {assessmentTabs.map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`acc-tab ${activeTab === t.key ? 'active' : ''}`}
            role="tab"
            aria-selected={activeTab === t.key}
            aria-controls={`tab-panel-${t.key}`}
          >
            <span className="acc-tab-title" style={{ marginRight: 8 }}>{t.title}</span>
            {t.badge ? <span className="acc-tab-badge" aria-hidden>{t.badge}</span> : null}
          </button>
        ))}
        </div>

        <div style={{marginTop:12}}>
        {loading ? (
          <div style={{padding:24,background:'#fff',border:'1px solid #eee',borderRadius:6}}>Loading…</div>
        ) : (
          <div>
            {activeTab === 'generalDetails' && (
              item ? (
                <div style={{background:'#fff',border:'1px solid #eee',borderRadius:6,overflow:'hidden'}}>
                  <Suspense fallback={<div style={{padding:20}}>Loading details…</div>}>
                    <AccreditationGeneral item={item} photos={photos} />
                  </Suspense>
                </div>
              ) : (
                <div>
                  <div style={{marginBottom:12,color:'#b91c1c',background:'#fff7f7',border:'1px solid #fee2e2',padding:12,borderRadius:6}}>
                    Could not load accreditation details. Showing static snapshot — open from list to view real data.
                  </div>
                  <GeneralDetails />
                </div>
              )
            )}

            {activeTab === 'scopeOfService' && (
              item ? (
                <div style={{background:'#fff',border:'1px solid #eee',borderRadius:6,overflow:'hidden'}}>
                  <Suspense fallback={<div style={{padding:20}}>Loading scope…</div>}>
                    <AccreditationScope item={item} />
                  </Suspense>
                </div>
              ) : (
                <div style={{background:'#fff',border:'1px solid #eee',borderRadius:6,padding:12}}>
                  <AssessmentPage activeKey={activeTab} showHeader={false} />
                </div>
              )
            )}

            {/* Render badge tabs (aac, cop, mom, etc.) consistently */}
            {assessmentTabs.filter(t => t.type === 'badge').map(t => (
              activeTab === t.key ? (
                standardsData[t.key] && standardsData[t.key].length ? (
                  <div key={t.key} style={{ marginTop: 8 }}>
                    <StandardsGrid
                      items={standardsData[t.key]}
                      assessors={[ 'FA SAT Score', 'Dr.Vurla Prabhavathi', 'Ms.Edara Saritha', 'Final Score' ]}
                      title={t.title}
                    />
                  </div>
                ) : (
                  <TabPlaceholder key={t.key} tab={t} />
                )
              ) : null
            ))}
          </div>
        )}
        </div>
      </div>
    </div>
  )
}
