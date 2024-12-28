export interface SocialSecurity {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  $databaseId: string;
  $collectionId: string;
  name?: string;
  private?: boolean;
}

export interface Doctor {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  $databaseId: string;
  $collectionId: string;
  name: string;
  phone_number: string;
}

export interface CognitiveEvaluation {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  $databaseId: string;
  $collectionId: string;
  guest_id: string;
  fluctuating_course: boolean;
  attention_disturbance: boolean;
  disorganized_thinking: boolean;
  altered_consciousness_level: boolean;
}

export interface PhysicalEvaluation {
  $id: string;
  $collectionId: string;
  $databaseId: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  guest_id: string;
  heart_rate: number;
  blood_pressure_systolic: number;
  blood_pressure_diastolic: number;
  respiratory_rate: number;
  temperature: number;
  pain: number;
  tiredness: number;
  nausea: number;
  depression: number;
  anxiety: number;
  sleepiness: number;
  appetite: number;
  dyspnoea: number;
  difficulty_sleeping: number;
  well_being: number;
  mobility: "normal" | "w_assistance" | "wheelchair" | "non_ambulatory";
  mobility_cause: "disease_progression" | "neurological_lesion";
  hygiene: "independent" | "bed_dependent" | "bath_dependent";
  bath_transfer: "yes" | "w_assistance" | "no";
  oral_health:
    | "healthy"
    | "dry"
    | "painful"
    | "bleeding"
    | "mucositis"
    | "mycosis"
    | "prosthesis";
  swallowing:
    | "normal"
    | "mild_disorder"
    | "moderate_disorder"
    | "severe_disorder";
  nutrition: "eats_alone" | "w_assistance" | "no_intake" | "ng_tube";
  hydration: "normal" | "dehydrated";
  hydration_method: "oral" | "sc" | "iv";
  abdominal_status: "normal" | "distended" | "painful";
  urinary_functions: "normal" | "diaper" | "incontinence" | "urinary_catheter";
  urine_characteristics: "hematuric" | "coluric" | "w_sediment";
  bowel_function:
    | "normal"
    | "diaper"
    | "incontinence"
    | "constipation"
    | "diarrhea";
  stool_consistency: "normal" | "hard" | "w_blood";
  respiratory_system: "normal" | "respiratory_difficulty" | "dyspnea" | "cough";
  sputum_type: string;
  pressure_ulcers: "none" | "1" | "2" | "3" | "4";
  pressure_ulcers_location: string;
  skin_lesions: string;
  edema: boolean;
  edema_location: string;
  ostomies: boolean;
  ostomy_type: string;
  other_disorders: string;
  care_plan: string;
}

export interface Medications {
  $id: string;
  $collectionId: string;
  $databaseId: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  name?: string;
  route_of_administration?: "oral" | "intravenous";
  manufacturer?: string;
}

export interface Guest {
  $id: string;
  $collectionId: string;
  $databaseId: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];

  // Propiedades del huésped
  admission_date?: Date;
  name?: string;
  birthdate?: Date;
  age?: number;
  dni?: string;
  address?: string;
  contact_name?: string;
  contact_phone?: string;
  contact_email?: string;
  relation_with_guest?: string;
  referring_person?: string;
  information_level?: "total" | "partial" | "none";
  religion?:
    | "none"
    | "catholic"
    | "jewish"
    | "evangelical"
    | "mormon"
    | "jehovahs_witness"
    | "other";
  funeral_service?: boolean;
  tumor?: string;
  metastasis?: boolean;
  metastasis_location?: string;
  personal_history?: string;
  ecog?: "0" | "1" | "2" | "3" | "4" | "5";
  specific_oncological_treatment?:
    | "none"
    | "definitive_suspension"
    | "non_conventional";
  surgery?: string;
  radiotherapy?: string;
  chemotherapy?: string;
  hemotherapy?: string;
  opioid_treatment?: boolean;
  opioid_name?: string;
  other_medications?: string;
  social_security?: SocialSecurity;
  social_security_number?: string;
  doctors?: Doctor[];
  cognitive_evaluation?: CognitiveEvaluation;
  fluctuating_course?: boolean;
  attention_disturbance?: boolean;
  disorganized_thinking?: boolean;
  altered_consciousness_level?: boolean;
  physical_evaluation?: PhysicalEvaluation[];
  heart_rate?: number;
  blood_pressure_systolic?: number;
  blood_pressure_diastolic?: number;
  respiratory_rate?: number;
  temperature?: number;
  pain?: number;
  tiredness?: number;
  nausea?: number;
  depression?: number;
  anxiety?: number;
  sleepiness?: number;
  appetite?: number;
  dyspnoea?: number;
  difficulty_sleeping?: number;
  well_being?: number;
  mobility?: "normal" | "w_assistance" | "wheelchair" | "non_ambulatory";
  mobility_cause?: "disease_progression" | "neurological_lesion";
  hygiene?: "independent" | "bed_dependent" | "bath_dependent";
  bath_transfer?: "yes" | "w_assistance" | "no";
  oral_health?:
    | "healthy"
    | "dry"
    | "painful"
    | "bleeding"
    | "mucositis"
    | "mycosis"
    | "prosthesis";
  swallowing?:
    | "normal"
    | "mild_disorder"
    | "moderate_disorder"
    | "severe_disorder";
  nutrition?: "eats_alone" | "w_assistance" | "no_intake" | "ng_tube";
  hydration?: "normal" | "dehydrated";
  hydration_method?: "oral" | "sc" | "iv";
  abdominal_status?: "normal" | "distended" | "painful";
  urinary_functions?: "normal" | "diaper" | "incontinence" | "urinary_catheter";
  urine_characteristics?: "hematuric" | "coluric" | "w_sediment";
  bowel_function?:
    | "normal"
    | "diaper"
    | "incontinence"
    | "constipation"
    | "diarrhea";
  stool_consistency?: "normal" | "hard" | "w_blood";
  respiratory_system?:
    | "normal"
    | "respiratory_difficulty"
    | "dyspnea"
    | "cough";
  sputum_type?: string;
  pressure_ulcers?: "none" | "1" | "2" | "3" | "4";
  pressure_ulcers_location?: string;
  skin_lesions?: string;
  edema?: boolean;
  edema_location?: string;
  ostomies?: boolean;
  ostomy_type?: string;
  other_disorders?: string;
  care_plan?: string;
  status?: "alive" | "pending" | "dead";
  medications?: Medications[];
  hospitalization_date?: Date;
  date_of_death?: Date;
}

export interface Users {
  $id: string;
  $collectionId: string;
  $databaseId: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  user_id?: string;
  name?: string;
  email?: string;
  birthdate?: string;
  bio?: string;
  imageId?: string;
  labels?: string[];
}

export interface Tickets {
  $id: string;
  $collectionId: string;
  $databaseId: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  title?: string;
  description?: string;
  users?: Users;
  solution?: string;
  status?: "open" | "in-progress" | "solved" | "closed" | "under-review";
}

export interface Staff {
  $id: string;
  $collectionId: string;
  $databaseId: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  name?: string;
  dni?: number;
  email?: string;
  birthdate?: Date;
  phone_number?: string;
  role?: "volunteer" | "administrative" | "nurse" | "psychologist" | "doctor";
}

export interface Epicrisis {
  $id: string;
  $collectionId: string;
  $databaseId: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  guest_id?: string;
  guests?: Guest[];
  medical_emergency?: "no" | "yes";
  home_hospitalization?: "no" | "yes";
  home_nursing?: "no" | "yes";
  home_nursing_frequency?: string;
  home_doctor?: "no" | "yes";
  home_doctor_frequency?: string;
  palliative_care_assistance?: "no" | "yes";
  hospitalization_reason?:
    | "no_caregivers"
    | "family_claudication"
    | "high_demand_for_nursing_care";
  uncontrolled_symptoms?: "pain" | "dyspnoea" | "delirium";
  other_uncontrolled_symptoms?: string;
  interconsultations?: "no" | "yes";
  interconsultation_specialist?: string;
  opioid_demo?: string;
  opioid_method?: "oral" | "sc" | "iv";
  sedation?: "no" | "yes";
  sedation_medication?: string;
  delirium?: "no" | "yes";
  dyspnoea?: "no" | "yes";
  pain?: "no" | "yes";
  suffering?: "no" | "yes";
  family_care?: "no" | "yes";
  family_meeting?: "no" | "yes";
  meeting_medic?: "no" | "yes";
  meeting_psychologist?: "no" | "yes";
  meeting_social_worker?: "no" | "yes";
  meeting_nurse?: "no" | "yes";
  meeting_other?: string;
  multifamily_meetings?: "no" | "yes";
  spiritual_assistance?: "no" | "yes";
  spiritual_assistance_type?:
    | "priest"
    | "deacon"
    | "minister_of_faith"
    | "volunteer"
    | "therapeutic_team";
  psychological_assistance?: "no" | "yes";
  previous_psychopathological_history?: "no" | "yes" | "unknown";
  adaptation_difficulties?: "no" | "yes";
  comments?: string;
  medic_in_charge?: Staff[];
  psychologist_in_charge?: Staff[];
  communication?: string;
  guest_name?: string;
  guest_social_security_name?: string;
  guest_address?: string;
  guest_tumor?: string;
  guest_metastasis_location?: string;
  guest_hospitalization_date?: Date;
  guest_date_of_death?: Date;
  guest_hospitalization_days?: number;
  guest_hydration_method?: "oral" | "sc" | "iv";
  guest_opioid_name?: string;
}

export interface Secrets {
  $id: string;
  $collectionId: string;
  $databaseId: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  secret?: string;
  used?: boolean;
}

export interface Files {
  $id: string;
  bucketId: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  name: string;
  signature: string;
  mimeType: string;
  sizeOriginal: number;
  chunksTotal: number;
  chunksUploaded: number;
}

// Api response

export interface GuestsApiResponse {
  guests: {
    total: number;
    documents: Guest[];
  };
}

export interface MedicationsApiResponse {
  medications: {
    total: number;
    documents: Medications[];
  };
}

export interface SocialSecurityApiResponse {
  social_security: {
    total: number;
    documents: SocialSecurity[];
  };
}

export interface UsersApiResponse {
  users: {
    total: number;
    documents: Users[];
  };
}

export interface TicketsApiResponse {
  tickets: {
    total: number;
    documents: Tickets[];
  };
}

export interface StaffApiResponse {
  staff: {
    total: number;
    documents: Staff[];
  };
}

export interface EpicrisisApiResponse {
  epicrisis: {
    total: number;
    documents: Epicrisis[];
  };
}

export interface SecretsApiResponse {
  secrets: {
    total: number;
    documents: Secrets[];
  };
}

export interface FilesApiResponse {
  files: {
    total: number;
    files: Files[];
  };
}
