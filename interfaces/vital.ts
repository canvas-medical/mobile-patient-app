export interface Vital {
  id: string;
  issued: string;
  effectiveDateTime: string;
  code: {
    coding: any[];
  };
  valueQuantity: {
    value: number;
    unit: string;
  };
  valueString: string;
  component: {
    code: {
      coding: any[];
    };
    valueQuantity: {
      value: number;
      unit: string;
    };
    valueString: string;
  }[];
}
