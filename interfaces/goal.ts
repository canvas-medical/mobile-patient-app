interface Description {
  text: string;
}

interface Reference {
  reference: string;
  type: string;
}

interface Note {
  id: string;
  authorReference: Reference;
  time: string;
  text: string;
}

export interface Goal {
  resourceType: string;
  id: string;
  lifecycleStatus: 'active' | 'proposed' | 'planned' | 'accepted' | 'on-hold'
  | 'completed' | 'cancelled' | 'entered' | 'rejected'
  achievementStatus: {
    coding: [{
      system: string;
      code: 'in-progress' | 'improving' | 'worsening' | 'no-change' | 'achieved'
      | 'sustaining' | 'not-achieved' | 'no-progress' | 'not-attainable';
      display: 'In Progress' | 'Improving' | 'Worsening' | 'No Change' | 'Achieved'
      | 'Sustaining' | 'Not Achieved' | 'No Progress' | 'Not Attainable';
    }]
  };
  priority?: {
    coding: [{
      system: string;
      code: string;
      display: 'Low Priority' | 'Medium Priority' | 'High Priority';
    }]
  };
  description: Description;
  subject: Reference;
  startDate: string;
  expressedBy: Reference;
  note?: Note[];
  target: [{
    dueDate: string;
  }]
}
