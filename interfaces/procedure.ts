interface Coding {
  system: string;
  code: string;
  display: string;
}

interface Subject {
  reference: string;
  type: string;
}

export interface Procedure {
  resourceType: string;
  id: string;
  status: string;
  code: { coding: [Coding] };
  subject: Subject;
  performedDateTime: string;
}
