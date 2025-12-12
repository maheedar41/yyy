import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function parseSubmitted(){
  const items = [];
  for(const key in localStorage){
    if(Object.prototype.hasOwnProperty.call(localStorage, key) && key.startsWith('facility_inspection_submitted_')){
      try{
        const raw = localStorage.getItem(key);
        const parsed = JSON.parse(raw);
        items.push({ id: key, data: parsed });
      }catch(e){/* ignore */}
    }
  }
  // sort descending by submittedAt if present
  items.sort((a,b)=>{
    const ta = a.data.submittedAt ? new Date(a.data.submittedAt).getTime() : 0;
    const tb = b.data.submittedAt ? new Date(b.data.submittedAt).getTime() : 0;
    return tb - ta;
  });
  return items;
}

export default function FacilityList(){
  const [inspections, setInspections] = useState([]);
  const [filter, setFilter] = useState('All');
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const [selected, setSelected] = useState(null);

  useEffect(()=>{
    const subs = parseSubmitted();
    const draftRaw = localStorage.getItem('facility_inspection_draft');
    const draft = draftRaw ? [{ id: 'draft', data: JSON.parse(draftRaw), draft: true }] : [];
    setInspections([...draft, ...subs]);
  },[]);

  const filtered = inspections.filter(it=>{
    if(filter==='All') return true;
    if(filter==='Draft') return !!it.draft || it.id==='draft';
    if(filter==='Completed') return !it.draft;
    if(filter==='Reviewed') return false; // placeholder, no review flag yet
    return true;
  });

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = filtered.slice((page-1)*pageSize, page*pageSize);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Facility Inspections</h1>     
      </div>
  );
}
