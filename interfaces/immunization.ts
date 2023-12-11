import { Coding } from './index';

interface VaccineCode {
  coding: Coding[];
}

interface Patient {
  reference: string;
  type: string;
}

export interface Immunization {
  resource: {
    resourceType: string;
    id: string;
    status: string;
    vaccineCode: VaccineCode;
    patient: Patient;
    occurrenceDateTime: string;
    primarySource: boolean;
  }
}
