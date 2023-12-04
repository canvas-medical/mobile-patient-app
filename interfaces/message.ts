export interface Message {
  resource: {
    resourceType: string,
    id: string,
    status: string,
    sent: string,
    received: string,
    recipient: [
      {
        reference: string,
        type: string,
      }
    ],
    sender: {
      reference: string,
      type: string,
    },
    payload: [
      {
        contentString: string
      }
    ]
  }
}
