export interface Medication {
  id: string,
  medicationCodeableConcept: {
    coding: [{
      display: string,
    }]
  },
  dosage: [{
    text: string,
  }],
  dateAsserted: string,
  status: 'active' | 'stopped';
}
