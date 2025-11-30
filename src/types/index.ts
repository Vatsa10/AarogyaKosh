export interface Profile {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  createdAt: Date;
}

export interface Medicine {
  name: string;
  dosage: string;
  frequency: string;
  duration_days: number;
}

export interface Prescription {
  id: string;
  profile_id: string;
  date: string;
  doctor: string;
  diagnosis: string;
  medicines: Medicine[];
  follow_up_date: string | null;
  file_url: string;
  createdAt: Date;
}

export interface LabValue {
  name: string;
  value: number;
  reference_range: string;
  status: 'low' | 'normal' | 'high';
}

export interface LabReport {
  id: string;
  profile_id: string;
  date: string;
  test_name: string;
  values: LabValue[];
  file_url: string;
  createdAt: Date;
}

export interface Reminder {
  id: string;
  profile_id: string;
  medicine_name: string;
  time: string;
  repeat_frequency: string;
  duration_days: number;
  completed_days: number;
  created_at: Date;
}

export interface AIExtractionResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export interface PrescriptionExtraction {
  doctor: string;
  date: string;
  diagnosis: string;
  medicines: Medicine[];
  follow_up_date: string | null;
}

export interface LabReportExtraction {
  test_name: string;
  date: string;
  values: LabValue[];
}
