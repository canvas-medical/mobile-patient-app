/**
 * Clears the navigation history by resetting the navigation state.
 *
 * @param {object} navigation - The navigation object.
 */
export function clearHistory(navigation) {
  const state = navigation.getState();
  navigation.reset({
    ...state,
    routes: state.routes.map((route) => ({ ...route, state: undefined }))
  });
}
