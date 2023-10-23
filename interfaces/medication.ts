export interface Medication {
  id: number,
  medication: string,
  quantity: number,
  refills_left: number,
  last_filled: string,
  cost: number
}
