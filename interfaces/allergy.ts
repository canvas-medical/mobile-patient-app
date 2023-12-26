export interface Allergy {
  id: string;
  clinicalStatus: {
    text: string;
  }
  code: {
    coding: {
      display: string;
    }[];
  };
  note: {
    text: string;
  }[];
  reaction: {
    severity: string;
  }[];
}
