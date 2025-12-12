import React from 'react'
import StandardsGrid from './StandardsGrid'

export default function AACLikeScreen({ aacItems = [], assessors = [
  'FA SAT Score',
  'Dr.Vurla Prabhavathi',
  'Ms.Edara Saritha',
  'Final Score',
] }) {
  return <StandardsGrid items={aacItems} assessors={assessors} title="AAC Standards" />
}

const desc = {
  fontSize: 14,
  fontWeight: 500,
  color: "#334155",
  maxWidth: 700,
  lineHeight: "20px",
};

const finalArea = {
  textAlign: "right",
  minWidth: 200,
};

const finalScoreLabel = {
  fontSize: 12,
  fontWeight: 700,
  color: "#6B7280",
};

const finalNumber = {
  fontSize: 28,
  fontWeight: 900,
  color: "#005EA7",
  lineHeight: "28px",
  marginTop: 4,
  marginBottom: 8,
};

const assessorContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: 16,
  padding: 20,
};

const assessorCard = {
  border: "1px solid #E5E7EB",
  borderRadius: 10,
  padding: 16,
  background: "#FAFAFA",
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const assessorTitle = {
  fontSize: 16,
  fontWeight: 800,
  color: "#005EA7",
  marginBottom: 6,
};

const fieldGroup = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
};

const label = {
  fontSize: 12,
  fontWeight: 700,
  color: "#6B7280",
};

const inputBase = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #D1D5DB",
  outline: "none",
  background: "#FFFFFF",
  fontSize: 14,
  color: "#0F172A",
};

const input = { ...inputBase };

const select = {
  ...inputBase,
  appearance: "none",
  cursor: "pointer",
};

const fileInput = {
  ...inputBase,
  padding: "6px",
};

const thumbGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
  gap: 10,
  marginTop: 6,
};

const thumbCard = {
  border: "1px solid #E5E7EB",
  borderRadius: 8,
  overflow: "hidden",
  background: "#FFFFFF",
  textAlign: "center",
};

const thumbImg = {
  width: "100%",
  height: 80,
  objectFit: "cover",
};

const thumbName = {
  padding: "6px 8px",
  fontSize: 11,
  fontWeight: 700,
  color: "#374151",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

/* ---- FC button + Modal styles ---- */

const fcBtn = {
  border: "1px solid #F59E0B",
  background: "#FEF3C7",
  color: "#92400E",
  fontWeight: 900,
  borderRadius: 10,
  padding: "10px 12px",
  cursor: "pointer",
  height: 40,
  alignSelf: "flex-start",
};

const modalOverlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(15, 23, 42, 0.45)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 16,
  zIndex: 9999,
};

const modalCard = {
  width: "min(980px, 96vw)",
  background: "#FFFFFF",
  borderRadius: 14,
  border: "1px solid #E5E7EB",
  boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
  overflow: "hidden",
};

const modalHeader = {
  padding: 16,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  borderBottom: "1px solid #F1F5F9",
  background: "#F9FAFB",
};

const modalTitle = { fontSize: 18, fontWeight: 900, color: "#0F172A" };
const modalSub = { fontSize: 13, marginTop: 4, color: "#334155" };

const modalCloseBtn = {
  border: "none",
  background: "transparent",
  fontSize: 22,
  fontWeight: 900,
  cursor: "pointer",
  color: "#334155",
  lineHeight: "18px",
};

const modalBody = { padding: 16 };

const textarea = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #D1D5DB",
  outline: "none",
  background: "#FFFFFF",
  fontSize: 14,
  color: "#0F172A",
  resize: "vertical",
};

const ncLogTitle = { fontSize: 13, fontWeight: 900, color: "#0D9488", marginBottom: 8 };

const ncLogBox = {
  border: "1px solid #E5E7EB",
  borderRadius: 12,
  padding: 12,
  background: "#FFFFFF",
};

const docPill = {
  display: "inline-flex",
  alignItems: "center",
  padding: "6px 10px",
  borderRadius: 999,
  background: "#ECFDF5",
  border: "1px solid #A7F3D0",
  color: "#065F46",
  fontSize: 12,
  fontWeight: 800,
};

const modalFooter = {
  display: "flex",
  justifyContent: "flex-end",
  gap: 10,
  marginTop: 16,
};

const secondaryBtn = {
  border: "1px solid #CBD5E1",
  background: "#FFFFFF",
  color: "#0F172A",
  fontWeight: 800,
  borderRadius: 10,
  padding: "10px 14px",
  cursor: "pointer",
};

const primaryBtn = {
  border: "1px solid #1D4ED8",
  background: "#1D4ED8",
  color: "#FFFFFF",
  fontWeight: 900,
  borderRadius: 10,
  padding: "10px 14px",
  cursor: "pointer",
};
