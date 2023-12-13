export interface Schedule {
  actor: {
    reference: string;
    type: string;
  }[];
  comment: string;
  id: string;
  resourceType: string;
  text: {
    div: string;
    status: string;
  };
}

export interface Slot {
  end: string;
  resourceType: string;
  schedule: {
    reference: string;
    type: string;
  };
  start: string;
  status: string;
}
