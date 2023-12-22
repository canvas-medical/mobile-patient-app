export interface Condition {
  id: string;
  resourceType: string;
  clinicalStatus: {
    text: string;
  };
  code: {
    text: string;
    coding: [{
      code: string;
      display: string;
      system: string;
    }];
  };
  recordedDate: string;
}
