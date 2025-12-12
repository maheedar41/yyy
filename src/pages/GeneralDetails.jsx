import React from 'react'
import { generalDetailsData } from './generalDetailsData'

function GeneralDetails() {
  return (
    <div className="general-details" style={{background:'#fff',border:'1px solid #eee',borderRadius:6,padding:12}}>
      {generalDetailsData.map((item, index) => (
        <div key={index} className="detail-row" style={{display:'flex',padding:'14px 12px',borderBottom:'1px solid #f3f4f6',alignItems:'center'}}>
          <div className="label" style={{width:320,fontWeight:700,color:'#374151'}}>{item.label}</div>

          <div className="value" style={{flex:1,color:'#111'}}>
            {item.type === "text" && (
              <>
                <div>{item.value}</div>
                {item.meta && <small style={{color:'#6b7280'}}>{item.meta}</small>}
              </>
            )}

            {item.type === "image" &&
              item.value.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={item.label}
                  style={{ width: 120, marginRight: 8, borderRadius:6, border:'1px solid #eee' }}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default GeneralDetails
