import React from 'react'

export default function AccreditationGeneral({ item = {}, photos = [] }) {
  return (
    <section className="tab-pane active" id="tab-general" style={{padding:0}}>
      <table>
        <tbody>
          <tr>
            <th>Location</th>
            <td>
              <input className="text-input" value={item.location || ''} readOnly />
            </td>
          </tr>
          <tr>
            <th>Organisation Name</th>
            <td><input className="text-input" value={item.organisation || item.organisationName || ''} readOnly /></td>
          </tr>
          <tr>
            <th>Organisation Address</th>
            <td>
              <input className="text-input" value={item.organisationAddress || item.address || ''} readOnly />
            </td>
          </tr>

          <tr>
            <th>Photograph of the Organisation Building</th>
            <td className="img-cell">
              {photos[0] ? <img src={photos[0]} alt="Organisation Building" /> : <em>No photo</em>}
            </td>
          </tr>

          <tr>
            <th>Photograph of the Organisation Name</th>
            <td className="img-cell">
              {photos[1] ? <img src={photos[1]} alt="Organisation Name" /> : <em>No photo</em>}
            </td>
          </tr>

          <tr>
            <th>Photograph of the Assessor in front of the Organisation</th>
            <td className="img-cell">
              {photos[2] ? <img src={photos[2]} alt="Assessor in front" /> : <em>No photo</em>}
            </td>
          </tr>

          <tr>
            <th>SPOC Name</th>
            <td><input className="text-input" value={item.spocName || item.contact || ''} readOnly /></td>
          </tr>
        </tbody>
      </table>
    </section>
  )
}
