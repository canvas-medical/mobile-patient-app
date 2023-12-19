export interface Medication {
  id: string,
  resourceType: string;
  medicationCodeableConcept: {
    coding: [{
      display: string,
      code: string;
      system: string;
    }]
  },
  dosage: [{
    text: string,
  }],
  dateAsserted: string,
  status: 'active' | 'stopped';
}
