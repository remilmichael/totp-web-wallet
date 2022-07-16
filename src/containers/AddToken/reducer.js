export const addTokenActions = {
  IDLE: "IDLE",
  ADTOKEN_INIT: "LOGIN_INIT",
  ADTOKEN_SUCCESS: "LOGIN_SUCCESS",
  ADTOKEN_FAILED: "LOGIN_FAILED",
};

export const initialState = {
  username: "",
  account: "",
  totpKey: "",
  error: "",
  status: addTokenActions.IDLE,
};

export function reducer(state, action) {
  switch (action.type) {
    case "error":
      return {
        ...state,
        error: action.payload,
      };
    case "set_username":
      return {
        ...state,
        error: "",
        username: action.payload,
      };
    case "set_account":
      return {
        ...state,
        error: "",
        account: action.payload,
      };
    case "set_totpkey":
      return {
        ...state,
        error: "",
        totpKey: action.payload,
      };
    case addTokenActions.ADTOKEN_INIT:
      return {
        ...state,
        error: "",
        status: addTokenActions.ADTOKEN_INIT,
      };
    case addTokenActions.ADTOKEN_FAILED:
      return {
        ...state,
        error: action.payload,
        status: addTokenActions.ADTOKEN_FAILED,
      };
    case addTokenActions.ADTOKEN_SUCCESS:
      return {
        ...state,
        username: "",
        account: "",
        totpKey: "",
        error: "",
        status: addTokenActions.ADTOKEN_SUCCESS,
      };
    default:
      throw new Error("Invalid action type");
  }
}
