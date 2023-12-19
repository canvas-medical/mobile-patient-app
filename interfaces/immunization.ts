export interface Immunization {
  id: string;
  resourceType: string;
  vaccineCode: {
    coding: {
      display: string;
      code: string;
      system: string;
    }[];
  };
  occurrenceDateTime: string;
}
