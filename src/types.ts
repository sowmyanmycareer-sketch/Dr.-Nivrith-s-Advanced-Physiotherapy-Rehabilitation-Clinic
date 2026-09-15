export interface AnatomyPoint {
  id: string;
  name: string;
  medicalName: string;
  category: 'spine' | 'lower_limb' | 'upper_limb' | 'cervical';
  position3D: [number, number, number]; // [x, y, z] for 3D model hotspot
  color: string;
  symptoms: string[];
  commonConditions: string[];
  protocolTitle: string;
  drNivrithApproach: string;
  expectedSessions: string;
  recoveryTechniques: string[];
  patientQuote?: {
    text: string;
    author: string;
  };
}

export interface GoogleReview {
  id: string;
  author: string;
  initials: string;
  rating: number;
  timeAgo: string;
  text: string;
  verified: boolean;
  highlightTag?: string;
  treatedCondition?: string;
  likes: number;
}

export interface TreatmentService {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  keyBenefits: string[];
  modalities: string[];
  targetConditions: string[];
  badge?: string;
}

export interface ClinicUpdate {
  id: string;
  date: string;
  title: string;
  summary: string;
  tag: string;
}

export interface AppointmentBooking {
  name: string;
  phone: string;
  email?: string;
  conditionArea: string;
  date: string;
  timeSlot: string;
  painLevel: number;
  description: string;
}
