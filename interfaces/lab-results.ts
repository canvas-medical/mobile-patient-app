/* eslint-disable max-len */
export interface DiagnosticReport {
  id: string;
  issued: string;
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
  status: 'registered' | 'partial' | 'preliminary' | 'final' | 'amended' | 'corrected' | 'appended' | 'cancelled' | 'entered-in-error' | 'unknown';
}

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
  status: 'current' | 'superseded' | 'entered-in-error';
  resourceType: string;
}

export interface LabReport {
  id: string;
  date: string;
  display: string;
  uri: string;
  status: 'current' | 'superseded' | 'registered' | 'partial' | 'preliminary' | 'final' | 'amended' | 'corrected' | 'appended' | 'cancelled' | 'entered-in-error' | 'unknown';
}
