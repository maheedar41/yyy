import React from 'react'

export default function AuditTable({ mode = 'audits', density = 'spacious', data = [], formatDate, statusVariant, eyeSvg }) {
  if (mode === 'statistics') {
    return (
      <table className={`audit-table ${density}`}>
        <thead>
          <tr>
            <th>Statistics type</th>
            <th>Submission month & year</th>
            <th>Unit</th>
            <th>Submitted By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={5} style={{textAlign:'center',padding:'48px 12px',color:'#6b7685'}}>No records to display</td>
          </tr>
        </tbody>
      </table>
    )
  }

  // incidents / audits mode (uses `data` as incidents)
  return (
    <table className={`audit-table ${density}`}>
      <thead>
        <tr>
          <th></th>
          <th>Incident Id</th>
          <th>Incident date & time *</th>
          <th>Final RCA Comments</th>
          <th>Classification</th>
          <th>Category</th>
          <th>Sub-category</th>
          <th>Incident Submission Date</th>
          <th>M</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((r, i) => (
          <tr key={i}>
            <td>
              <span className={`status-badge ${statusVariant ? statusVariant(r.status) : ''}`} title={r.status} aria-label={`Status ${r.status}`}>
                <span className="dot" aria-hidden />
                <span>{r.status}</span>
              </span>
            </td>
            <td style={{fontWeight:700}}>{r.incidentId}</td>
            <td className="date-col">{formatDate ? formatDate(r.incidentDate) : r.incidentDate}</td>
            <td title={r.rca}>{r.rca}</td>
            <td>{r.classification}</td>
            <td>{r.category}</td>
            <td><div className="truncate" title={r.subcategory}>{r.subcategory}</div></td>
            <td className="date-col">{formatDate ? formatDate(r.submissionDate) : r.submissionDate}</td>
            <td style={{textAlign:'center'}}>{r.m}</td>
            <td className="actions">
              <button className="act" title="Reassign">↻</button>
              <button className="act" title="View">{eyeSvg && eyeSvg()}</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
