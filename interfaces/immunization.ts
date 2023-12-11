export interface Immunization {
  id: string;
  vaccineCode: {
    coding: {
      display: string;
    }[];
  };
  occurrenceDateTime: string;
}
