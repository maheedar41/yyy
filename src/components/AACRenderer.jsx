import React from 'react'

export default function AACRenderer({ items = [] }){
  if(!items || items.length === 0) return <div style={{padding:16,background:'#fff',border:'1px solid #eee',borderRadius:6}}>No AAC items to display.</div>

  const containerStyle = {background:'#fff',border:'1px solid #eee',borderRadius:6,padding:12}
  const headerStyle = {display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:8}
  const stdTitle = {fontWeight:700,color:'#064e3b'}
  const tableStyle = {width:'100%',borderCollapse:'collapse',marginTop:8}
  const thStyle = {textAlign:'left',padding:'12px 10px',background:'#f8fafc',borderTop:'1px solid #eef2f3'}
  const tdStyle = {padding:'14px 10px',borderTop:'1px solid #f1f5f9',verticalAlign:'top'}

  return (
    <div style={containerStyle}>
      {items.map((it, idx) => (
        <div key={it.objectiveElementCode || idx} style={{marginBottom:18}}>
          <div style={headerStyle}>
            <div>
              <div style={stdTitle}>{it.objectiveElementCode || '—'}</div>
              <div style={{color:'#374151'}}>{it.description}</div>
            </div>
            <div style={{color:'#6b7280',fontSize:13}}>{it.level || ''}</div>
          </div>

          <table style={tableStyle}>
            <tbody>
              <tr>
                <th style={thStyle}>Compliance</th>
                <td style={tdStyle}>{it.compliance ?? '-'}</td>
              </tr>
              <tr>
                <th style={thStyle}>Scores</th>
                <td style={tdStyle}>{it.scores ?? '-'}</td>
              </tr>
              <tr>
                <th style={thStyle}>Remarks</th>
                <td style={tdStyle}>{it.remarks ?? '-'}</td>
              </tr>
              <tr>
                <th style={thStyle}>Images</th>
                <td style={tdStyle}>
                  {Array.isArray(it.images) && it.images.length > 0 ? (
                    <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                      {it.images.map((src,i) => (
                        <img key={i} src={src} alt={`img-${i}`} style={{width:120,height:80,objectFit:'cover',borderRadius:6,border:'1px solid #e6edf0'}}/>
                      ))}
                    </div>
                  ) : (it.photos && it.photos.length > 0 ? (
                    <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                      {it.photos.map((src,i) => (
                        <img key={i} src={src} alt={`photo-${i}`} style={{width:120,height:80,objectFit:'cover',borderRadius:6,border:'1px solid #e6edf0'}}/>
                      ))}
                    </div>
                  ) : ('-'))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )
}
