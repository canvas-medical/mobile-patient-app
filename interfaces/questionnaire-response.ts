export interface QuestionnaireResponse {
    resourceType: string;
    id: string;
    extension: {
      url: string;
      valueString: string;
    }[];
    questionnaire: string;
    status: string;
    subject: {
      reference: string;
      type: string;
    };
    authored: string;
    author: {
      reference: string;
      type: string;
    };
    item: {
      linkId: string;
      text: string;
      answer: {
        valueCoding?: {
          system: string;
          code: string;
          display: string;
        },
        valueString?: string;
      }[];
    }[];
}
