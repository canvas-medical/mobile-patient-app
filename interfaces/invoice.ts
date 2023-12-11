export interface Invoice {
  id: string;
  date: string;
  content: {
    attachment: {
      url: string;
    };
  }[];
  type: {
    coding: {
      display: string;
    }[];
  };
}
