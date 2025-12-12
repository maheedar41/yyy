export const assessmentTabs = [
  {
    key: "generalDetails",
    title: "General Details",
    type: "keyValue",
    sections: [
      {
        title: "",
        fields: [
          {
            label: "Location",
            type: "text",
            value: "17.0117483, 81.7714196",
            meta: "29 Nov 2025 10:24:02 am",
          },
          { label: "Organisation Name", type: "text", value: "Yashoda Hospitals" },
          {
            label: "Organisation Address",
            type: "text",
            value: "aryapuram middle street, godavari bustsnd",
          },
          {
            label: "Photograph of the Organisation Building",
            type: "image",
            value: ["https://karetrip-assets.s3.ap-south-1.amazonaws.com/hospital/Yashoda-Hospital-Hitec-City-Hyderabad.webp"],
          },
          {
            label: "Photograph of the Organisation Name",
            type: "image",
            value: ["https://i.ytimg.com/vi/vxjpFfr-YqM/maxresdefault.jpg"],
          },
          {
            label: "Photograph of the Assessor infront of the Organisation",
            type: "image",
            value: ["https://www.local18.in/_next/image/?url=https%3A%2F%2Fimages.local18.in%2Fhospital%2Fimages%2Fhyderabad-hs-2_1.jpg%3Fimwidth%3D474&w=3840&q=75"],
          },
          { label: "SPOC Name", type: "text", value: "KONDETI MANJUSHA" },
        ],
      },
    ],
  },

  {
    key: "scopeOfService",
    title: "Scope of Service",
    type: "matrix",
    sections: [
      {
        title: "BROAD SPECIALITY",
        columns: [
          { key: "slNo", header: "S.No" },
          { key: "service", header: "Service" },
          { key: "org", header: "Organisation (Yes/No)", type: "yesno" },
          { key: "assessor", header: "Assessor (Yes/No)", type: "yesno" },
          { key: "remark", header: "Remark", type: "remark" },
        ],
        rows: [
          {
            id: "bs-1",
            slNo: 1,
            service: "Anaesthesiology",
            org: "yes",
            assessor: "yes",
            remark: "",
          },
          {
            id: "bs-2",
            slNo: 2,
            service: "Bio-chemistry",
            org: "yes",
            assessor: "no",
            remark: "",
          },
          {
            id: "bs-3",
            slNo: 3,
            service: "Dermatology and Venereology",
            org: "no",
            assessor: "no",
            remark: "",
          },
          {
            id: "bs-4",
            slNo: 4,
            service: "Emergency Medicine",
            org: "yes",
            assessor: "yes",
            remark: "",
          },
          {
            id: "bs-5",
            slNo: 5,
            service: "Family Medicine",
            org: "no",
            assessor: "no",
            remark: "",
          },
        ],
      },
    ],
  },
  // Additional short tabs shown as badges in the header
  { key: 'aac', title: 'AAC', type: 'badge', badge: 15 },
  { key: 'cop', title: 'COP', type: 'badge', badge: 30 },
  { key: 'mom', title: 'MOM', type: 'badge', badge: 6 },
  { key: 'pre', title: 'PRE', type: 'badge', badge: 10 },
  { key: 'ipc', title: 'IPC', type: 'badge', badge: 6 },
  { key: 'psq', title: 'PSQ', type: 'badge', badge: 23 },
  { key: 'rom', title: 'ROM', type: 'badge', badge: 12 },
  { key: 'fms', title: 'FMS', type: 'badge', badge: 12 },
  { key: 'hrm', title: 'HRM', type: 'badge', badge: 39 },
  { key: 'ims', title: 'IMS', type: 'badge', badge: 9 },
];
