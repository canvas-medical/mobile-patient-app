export interface Question {
  'linkId': string,
  'code': [
    {
      'system': string
      'code': string
    }
  ],
  'text': string,
  'type': string,
  'repeats': false,
  'answerOption': [
    {
      'valueCoding': {
        'system':string,
        'code': string,
        'display':string,
      }
    },
  ]
}
