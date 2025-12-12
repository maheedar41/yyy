import React from 'react'
import { Link } from 'react-router-dom'
import './accreditation-list.css'

const sampleAccreditations = [
  {
    applicationNo: 'H/2022/N00071',
    referenceId: 'HCO-05/2022/02321',
    organisation: 'Sai Hospitals',
    state: 'Andhra Pradesh',
    assessmentCategory: 'Surveillance Assessment',
    assessmentType: 'Physical Assessment',
    assessmentDate: '29/11/2025 - 30/11/2025',
    stage: 'QA NC Response 1',
    capacity: 'Principal Assessor'
  },
  {
    applicationNo: 'H/2023/N00311',
    referenceId: 'HCO-05/2023/02598',
    organisation: 'Nks Hospital (A Unit Of Bram Healthcare Pvt Ltd)',
    state: 'Delhi',
    assessmentCategory: 'Surveillance Assessment',
    assessmentType: 'Physical Assessment',
    assessmentDate: '27/09/2025 - 28/09/2025',
    stage: 'AC Allocated',
    capacity: 'Principal Assessor'
  },
  {
    applicationNo: 'H/2025/RA03459',
    referenceId: 'H-2008-0079',
    organisation: 'Fortis Hospitals Ltd',
    state: 'Maharashtra',
    assessmentCategory: 'Re-Assessment',
    assessmentType: 'Physical Assessment',
    assessmentDate: '06/09/2025 - 07/09/2025',
    stage: 'Accredited',
    capacity: 'Principal Assessor'
  }
]

export default function AccreditationList(){
  // Helpers for export and print
  function createCsv(rows){
    const cols = ['applicationNo','referenceId','organisation','state','assessmentCategory','assessmentType','assessmentDate','stage','capacity']
    const header = ['Application No','Reference ID','Organisation Name','State','Assessment Category','Assessment Type','Assessment Date','Stage','Capacity']
    const lines = [header.join(',')]
    for(const r of rows){
      const vals = cols.map(c => `"${String(r[c]||'').replace(/"/g,'""')}"`)
      lines.push(vals.join(','))
    }
    return lines.join('\n')
  }

  function exportCsv(){
    const csv = createCsv(sampleAccreditations)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `accreditation-list.csv`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  function onPrint(){
    // Use window.print(); print CSS hides toolbar
    window.print()
  }

  return (
    <div className="accred-list-root">
      <div className="accred-card">
        <div className="accred-toolbar">
          <div>
            <h2 style={{margin:0,fontSize:18,fontWeight:700}}>Accreditation List</h2>
            <div className="accred-small" style={{marginTop:6}}>Applications and assessments</div>
          </div>

          <div className="accred-actions">
            <div className="accred-search" role="search">
              <span className="material-symbols-outlined">search</span>
              <input placeholder="Search application, organisation or state" />
            </div>
            <button title="Export CSV" onClick={exportCsv}>Export CSV</button>
            <button title="Print" onClick={onPrint}>Print</button>
          </div>
        </div>

        <div className="accred-table-wrap">
          <table className="accred-table" aria-label="Accreditation list">
            <thead>
              <tr>
                <th>Application No</th>
                <th>Reference ID</th>
                <th>Organisation Name</th>
                <th>State</th>
                <th>Assessment Category</th>
                <th>Assessment Type</th>
                <th>Assessment Date</th>
                <th>Stage</th>
                <th>Capacity</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {sampleAccreditations.map((r, i)=> (
                <tr key={i}>
                  <td style={{fontWeight:700}}>{r.applicationNo}</td>
                  <td>{r.referenceId}</td>
                  <td>{r.organisation}</td>
                  <td>{r.state}</td>
                  <td>{r.assessmentCategory}</td>
                  <td>{r.assessmentType}</td>
                  <td>{r.assessmentDate}</td>
                  <td><span className="accred-badge">{r.stage}</span></td>
                  <td>{r.capacity}</td>
                  <td>
                    <div style={{display:'flex',gap:8,alignItems:'center'}}>
                      <Link to={`/accreditation/accreditation-list/view/${encodeURIComponent(r.applicationNo)}`} title="View" style={{display:'inline-flex',alignItems:'center'}}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 5c-7 0-11 6-11 7s4 7 11 7 11-6 11-7-4-7-11-7zm0 12a5 5 0 100-10 5 5 0 000 10z" stroke="#111" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </Link>
                      <span title="Open mobile view" style={{display:'inline-flex',alignItems:'center'}}><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="7" y="2" width="10" height="20" rx="2" stroke="#111" strokeWidth="1.2"/><circle cx="12" cy="18" r="1" fill="#111"/></svg></span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
