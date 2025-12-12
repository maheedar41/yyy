import React from 'react'

export default function AccreditationScope({ item = {} }) {
  // If you have scope data on item, render dynamically. For now render a few static example rows.
  const rows = item.scopeRows || [
    { id: 1, speciality: 'Anaesthesiology' },
    { id: 2, speciality: 'Bio-chemistry' },
    { id: 3, speciality: 'Dermatology and Venereology' },
    { id: 4, speciality: 'Emergency Medicine' },
    { id: 5, speciality: 'Family Medicine' }
  ]

  return (
    <section className="tab-pane" id="tab-scope" style={{padding:16}}>
      <div className="section-title">Scope of Service <span style={{color:'#e55353'}}>*</span></div>

      <div className="section-subtitle">BROAD SPECIALITY</div>

      <table className="scope-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Speciality</th>
            <th>Adult</th>
            <th>Paediatric</th>
            <th style={{width:220}}>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={r.id || idx}>
              <td>{idx + 1}.</td>
              <td>{r.speciality}</td>
              <td>
                <div className="radio-group">
                  <label><input type="radio" name={`adult${idx}`} /> Yes</label>
                  <label><input type="radio" name={`adult${idx}`} /> No</label>
                </div>
              </td>
              <td>
                <div className="radio-group">
                  <label><input type="radio" name={`ped${idx}`} /> Yes</label>
                  <label><input type="radio" name={`ped${idx}`} /> No</label>
                </div>
              </td>
              <td><textarea className="remark-input" placeholder="Enter Remark" defaultValue={r.remark || ''}></textarea></td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
