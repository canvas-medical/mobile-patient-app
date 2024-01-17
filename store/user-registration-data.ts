/**
 * This file contains the implementation of a store for user registration data?.
 * It exports functions to update and reset the state object, as well as the initial state object itself.
 */

import { createStore } from 'little-state-machine';

/**
 * Represents the initial state for user registration data?.
 */
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

/**
 * Creates a store for managing the state of user registration data?.
 * The store is created using the `createStore` function from the 'little-state-machine' library.
 *
 * @param initialState - The initial state object for user registration data?.
 */
createStore(initialState);

/**
 * Updates the state object with the provided payload.
 *
 * @param state - The current state object.
 * @param payload - The payload containing the updated data?.
 * @returns The updated state object.
 */
export function updateAction(state, payload) {
  return {
    ...state,
    ...payload
  };
}

/**
 * Resets the user registration data to its initial state.
 *
 * @returns The initial state of the user registration data?.
 */
export function resetAction() {
  return initialState;
}
