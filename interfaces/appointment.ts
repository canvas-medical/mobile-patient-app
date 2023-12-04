interface Coding {
  system?: string;
  code: string;
  display?: string;
  userSelected?: boolean;
}

interface ConnectionType {
  code: string;
}

interface PayloadType {
  coding: Coding[];
}

interface Endpoint {
  resourceType: string;
  id: string;
  status: string;
  connectionType: ConnectionType;
  payloadType: PayloadType[];
  address: string;
}

interface AppointmentType {
  coding: Coding[];
}

interface ReasonCode {
  coding: Coding[];
  text: string;
}

interface SupportingInformation {
  reference: string;
  type: string;
}

interface Actor {
  reference: string;
  type: string;
}

interface Participant {
  actor: Actor;
  status: string;
}

interface Appointment {
  resourceType: string;
  id: string;
  contained: Endpoint[];
  status: string;
  appointmentType: AppointmentType;
  reasonCode: ReasonCode[];
  description: string;
  supportingInformation: SupportingInformation[];
  start: string;
  end: string;
  participant: Participant[];
}

interface Entry {
  resource: Appointment;
}

interface Link {
  relation: string;
  url: string;
}

export interface AppointmentBundle {
  resourceType: string;
  type: string;
  total: number;
  link: Link[];
  entry: Entry[];
}
