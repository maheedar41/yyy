import { useState, useEffect } from "react";
import React from 'react';
import {
  ArrowLeft,
  Calendar,
  User,
  Mail,
  FileText,
  Eye,
  Filter,
  Save,
  CheckCircle,
  ClipboardCheck,
  Plus,
  Search,
} from "lucide-react";

const STORAGE_KEY = "facility_inspections_v1";

const checklistItems = [
  { text: "Fire extinguishers available and accessible" },
  { text: "Emergency exits clearly marked and unobstructed" },
  { text: "Fire alarm system is functional" },
  { text: "Electrical panels are labeled and unobstructed" },
  { text: "CCTV / security system operational" },
];

function safeJsonParse(value, fallback) {
  try {
    const parsed = JSON.parse(value || "");
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function loadInspections() {
  return safeJsonParse(localStorage.getItem(STORAGE_KEY), []);
}

function saveInspections(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function generateId() {
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

// ✅ Named export (fixes your error)
export function InspectionFormModern() {
  const [view, setView] = useState("list"); // 'list' | 'form' | 'details'
  const [inspections, setInspections] = useState([]);
  const [selectedInspectionId, setSelectedInspectionId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [inspectionDate, setInspectionDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [inspectorName, setInspectorName] = useState("");
  const [inspectorEmail, setInspectorEmail] = useState("");
  const [comments, setComments] = useState("");
  const [items, setItems] = useState(() =>
    checklistItems.map((item, index) => ({
      id: `${index + 1}`,
      item_number: index + 1,
      item_text: item.text,
      response: "na",
      location_action: "",
      action_date: "",
    }))
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchInspections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchInspections = () => {
    const data = loadInspections();
    const sorted = [...data].sort((a, b) => {
      const da = new Date(a.inspection_date || a.created_at || 0).getTime();
      const db = new Date(b.inspection_date || b.created_at || 0).getTime();
      return db - da;
    });
    setInspections(sorted);
  };

  const handleResponseChange = (index, response) => {
    setItems((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], response };
      return next;
    });
  };

  const handleLocationChange = (index, location_action) => {
    setItems((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], location_action };
      return next;
    });
  };

  const handleActionDateChange = (index, action_date) => {
    setItems((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], action_date };
      return next;
    });
  };

  const handleSubmit = async (status) => {
    if (!inspectorName.trim()) {
      alert("Please enter inspector name");
      return;
    }

    setIsSubmitting(true);

    try {
      const newInspection = {
        id: generateId(),
        inspection_date: inspectionDate,
        inspector_name: inspectorName,
        inspector_email: inspectorEmail,
        comments,
        status,
        items: items.map((it) => ({ ...it, response: it.response || "na" })),
        created_at: new Date().toISOString(),
      };

      const existing = loadInspections();
      saveInspections([newInspection, ...existing]);

      setInspectorName("");
      setInspectorEmail("");
      setComments("");
      setInspectionDate(new Date().toISOString().split("T")[0]);
      setItems(
        checklistItems.map((item, index) => ({
          id: `${index + 1}`,
          item_number: index + 1,
          item_text: item.text,
          response: "na",
          location_action: "",
          action_date: "",
        }))
      );

      fetchInspections();
      setView("list");
    } catch (error) {
      console.error("Error saving inspection:", error);
      alert("Failed to save inspection. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredInspections = inspections
    .filter((i) => statusFilter === "all" || i.status === statusFilter)
    .filter(
      (i) =>
        searchQuery === "" ||
        i.inspector_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.comments?.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const selectedInspection = inspections.find((i) => i.id === selectedInspectionId);

  const getStatusColor = (status) => {
    switch (status) {
      case "draft":
        return "bg-amber-100 text-amber-700 border-amber-300";
      case "completed":
        return "bg-emerald-100 text-emerald-700 border-emerald-300";
      case "reviewed":
        return "bg-cyan-100 text-cyan-700 border-cyan-300";
      default:
        return "bg-slate-100 text-slate-700 border-slate-300";
    }
  };

  const getResponseColor = (response) => {
    switch (response) {
      case "yes":
        return "bg-emerald-100 text-emerald-700 border-emerald-300";
      case "no":
        return "bg-rose-100 text-rose-700 border-rose-300";
      default:
        return "bg-slate-100 text-slate-700 border-slate-300";
    }
  };

  if (view === "form") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-emerald-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-slate-200">
            <div className="bg-gradient-to-r from-emerald-600 via-cyan-600 to-teal-600 px-8 py-8">
              <button
                onClick={() => setView("list")}
                className="text-white/90 hover:text-white flex items-center mb-4 transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to List
              </button>
              <div className="flex items-center justify-center mb-3">
                <ClipboardCheck className="w-10 h-10 text-white mr-3" />
                <h1 className="text-3xl font-bold text-white">
                  Shrestha Sunrise Hospitals
                </h1>
              </div>
              <p className="text-center text-white/90 text-sm mb-1">Shamshabad</p>
              <p className="text-center text-lg font-medium text-white/95 tracking-wide">
                Facility Inspection Checklist
              </p>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div>
                  <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
                    <Calendar className="w-4 h-4 mr-2 text-emerald-600" /> Inspection Date
                  </label>
                  <input
                    type="date"
                    value={inspectionDate}
                    onChange={(e) => setInspectionDate(e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
                    <User className="w-4 h-4 mr-2 text-emerald-600" /> Inspector Name
                  </label>
                  <input
                    type="text"
                    value={inspectorName}
                    onChange={(e) => setInspectorName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-semibold text-slate-700 mb-2">
                    <Mail className="w-4 h-4 mr-2 text-emerald-600" /> Inspector Email
                  </label>
                  <input
                    type="email"
                    value={inspectorEmail}
                    onChange={(e) => setInspectorEmail(e.target.value)}
                    placeholder="your.email@hospital.com"
                    className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  />
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-50 to-cyan-50 rounded-2xl p-6 mb-8 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-800 mb-5 flex items-center">
                  <ClipboardCheck className="w-6 h-6 mr-2 text-emerald-600" />
                  Fire and Security Checklist
                </h3>

                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div
                      key={item.id || index}
                      className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition-all"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-slate-700 font-medium">
                            {item.item_number}. {item.item_text}
                          </p>
                        </div>

                        <div className="flex items-center justify-center gap-2 lg:w-48">
                          {["yes", "no", "na"].map((r) => (
                            <button
                              key={r}
                              type="button"
                              onClick={() => handleResponseChange(index, r)}
                              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all transform hover:scale-105 ${
                                item.response === r
                                  ? r === "yes"
                                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200"
                                    : r === "no"
                                    ? "bg-rose-600 text-white shadow-lg shadow-rose-200"
                                    : "bg-slate-600 text-white shadow-lg shadow-slate-200"
                                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                              }`}
                            >
                              {r.toUpperCase()}
                            </button>
                          ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 lg:flex-none">
                          <input
                            type="text"
                            value={item.location_action}
                            onChange={(e) => handleLocationChange(index, e.target.value)}
                            placeholder="Location & action"
                            className="w-full sm:w-64 px-4 py-2 text-sm bg-white border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                          />
                          <input
                            type="date"
                            value={item.action_date}
                            onChange={(e) => handleActionDateChange(index, e.target.value)}
                            className="w-full sm:w-auto px-4 py-2 text-sm bg-white border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Additional Comments
                </label>
                <textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Enter any additional observations or comments..."
                  rows={4}
                  className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <button
                  type="button"
                  onClick={() => handleSubmit("draft")}
                  disabled={isSubmitting}
                  className="flex items-center justify-center px-6 py-3 bg-white text-emerald-700 border-2 border-emerald-200 rounded-xl hover:bg-emerald-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-sm hover:shadow-md"
                >
                  <Save className="w-5 h-5 mr-2" /> Save as Draft
                </button>

                <button
                  type="button"
                  onClick={() => handleSubmit("completed")}
                  disabled={isSubmitting}
                  className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-xl hover:from-emerald-700 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg hover:shadow-xl"
                >
                  <CheckCircle className="w-5 h-5 mr-2" /> Submit Inspection
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === "details" && selectedInspection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-emerald-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-slate-200">
            <div className="bg-gradient-to-r from-emerald-600 via-cyan-600 to-teal-600 px-8 py-6">
              <button
                onClick={() => {
                  setSelectedInspectionId(null);
                  setView("list");
                }}
                className="text-white/90 hover:text-white flex items-center mb-4 transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to List
              </button>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-1">Inspection Details</h1>
                  <p className="text-white/90">Complete inspection record</p>
                </div>
                <span
                  className={`px-5 py-2 rounded-full text-sm font-semibold border-2 ${getStatusColor(
                    selectedInspection.status
                  )}`}
                >
                  {selectedInspection.status.charAt(0).toUpperCase() +
                    selectedInspection.status.slice(1)}
                </span>
              </div>
            </div>

            <div className="p-8">
              <div className="bg-gradient-to-br from-slate-50 to-cyan-50 rounded-2xl p-6 mb-6 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Inspection Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="flex items-center text-sm font-semibold text-slate-600 mb-1">
                      <Calendar className="w-4 h-4 mr-2 text-emerald-600" /> Inspection Date
                    </label>
                    <p className="text-slate-900 font-semibold text-lg">
                      {new Date(selectedInspection.inspection_date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  <div>
                    <label className="flex items-center text-sm font-semibold text-slate-600 mb-1">
                      <User className="w-4 h-4 mr-2 text-emerald-600" /> Inspector Name
                    </label>
                    <p className="text-slate-900 font-semibold text-lg">
                      {selectedInspection.inspector_name}
                    </p>
                  </div>

                  {selectedInspection.inspector_email && (
                    <div>
                      <label className="flex items-center text-sm font-semibold text-slate-600 mb-1">
                        <Mail className="w-4 h-4 mr-2 text-emerald-600" /> Inspector Email
                      </label>
                      <p className="text-slate-900 font-semibold text-lg">
                        {selectedInspection.inspector_email}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                  <ClipboardCheck className="w-6 h-6 mr-2 text-emerald-600" />
                  Checklist Items
                </h3>
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-slate-100 to-cyan-100 text-slate-700 text-sm font-bold">
                        <th className="px-6 py-4 text-left">Item</th>
                        <th className="px-6 py-4 text-center w-32">Response</th>
                        <th className="px-6 py-4 text-left">Location & Action</th>
                        <th className="px-6 py-4 text-left w-40">Action Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {selectedInspection.items.map((item, idx) => (
                        <tr key={item.id || idx} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 text-sm text-slate-900 font-medium">
                            {item.item_number}. {item.item_text}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span
                              className={`inline-block px-3 py-1 rounded-lg text-xs font-bold border-2 ${getResponseColor(
                                item.response
                              )}`}
                            >
                              {String(item.response || "na").toUpperCase()}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-700">
                            {item.location_action || "-"}
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-700">
                            {item.action_date ? new Date(item.action_date).toLocaleDateString() : "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {selectedInspection.comments && (
                <div className="bg-gradient-to-br from-slate-50 to-cyan-50 rounded-2xl p-6 border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-emerald-600" /> Additional Comments
                  </h3>
                  <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                    {selectedInspection.comments}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-emerald-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          <div className="bg-gradient-to-r from-emerald-600 via-cyan-600 to-teal-600 px-8 py-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
                  <ClipboardCheck className="w-8 h-8 mr-3" />
                  Inspection History
                </h1>
                <p className="text-white/90 text-lg">
                  View and manage all facility inspection records
                </p>
              </div>
              <button
                onClick={() => setView("form")}
                className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-bold hover:bg-emerald-50 transition-all flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Plus className="w-5 h-5 mr-2" /> New Inspection
              </button>
            </div>
          </div>

          <div className="p-8">
            <div className="flex flex-col lg:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by inspector name or comments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                />
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <Filter className="w-5 h-5 text-slate-600" />
                {["all", "draft", "completed", "reviewed"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all transform hover:scale-105 ${
                      statusFilter === status
                        ? "bg-gradient-to-r from-emerald-600 to-cyan-600 text-white shadow-lg"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {filteredInspections.length === 0 ? (
              <div className="text-center py-20">
                <div className="bg-gradient-to-br from-slate-100 to-cyan-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-12 h-12 text-slate-400" />
                </div>
                <p className="text-slate-600 text-xl font-semibold mb-2">No inspections found</p>
                <p className="text-slate-500 mb-6">
                  {statusFilter === "all"
                    ? "Create your first inspection to get started"
                    : `No ${statusFilter} inspections available`}
                </p>
                {statusFilter === "all" && (
                  <button
                    onClick={() => setView("form")}
                    className="bg-gradient-to-r from-emerald-600 to-cyan-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl inline-flex items-center"
                  >
                    <Plus className="w-5 h-5 mr-2" /> Create First Inspection
                  </button>
                )}
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredInspections.map((inspection) => (
                  <div
                    key={inspection.id}
                    className="border-2 border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer bg-white hover:border-emerald-300 group"
                    onClick={() => {
                      setSelectedInspectionId(inspection.id);
                      setView("details");
                    }}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="bg-gradient-to-br from-emerald-100 to-cyan-100 p-4 rounded-xl group-hover:scale-110 transition-transform">
                          <ClipboardCheck className="w-7 h-7 text-emerald-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-slate-900 text-xl mb-2">
                            Facility Inspection
                          </h3>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                            <span className="flex items-center font-medium">
                              <Calendar className="w-4 h-4 mr-2 text-emerald-600" />
                              {new Date(inspection.inspection_date).toLocaleDateString()}
                            </span>
                            <span className="flex items-center font-medium">
                              <User className="w-4 h-4 mr-2 text-emerald-600" />
                              {inspection.inspector_name}
                            </span>
                          </div>
                          {inspection.comments && (
                            <p className="text-slate-600 text-sm mt-3 line-clamp-2">
                              {inspection.comments}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 lg:flex-col lg:items-end">
                        <span
                          className={`px-4 py-2 rounded-lg text-xs font-bold border-2 ${getStatusColor(
                            inspection.status
                          )}`}
                        >
                          {inspection.status.charAt(0).toUpperCase() + inspection.status.slice(1)}
                        </span>
                        <button className="text-emerald-600 hover:text-emerald-700 flex items-center gap-2 font-bold group-hover:gap-3 transition-all">
                          <Eye className="w-5 h-5" /> View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ✅ Default export also provided (optional, but helpful)
export default InspectionFormModern;
