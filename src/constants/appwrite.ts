export const Information_Level = [
  {
    id: 1,
    value: "total",
    name: "Totalmente, conoce el diagnóstico y el pronóstico",
  },
  {
    id: 2,
    value: "partial",
    name: "Parcialmente, conoce el diagnóstico pero no el pronóstico (no sabe que es incurable o que podría morir).",
  },
  {
    id: 3,
    value: "none",
    name: "No informado",
  },
];

export const Religion = [
  {
    id: 1,
    value: "none",
    name: "Ninguna",
  },
  {
    id: 2,
    value: "catholic",
    name: "Católico",
  },
  {
    id: 3,
    value: "jewish",
    name: "Judío",
  },
  {
    id: 4,
    value: "evangelical",
    name: "Evangelical",
  },
  {
    id: 5,
    value: "mormon",
    name: "Mormón",
  },
  {
    id: 6,
    value: "jehovahs_witness",
    name: "Testigo de Jehová",
  },
  {
    id: 7,
    value: "other",
    name: "Otro",
  },
];

export const Ecog = [
  {
    id: 1,
    value: "0",
    name: "Asintomático, actividad normal",
  },
  {
    id: 2,
    value: "1",
    name: "Sintomático, capaz de realizar actividades diarias",
  },
  {
    id: 3,
    value: "2",
    name: "Sintomático, en la cama menos del 50% del día",
  },
  {
    id: 4,
    value: "3",
    name: "Sintomático, en la cama más del 50% del día",
  },
  {
    id: 5,
    value: "4",
    name: "Sintomático, en la cama todo el día",
  },
  {
    id: 6,
    value: "5",
    name: "Paciente terminal",
  },
];

export const Status = [
  {
    id: 1,
    value: "alive",
    name: "Activo",
  },
  {
    id: 2,
    value: "pending",
    name: "Pendiente",
  },
  {
    id: 3,
    value: "dead",
    name: "Inactivo",
  },
];

export const Specific_OT = [
  {
    id: 1,
    value: "none",
    name: "Ninguno",
  },
  {
    id: 2,
    value: "definitive_suspension",
    name: "Suspención definitica",
  },
  {
    id: 3,
    value: "non_conventional",
    name: "No convencional",
  },
];

export const TicketStatus = [
  {
    id: 1,
    value: "open",
    name: "Abierto",
  },
  {
    id: 2,
    value: "in-progress",
    name: "En progreso",
  },
  {
    id: 3,
    value: "solved",
    name: "Resuelto",
  },
  {
    id: 4,
    value: "closed",
    name: "Cerrado",
  },
  {
    id: 5,
    value: "under-review",
    name: "En revisión",
  },
];

export const Mobility = [
  {
    id: 1,
    value: "normal",
    name: "Normal",
  },
  {
    id: 2,
    value: "w_assistance",
    name: "Con asistencia",
  },
  {
    id: 3,
    value: "wheelchair",
    name: "Silla de ruedas",
  },
  {
    id: 4,
    value: "non_ambulatory",
    name: "No ambulatorio",
  },
];

export const MobilityCause = [
  {
    id: 1,
    value: "disease_progression",
    name: "Progresión de la enfermedad",
  },
  {
    id: 2,
    value: "neurological_lesion",
    name: "Lesión neurológica",
  },
];

export const Hygiene = [
  {
    id: 1,
    value: "independent",
    name: "Independiente",
  },
  {
    id: 2,
    value: "bed_dependent",
    name: "Dependiente de la cama",
  },
  {
    id: 3,
    value: "bath_dependent",
    name: "Dependiente para el baño",
  },
];

export const BathTransfer = [
  {
    id: 1,
    value: "yes",
    name: "Sí",
  },
  {
    id: 2,
    value: "w_assistance",
    name: "Con asistencia",
  },
  {
    id: 3,
    value: "no",
    name: "No",
  },
];

export const OralHealth = [
  {
    id: 1,
    value: "healthy",
    name: "Saludable",
  },
  {
    id: 2,
    value: "dry",
    name: "Seca",
  },
  {
    id: 3,
    value: "painful",
    name: "Dolorosa",
  },
  {
    id: 4,
    value: "bleeding",
    name: "Sangrado",
  },
  {
    id: 5,
    value: "mucositis",
    name: "Mucositis",
  },
  {
    id: 6,
    value: "mycosis",
    name: "Micosis",
  },
  {
    id: 7,
    value: "prosthesis",
    name: "Prótesis",
  },
];

export const Swallowing = [
  {
    id: 1,
    value: "normal",
    name: "Normal",
  },
  {
    id: 2,
    value: "mild_disorder",
    name: "Alteración leve",
  },
  {
    id: 3,
    value: "moderate_disorder",
    name: "Alteración moderada",
  },
  {
    id: 4,
    value: "severe_disorder",
    name: "Alteración severa",
  },
];

export const Nutrition = [
  {
    id: 1,
    value: "eats_alone",
    name: "Come solo",
  },
  {
    id: 2,
    value: "w_assistance",
    name: "Con asistencia",
  },
  {
    id: 3,
    value: "no_intake",
    name: "Sin ingesta",
  },
  {
    id: 4,
    value: "ng_tube",
    name: "Sonda nasogástrica",
  },
];

export const Hydration = [
  {
    id: 1,
    value: "normal",
    name: "Normal",
  },
  {
    id: 2,
    value: "dehydrated",
    name: "Deshidratado",
  },
];

export const HydrationMethod = [
  {
    id: 1,
    value: "oral",
    name: "Oral",
  },
  {
    id: 2,
    value: "sc",
    name: "Subcutánea",
  },
  {
    id: 3,
    value: "iv",
    name: "Intravenosa",
  },
];

export const AbdominalStatus = [
  {
    id: 1,
    value: "normal",
    name: "Normal",
  },
  {
    id: 2,
    value: "distended",
    name: "Distendido",
  },
  {
    id: 3,
    value: "painful",
    name: "Doloroso",
  },
];

export const UrinaryFunctions = [
  {
    id: 1,
    value: "normal",
    name: "Normal",
  },
  {
    id: 2,
    value: "diaper",
    name: "Pañal",
  },
  {
    id: 3,
    value: "incontinence",
    name: "Incontinencia",
  },
  {
    id: 4,
    value: "urinary_catheter",
    name: "Catéter urinario",
  },
];

export const UrineCharacteristics = [
  {
    id: 1,
    value: "hematuric",
    name: "Hematuria",
  },
  {
    id: 2,
    value: "coluric",
    name: "Coluria",
  },
  {
    id: 3,
    value: "w_sediment",
    name: "Con sedimento",
  },
];

export const BowelFunction = [
  {
    id: 1,
    value: "normal",
    name: "Normal",
  },
  {
    id: 2,
    value: "diaper",
    name: "Pañal",
  },
  {
    id: 3,
    value: "incontinence",
    name: "Incontinencia",
  },
  {
    id: 4,
    value: "constipation",
    name: "Estreñimiento",
  },
  {
    id: 5,
    value: "diarrhea",
    name: "Diarrea",
  },
];

export const StoolConsistency = [
  {
    id: 1,
    value: "normal",
    name: "Normal",
  },
  {
    id: 2,
    value: "hard",
    name: "Dura",
  },
  {
    id: 3,
    value: "w_blood",
    name: "Con sangre",
  },
];

export const RespiratorySystem = [
  {
    id: 1,
    value: "normal",
    name: "Normal",
  },
  {
    id: 2,
    value: "respiratory_difficulty",
    name: "Dificultad respiratoria",
  },
  {
    id: 3,
    value: "dyspnea",
    name: "Disnea",
  },
  {
    id: 4,
    value: "cough",
    name: "Tos",
  },
];

export const PressureUlcers = [
  {
    id: 1,
    value: "none",
    name: "Ninguna",
  },
  {
    id: 2,
    value: "1",
    name: "Estadio 1",
  },
  {
    id: 3,
    value: "2",
    name: "Estadio 2",
  },
  {
    id: 4,
    value: "3",
    name: "Estadio 3",
  },
  {
    id: 5,
    value: "4",
    name: "Estadio 4",
  },
];

export const RouteOfAdministration = [
  {
    id: 1,
    value: "oral",
    name: "Oral",
  },
  {
    id: 2,
    value: "intravenous",
    name: "Intravenosa",
  },
];

export const StaffRole = [
  {
    id: 1,
    value: "volunteer",
    name: "Voluntario/a",
  },
  {
    id: 2,
    value: "administrative",
    name: "Administrativo/a",
  },
  {
    id: 3,
    value: "nurse",
    name: "Enfermero/a",
  },
  {
    id: 4,
    value: "psychologist",
    name: "Psicólogo/a",
  },
  {
    id: 5,
    value: "doctor",
    name: "Médico/a",
  },
];

export const NoYes = [
  {
    id: 1,
    value: "yes",
    name: "Sí",
  },
  {
    id: 2,
    value: "no",
    name: "No",
  },
];

export const HospitalizationReason = [
  {
    id: 1,
    value: "no_caregivers",
    name: "Sin cuidadores",
  },
  {
    id: 2,
    value: "family_claudication",
    name: "Claudicación familiar",
  },
  {
    id: 3,
    value: "high_demand_for_nursing_care",
    name: "Alta demanda cuidado enfermería",
  },
];

export const UncontrolledSymptoms = [
  {
    id: 1,
    value: "pain",
    name: "Dolor",
  },
  {
    id: 2,
    value: "dyspnoea",
    name: "Disnea",
  },
  {
    id: 3,
    value: "delirium",
    name: "Delirium",
  },
];

export const SpiritualAssistanceType = [
  {
    id: 1,
    value: "priest",
    name: "Sacerdote",
  },
  {
    id: 2,
    value: "deacon",
    name: "Diácono",
  },
  {
    id: 3,
    value: "minister_of_faith",
    name: "Ministro de fe (otra religión)",
  },
  {
    id: 4,
    value: "volunteer",
    name: "Voluntarios",
  },
  {
    id: 5,
    value: "therapeutic_team",
    name: "Equipo terapéutico",
  },
];

export const PreviousPsychopathologicalHistory = [
  {
    id: 1,
    value: "no",
    name: "No",
  },
  {
    id: 2,
    value: "yes",
    name: "Sí",
  },
  {
    id: 3,
    value: "unknown",
    name: "Se desconoció",
  },
];
