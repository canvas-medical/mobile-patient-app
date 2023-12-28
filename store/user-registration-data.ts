import { createStore } from 'little-state-machine';

const initialState = {
  preferredName: null,
  firstName: null,
  middleName: null,
  lastName: null,
  gender: null,
  birthSex: null,
  birthDate: new Date().toISOString().slice(0, 10),
  email: null,
  phone: null,
  addressLine1: null,
  addressLine2: null,
  city: null,
  stateAbbreviation: null,
  postalCode: null,
};

createStore(initialState);

export function updateAction(state, payload) {
  return {
    ...state,
    ...payload
  };
}

export function resetAction() {
  return initialState;
}
