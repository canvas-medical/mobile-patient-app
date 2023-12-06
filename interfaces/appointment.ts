export interface Appointment {
  id: string;
  start: string;
  end: string;
  reasonCode: {
    text: string;
  }[];
  appointmentType: {
    coding: {
      display: string;
    }[];
  };
  contained: {
    address: string;
  }[];
}
