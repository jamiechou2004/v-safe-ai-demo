export type VaccineType = 'COVID-19' | 'Flu' | 'RSV' | 'Mpox' | 'Other';

export interface VaccineCheckIn {
  vaccineType: VaccineType;
  doseNumber: number;
  dateAdministered: string;
  location: string;
}

export interface SymptomReport {
  id: string;
  timestamp: string;
  symptoms: string[];
  severity: 'mild' | 'moderate' | 'severe';
  temperature?: string;
  notes?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
