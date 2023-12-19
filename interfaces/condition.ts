export interface Condition {
  id: string;
  resourceType: string;
  code: {
    text: string;
    coding: {
      code: string;
      display: string;
      system: string;
    }[];
  };
  recordedDate: string;
}
