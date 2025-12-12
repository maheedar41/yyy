import React, { useMemo, useState, useEffect } from 'react'
import { assessmentTabs } from './assessmentTabs'

export default function AssessmentPage({ activeKey: propActiveKey, showHeader = true }){
  const [activeKey, setActiveKey] = useState(propActiveKey || 'generalDetails')

  // update internal activeKey when parent provides a new one
  useEffect(() => {
    if (propActiveKey) setActiveKey(propActiveKey)
  }, [propActiveKey])

  const activeTab = useMemo(()=> assessmentTabs.find(t=>t.key===activeKey),[activeKey])

  return (
    <div>
      {/* Tabs header (optional) */}
      {showHeader && (
        <div style={{display:'flex',gap:16,borderBottom:'1px solid #eee'}}>
          {assessmentTabs.map(t=> (
            <button
              key={t.key}
              onClick={()=>setActiveKey(t.key)}
              style={{
                padding:'10px 6px',
                border:'none',
                background:'transparent',
                borderBottom: activeKey===t.key ? '2px solid #0ea5a4' : '2px solid transparent',
                cursor:'pointer',
                fontWeight: activeKey===t.key ? 600 : 400
              }}
            >
              {t.title}
            </button>
          ))}
        </div>
      )}

      {/* Tab content */}
      <div style={{padding:16}}>
        {activeTab?.type === 'keyValue' && <KeyValueTab tab={activeTab} />}
        {activeTab?.type === 'matrix' && <MatrixTab tab={activeTab} />}
      </div>
    </div>
  )
}

function KeyValueTab({tab}){
  return (
    <div>
      {tab.sections.map((section, idx)=> (
        <div key={idx}>
          {section.title ? <h3>{section.title}</h3> : null}

          {section.fields.map((f,i)=> (
            <div key={i} style={{display:'grid',gridTemplateColumns:'300px 1fr',gap:12,padding:'10px 0',borderBottom:'1px solid #f1f1f1'}}>
              <div style={{fontWeight:600}}>{f.label}</div>
              <div>
                {f.type === 'text' && (
                  <>
                    <div>{f.value}</div>
                    {f.meta && <small>{f.meta}</small>}
                  </>
                )}

                {f.type === 'image' && f.value.map((src,k)=> (
                  <img key={k} src={src} alt={f.label} style={{width:120,marginRight:10,borderRadius:6}} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

function MatrixTab({tab}){
  const section = tab.sections[0]

  return (
    <div>
      <h3 style={{marginBottom:12}}>{section.title}</h3>

      <table width="100%" cellPadding={10} style={{borderCollapse:'collapse'}}>
        <thead>
          <tr>
            {section.columns.map(c=> (
              <th key={c.key} style={{textAlign:'left',borderBottom:'1px solid #eee'}}>{c.header}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {section.rows.map(row => (
            <tr key={row.id} style={{borderBottom:'1px solid #f5f5f5'}}>
              <td>{row.slNo}</td>
              <td>{row.service}</td>

              <td><YesNo value={row.org} /></td>

              <td><YesNo value={row.assessor} /></td>

              <td>
                <textarea defaultValue={row.remark} placeholder="Enter Remark" style={{width:220,height:60}} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function YesNo({value}){
  return (
    <div style={{display:'flex',gap:10,alignItems:'center'}}>
      <label>
        <input type="radio" name={crypto.randomUUID()} defaultChecked={value === 'yes'} />{' '}Yes
      </label>
      <label>
        <input type="radio" name={crypto.randomUUID()} defaultChecked={value === 'no'} />{' '}No
      </label>
    </div>
  )
}
