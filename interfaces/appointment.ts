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
  status: string;
  participant: {
    actor: {
      reference: string;
      type: string;
    };
  }[];
}

export interface AppointmentCreationData {
  startTime: string,
  endTime: string,
  practitionerID: string,
  reason: string,
  appointmentType: string,
  appointmentTypeCode: string,
}

export interface AppointmentCancellationData {
  id: string,
  start: string,
  end: string,
  practitionerID: string,
}
