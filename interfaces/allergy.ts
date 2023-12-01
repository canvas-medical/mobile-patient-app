interface Coding {
  system: string;
  code: string;
  display: string;
}

interface ClinicalStatus {
  coding: Coding[];
  text: string;
}

interface Reference {
  reference: string;
}

interface Manifestation {
  coding: Coding[];
  text: string;
}

interface Reaction {
  manifestation: Manifestation[];
  severity: string;
}

export interface Allergy {
  resource: {
    resourceType: string;
    id: string;
    clinicalStatus: ClinicalStatus;
    verificationStatus: ClinicalStatus;
    type: string;
    code: ClinicalStatus;
    patient: Reference;
    encounter: Reference;
    onsetDateTime: string;
    recorder: Reference;
    lastOccurrence: string;
    note: { text: string }[];
    reaction: Reaction[];
  }
}
