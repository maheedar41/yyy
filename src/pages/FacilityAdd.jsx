import React from 'react';
import InspectionFormModern from '../components/FacilityInspectionForm.jsx';

export default function FacilityAdd() {
  // The `InspectionFormModern` component now includes its own
  // list/form/details views internally, so we render it directly.
  return (
    <div className="p-6">
      <InspectionFormModern />
    </div>
  );
}
