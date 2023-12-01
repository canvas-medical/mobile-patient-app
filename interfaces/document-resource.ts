export interface DocumentResource {
  resource: {
    resourceType: string
    id: string
    status: string
    type: {
      coding: [{
        system: string
        code: string
        display: string
      }]
    }
    category: [{
      coding: [{
        code: string
      }]
    }]
    subject: {
      reference: string
      type: string
    }
    date: string
    author: Array<{
      reference: string
      type: string
    }>
    custodian: {
      reference: string
      type: string
    }
    content: [{
      attachment: {
        contentType: string
        url: string
      }
      format: {
        system: string
        code: string
        display: string
      }
    }]
    context: {
      encounter: [{
        reference: string
        type: string
      }]
      period: {
        start: string
      }
    }
  }
}
