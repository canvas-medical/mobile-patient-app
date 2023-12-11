export interface Allergy {
  id: string;
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
