interface Coding {
  system: string;
  code: string;
  display: string;
}

interface ValueIdentifier {
  system: string;
  value: string;
}

interface Extension {
  url: string;
  valueCode?: string;
  valueCodeableConcept?: {
    coding: Coding[];
    text: string;
  };
  valueString?: string;
  valueBoolean?: boolean;
  valueIdentifier?: ValueIdentifier;
  extension?: Extension[];
}

interface Identifier {
  use: string;
  type: {
    coding: Coding[];
  };
  system: string;
  value: string;
  assigner: {
    display: string;
  };
}

interface Name {
  use: string;
  family: string;
  given: string[];
  period: {
    start: string;
    end: string;
  };
}

interface Telecom {
  id: string;
  extension: Extension[];
  system: string;
  value: string;
  use: string;
  rank: number;
}

interface Address {
  id: string;
  use: string;
  type: string;
  line: string[];
  city: string;
  state: string;
  postalCode: string;
  country: string;
  period: {
    start: string;
  };
}

interface Photo {
  url: string;
}

interface Communication {
  language: {
    coding: Coding[];
    text: string;
  };
}

export interface Patient {
  resourceType: string;
  id: string;
  text: {
    status: string;
    div: string;
  };
  extension: Extension[];
  identifier: Identifier[];
  active: boolean;
  name: Name[];
  telecom: Telecom[];
  gender: string;
  birthDate: string;
  deceasedBoolean: boolean;
  address: Address[];
  photo: Photo[];
  communication: Communication[];
}

export interface PatientProfileFormData {
  coverageID: string
  insurer: string
  memberID: string
  groupNumber: string
  preferredName: string
  firstName: string
  middleName: string
  lastName: string
  email: string
  phone: string
  addressLine1: string
  addressLine2: string
  city: string
  stateAbbreviation: string
  postalCode: string
  birthDate: string
  gender: string
}
