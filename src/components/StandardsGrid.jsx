import React, { useMemo, useState } from 'react'

/*
Reusable StandardsGrid
Props:
 - items: array of standard items (same shape as aacItems)
 - assessors: array of assessor column labels (include 'Final Score' if desired)
 - title: optional title to render above grid
*/
export default function StandardsGrid({ items = [], assessors = [], title = '' }) {
  const [form, setForm] = useState({})
  const [openMap, setOpenMap] = useState({})

  const toggleStandard = (standard) => {
    setOpenMap((prev) => ({ ...prev, [standard]: !prev[standard] }))
  }

  const handleKeyToggle = (e, standard) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggleStandard(standard)
    }
  }

  const standards = useMemo(() => {
    const map = (items || []).reduce((acc, it) => {
      (acc[it.standard] ||= []).push(it)
      return acc
    }, {})
    return Object.entries(map)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([standard, its]) => ({
        standard,
        items: its.sort((x, y) => x.objectiveElementCode.localeCompare(y.objectiveElementCode)),
      }))
  }, [items])

  const getCell = (code, colKey) => form?.[code]?.[colKey] || { compliance: '', score: '', remarks: '', images: [] }

  const patchCell = (code, colKey, patch) => {
    setForm((prev) => ({
      ...prev,
      [code]: {
        ...(prev[code] || {}),
        [colKey]: { ...getCell(code, colKey), ...patch },
      },
    }))
  }

  const avgScore = (code) => {
    const cols = (assessors || []).filter((c) => c !== 'Final Score')
    const nums = cols
      .map((c) => Number(getCell(code, c).score))
      .filter((n) => Number.isFinite(n) && n !== 0)
    if (!nums.length) return ''
    const avg = nums.reduce((a, b) => a + b, 0) / nums.length
    return Math.round(avg * 10) / 10
  }

  const scoreToCompliance = (num) => {
    if (num === '' || num === null || num === undefined || isNaN(Number(num))) return null
    const pct = (Number(num) / 10) * 100
    if (pct <= 20) return '0–20% compliance'
    if (pct <= 40) return '21–40% compliance'
    if (pct <= 60) return '41–60% compliance'
    if (pct <= 80) return '61–80% compliance'
    return '81–100% compliance'
  }

  const complianceBadge = (label) => {
    if (!label) return null
    let cls = 'badge-0'
    if (label.includes('81')) cls = 'badge-81'
    else if (label.includes('61')) cls = 'badge-61'
    else if (label.includes('41') || label.includes('21')) cls = 'badge-41'
    else cls = 'badge-0'
    return (
      <span className={`compliance-badge ${cls}`}>
        <span className="cb-dot" />
        {label}
      </span>
    )
  }
  // FC modal state and handlers (Non-Compliance)
  const [fcModal, setFcModal] = useState({ open: false, code: '', description: '', finalScore: '' })
  const openFC = (item, final) => setFcModal({ open: true, code: item.objectiveElementCode, description: item.description, finalScore: final })
  const closeFC = () => setFcModal({ open: false, code: '', description: '', finalScore: '' })

  // Modal CSS classes will handle styles

  return (
    <div className="standards-grid">
      {/* {title ? <h3 style={{ marginTop: 0, marginBottom: 8 }}>{title}</h3> : null} */}

      {standards.map((std) => (
        <section key={std.standard} className="std-section">
          <div
            role="button"
            tabIndex={0}
            onClick={() => toggleStandard(std.standard)}
            onKeyDown={(e) => handleKeyToggle(e, std.standard)}
            aria-expanded={!!openMap[std.standard]}
            className="std-header"
          >
            <div>
              <div className="std-title">{std.standard}</div>
              <div className="std-count">{std.items.length} objective(s)</div>
            </div>
            <div className={`std-caret ${openMap[std.standard] ? 'open' : ''}`}>›</div>
          </div>

          {openMap[std.standard] && std.items.map((item) => {
            const final = avgScore(item.objectiveElementCode)
            return (
              <div key={item.objectiveElementCode} className="std-card">
                <div className="std-card-head">
                  <div className="std-head-left">
                    <div className="std-code">{item.objectiveElementCode}</div>
                    <div className="std-desc">{item.description}</div>
                  </div>

                  <div className="std-final">
                    <div className="final-label">Final Score</div>
                    <div className="final-value">{final || '—'}</div>
                    <div className="final-actions">
                      {complianceBadge(scoreToCompliance(final)) || <span style={{ opacity: 0.6 }}>—</span>}
                      {final !== '' && Number(final) < 4 && (
                        <button type="button" onClick={() => openFC(item, final)} className="btn-fc">FC</button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="std-grid">
                  {(assessors || []).filter((c) => c !== 'Final Score').map((col) => (
                    <div key={col} className="assessor-card">
                      <div className="assessor-title">{col}</div>

                      <div>
                        <label className="form-label">Compliance</label>
                        <select value={getCell(item.objectiveElementCode, col).compliance} onChange={(e) => patchCell(item.objectiveElementCode, col, { compliance: e.target.value })} className="form-control">
                          <option value="">Select</option>
                          <option value="0–20% compliance">0–20% compliance</option>
                          <option value="21–40% compliance">21–40% compliance</option>
                          <option value="41–60% compliance">41–60% compliance</option>
                          <option value="61–80% compliance">61–80% compliance</option>
                          <option value="81–100% compliance">81–100% compliance</option>
                        </select>
                      </div>

                      <div>
                        <label className="form-label">Score (0–10)</label>
                        <input type="number" min={0} max={10} step={1} value={getCell(item.objectiveElementCode, col).score} onChange={(e) => patchCell(item.objectiveElementCode, col, { score: e.target.value })} placeholder="0 / 5 / 10" className="form-control" />
                      </div>

                      <div>
                        <label className="form-label">Remarks</label>
                        <input value={getCell(item.objectiveElementCode, col).remarks} onChange={(e) => patchCell(item.objectiveElementCode, col, { remarks: e.target.value })} placeholder="Add a short remark…" className="form-control" />
                      </div>

                      <div>
                        <label className="form-label">Evidence Images</label>
                        <input type="file" accept="image/*" multiple onChange={(e) => patchCell(item.objectiveElementCode, col, { images: Array.from(e.target.files || []) })} className="file-input" />
                        {getCell(item.objectiveElementCode, col).images?.length > 0 && (
                          <div className="img-grid">
                            {getCell(item.objectiveElementCode, col).images.map((file, idx) => (
                              <div key={idx} className="img-item">
                                <img src={URL.createObjectURL(file)} alt={file.name} className="img-thumb" />
                                <div className="img-caption">{file.name}</div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </section>
      ))}
      {/* FC Modal */}
      {fcModal.open && (
        <div className="fc-overlay" onClick={closeFC}>
          <div className="fc-card" onClick={(e) => e.stopPropagation()}>
            <div className="fc-header">
              <div>
                <div className="fc-title">Non-Compliance</div>
                <div className="fc-sub"><b>{fcModal.code}</b> — {fcModal.description} {fcModal.finalScore !== '' && (<span className="fc-final">(Final: {fcModal.finalScore})</span>)}</div>
              </div>
              <button type="button" onClick={closeFC} className="fc-close">×</button>
            </div>
            <div className="fc-body">
              <label className="form-label">Remark</label>
              <textarea className="form-control textarea" placeholder="Add remark..." rows={5} />
              <div className="fc-section">
                <div className="fc-log-title">NC LOG</div>
                <div className="fc-log">
                  <div className="fc-log-row"><div className="fc-log-key">NC Status</div><div>Open</div></div>
                  <div style={{ height: 12 }} />
                  <div className="fc-log-row"><div className="fc-log-key">Document</div>
                    <div className="fc-docs">
                      <span className="fc-doc">MOM - prescription policy.pdf</span>
                      <span className="fc-doc">MOM - storage policy.pdf</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="fc-footer">
                <button type="button" onClick={closeFC} className="btn-secondary">Close</button>
                <button type="button" onClick={() => { /* TODO: save action */ closeFC() }} className="btn-primary">Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
