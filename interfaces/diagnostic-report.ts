export interface DiagnosticReport {
  id: string;
  issued: string;
  date: string;
  code: {
    text: string;
  };
  category: {
    coding: {
      display: string;
    }[];
  }[];
  resourceType: string;
  effectiveDateTime: string;
}
