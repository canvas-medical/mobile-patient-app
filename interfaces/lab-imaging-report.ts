export interface LabImagingReport {
  id: string;
  date: string;
  type: {
    coding: {
      display: string;
    }[];
  };
  content: {
    attachment: {
      url: string;
    };
  }[];
  status: 'current' | 'superseded';
  resourceType: string;
}
