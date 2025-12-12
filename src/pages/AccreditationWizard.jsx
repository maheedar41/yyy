import React, { useState, useEffect } from 'react'
import './AccreditationWizardModern.css'



const defaultData = {
  programType: 'HCO',
  edition: '',
  orgName: '',
  assessmentType: 'Onsite',
  state: '',
  applicationType: 'New',
  organization: '',
  assessmentDate: '',
  scopeOfServices: {
    AAC: false,
    COP: false,
    MOM: false,
    PRE: false,
    ROM: false,
    IPC: false,
    FMS: false,
    HRM: false,
    PSQ: false,
    IMS: false,
  },
  location: { latitude: '', longitude: '' },
  address: '',
  photos: { building: null, namePlate: null, entrance: null },
  spoc: { name: '', designation: '', phone: '', photo: null },
}

export default function AccreditationWizard() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState(() => {
    try {
      const raw = localStorage.getItem('accreditation_wizard')
      return raw ? JSON.parse(raw) : defaultData
    } catch (e) {
      return defaultData
    }
  })

  const [geoStatus, setGeoStatus] = useState('')

  // Persist draft data when it changes. This allows the user to
  // reload the page and continue where they left off without
  // explicitly clicking “Save”.
  useEffect(() => {
    localStorage.setItem('accreditation_wizard', JSON.stringify(data))
  }, [data])

  const update = (patch) => setData((d) => ({ ...d, ...patch }))

  const updateNested = (path, value) => {
    setData((d) => {
      const copy = JSON.parse(JSON.stringify(d))
      let cur = copy
      for (let i = 0; i < path.length - 1; i++) {
        cur[path[i]] = { ...cur[path[i]] }
        cur = cur[path[i]]
      }
      cur[path[path.length - 1]] = value
      return copy
    })
  }

  const toggleScope = (key) =>
    update({ scopeOfServices: { ...data.scopeOfServices, [key]: !data.scopeOfServices[key] } })

  const handleSpocPhoto = (e) => {
    const file = (e.target.files && e.target.files[0]) || null
    updateNested(['spoc', 'photo'], file)
  }

  const saveProgress = () => {
    localStorage.setItem('accreditation_wizard', JSON.stringify(data))
    setGeoStatus('Progress saved')
  }

  const submit = () => {
    const payload = { ...data, submittedAt: new Date().toISOString() }
    localStorage.setItem('accreditation_wizard_submitted', JSON.stringify(payload))
    setGeoStatus('Form submitted')
    setStep(4)
  }

  const getLocation = () => {
    if (!navigator?.geolocation) {
      setGeoStatus('Geolocation not supported')
      return
    }
    setGeoStatus('Detecting location…')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        updateNested(['location', 'latitude'], String(latitude))
        updateNested(['location', 'longitude'], String(longitude))
        setGeoStatus('Location detected')
      },
      (err) => {
        if (err.code === 1) setGeoStatus('Permission denied')
        else if (err.code === 3) setGeoStatus('Timeout')
        else setGeoStatus('Unable to detect location')
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    )
  }

  // Define the stepper model once to avoid recreating it on every render.
  const steps = [
    { id: 1, title: 'Program & Edition' },
    { id: 2, title: 'Assessment Options' },
    { id: 3, title: 'Organization & Assessment' },
    { id: 4, title: 'General Details & SPOC' },
  ]

  return (
    <div className="wizard-container">
      <h2 className="wizard-heading">Accreditation — Guided Wizard</h2>
      {/* Progress indicator */}
      <div className="wizard-stepper" aria-label="Progress">
        {steps.map((s) => (
          <div
            key={s.id}
            className={`wizard-step ${step === s.id ? 'active' : ''} ${step > s.id ? 'completed' : ''}`}
            role="button"
            tabIndex={0}
            onClick={() => setStep(s.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setStep(s.id)
            }}
          >
            <div className="wizard-step-number">
              {step > s.id ? '✓' : s.id}
            </div>
            <div className="wizard-step-title">{s.title}</div>
          </div>
        ))}
      </div>
      {/* Panel content */}
      <div className="wizard-panel">
        {step === 1 && (
          <div className="panel-content">
            <h3 className="panel-heading">Program & Edition</h3>
            <label className="form-label">Program</label>
            <select
              className="form-control"
              value={data.programType}
              onChange={(e) => update({ programType: e.target.value })}
            >
              <option value="HCO">HCO</option>
              <option value="SHCO">SHCO</option>
            </select>
            <label className="form-label">Edition (e.g. 4th, 3rd)</label>
            <input
              className="form-control"
              value={data.edition}
              onChange={(e) => update({ edition: e.target.value })}
              placeholder="4th edition"
            />
            <label className="form-label">HCO/SHCO Name</label>
            <input
              className="form-control"
              value={data.orgName}
              onChange={(e) => update({ orgName: e.target.value })}
              placeholder="Enter organisation name"
            />
          </div>
        )}
        {step === 2 && (
          <div className="panel-content">
            <h3 className="panel-heading">Assessment Options</h3>
            <label className="form-label">Assessment Type</label>
            <select
              className="form-control"
              value={data.assessmentType}
              onChange={(e) => update({ assessmentType: e.target.value })}
            >
              <option value="Onsite">Onsite</option>
              <option value="Remote">Remote</option>
            </select>
            <label className="form-label">Select State</label>
            <input
              className="form-control"
              value={data.state}
              onChange={(e) => update({ state: e.target.value })}
              placeholder="All states"
            />
            <label className="form-label">Application Type</label>
            <select
              className="form-control"
              value={data.applicationType}
              onChange={(e) => update({ applicationType: e.target.value })}
            >
              <option value="New">New</option>
              <option value="SA">SA</option>
              <option value="RA">RA</option>
            </select>
          </div>
        )}
        {step === 3 && (
          <div className="panel-content">
            <h3 className="panel-heading">Organization & Assessment</h3>
            <label className="form-label">Organization Name</label>
            <input
              className="form-control"
              value={data.organization}
              onChange={(e) => update({ organization: e.target.value })}
              placeholder="Enter organisation name"
            />
            <label className="form-label">Assessment Date</label>
            <input
              type="date"
              className="form-control"
              value={data.assessmentDate}
              onChange={(e) => update({ assessmentDate: e.target.value })}
            />
            <div className="form-label">Scope of Service (select chapters)</div>
            <div className="scope-grid">
              {Object.keys(data.scopeOfServices).map((k) => (
                <label key={k} className="scope-item">
                  <input
                    type="checkbox"
                    checked={data.scopeOfServices[k]}
                    onChange={() => toggleScope(k)}
                  />{' '}
                  {k}
                </label>
              ))}
            </div>
          </div>
        )}
        {step === 4 && (
          <div className="panel-content">
            <h3 className="panel-heading">General Details & SPOC</h3>
            <label className="form-label">Location — Latitude</label>
            <div className="inline-group">
              <input
                className="form-control"
                value={data.location.latitude}
                onChange={(e) => updateNested(['location', 'latitude'], e.target.value)}
              />
              <button
                type="button"
                className="btn-secondary"
                onClick={getLocation}
              >
                Use current location
              </button>
              <span className="status-label">{geoStatus}</span>
            </div>
            <label className="form-label">Location — Longitude</label>
            <input
              className="form-control"
              value={data.location.longitude}
              onChange={(e) => updateNested(['location', 'longitude'], e.target.value)}
            />
            <label className="form-label">Address</label>
            <textarea
              className="form-control textarea"
              value={data.address}
              onChange={(e) => update({ address: e.target.value })}
              placeholder="Enter full address"
            />
            <div className="photos-section">
              <div className="form-label">Photographs (use camera on mobile)</div>
              <label className="form-label">Building Photo</label>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={(e) => {
                  const file = (e.target.files && e.target.files[0]) || null
                  updateNested(['photos', 'building'], file)
                }}
              />
              <label className="form-label">Organisation Name Photo</label>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={(e) => {
                  const file = (e.target.files && e.target.files[0]) || null
                  updateNested(['photos', 'namePlate'], file)
                }}
              />
              <label className="form-label">Entrance / Front Photo</label>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={(e) => {
                  const file = (e.target.files && e.target.files[0]) || null
                  updateNested(['photos', 'entrance'], file)
                }}
              />
              <div className="photo-preview">
                {data.photos?.building && (
                  <div className="img-item">
                    <img
                      src={URL.createObjectURL(data.photos.building)}
                      alt="building"
                    />
                    <div className="img-caption">Building</div>
                  </div>
                )}
                {data.photos?.namePlate && (
                  <div className="img-item">
                    <img
                      src={URL.createObjectURL(data.photos.namePlate)}
                      alt="name"
                    />
                    <div className="img-caption">Nameplate</div>
                  </div>
                )}
                {data.photos?.entrance && (
                  <div className="img-item">
                    <img
                      src={URL.createObjectURL(data.photos.entrance)}
                      alt="entrance"
                    />
                    <div className="img-caption">Entrance</div>
                  </div>
                )}
              </div>
            </div>
            <div className="spoc-section">
              <div className="form-label">SPOC Details</div>
              <label className="form-label">Name</label>
              <input
                className="form-control"
                value={data.spoc.name}
                onChange={(e) => updateNested(['spoc', 'name'], e.target.value)}
                placeholder="Contact person name"
              />
              <label className="form-label">Designation</label>
              <input
                className="form-control"
                value={data.spoc.designation}
                onChange={(e) => updateNested(['spoc', 'designation'], e.target.value)}
                placeholder="Designation / Role"
              />
              <label className="form-label">Phone</label>
              <input
                className="form-control"
                value={data.spoc.phone}
                onChange={(e) => updateNested(['spoc', 'phone'], e.target.value)}
                placeholder="Contact number"
              />
              <label className="form-label">Photo</label>
              <input type="file" accept="image/*" capture="environment" onChange={handleSpocPhoto} />
              {data.spoc.photo && (
                <div className="spoc-preview">
                  <img
                    src={URL.createObjectURL(data.spoc.photo)}
                    alt="spoc"
                  />
                </div>
              )}
            </div>
            <div className="actions">
              <button className="btn-secondary" onClick={saveProgress}>
                Save Draft
              </button>
              <button className="btn-primary" onClick={submit}>
                Submit Final
              </button>
            </div>
          </div>
        )}
        {/* Navigation controls */}
        <div className="navigation">
          <div>
            {step > 1 && (
              <button
                className="btn-secondary"
                onClick={() => setStep(step - 1)}
              >
                Back
              </button>
            )}
          </div>
          <div>
            {step < steps.length && (
              <button
                className="btn-primary"
                onClick={() => setStep(step + 1)}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}