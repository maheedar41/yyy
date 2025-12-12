import React from 'react'

export default function AccreditationTable({ density = 'spacious', data = [], eyeSvg }) {
  return (
    <table className={`audit-table ${density}`} style={{minWidth:1200}}>
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
        {data.map((r, i) => {
          // use a simple numeric id to avoid encoded slashes in the URL (e.g. H%2F2022%2FN00071)
          const id = String(i + 1)
          // viewPath removed: view/navigation disabled per request
          return (
            <tr key={i}>
              <td style={{fontWeight:700}}>{r.applicationNo}</td>
              <td>{r.referenceId}</td>
              <td className="truncate" title={r.organisation}>{r.organisation}</td>
              <td>{r.state}</td>
              <td>{r.assessmentCategory}</td>
              <td>{r.assessmentType}</td>
              <td className="date-col">{r.assessmentDate}</td>
              <td>{r.stage}</td>
              <td>{r.capacity}</td>
              <td className="actions">
                {/* View links removed — show non-clickable icons for visual parity */}
                <div className="act" style={{marginRight:8}} aria-hidden>
                  {eyeSvg && eyeSvg()}
                </div>
                <div className="act" aria-hidden>🔗</div>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
