export const INITIAL_STATE = {
  modal: false,
  users: [],
};

export function reducer(state, action) {
  switch (action.type) {
    case "MODAL_HIT":
      return {
        ...state,
        modal: !state.modal,
      };
    case "SET_USERS":
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
}
