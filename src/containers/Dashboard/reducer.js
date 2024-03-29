export const tokenFetchActions = {
  TOKEN_FETCH_IDLE: "TOKEN_FETCH_IDLE",
  TOKEN_FETCH_INIT: "TOKEN_FETCH_INIT",
  TOKEN_FETCH_SUCCESS: "TOKEN_FETCH_SUCCESS",
  TOKEN_FETCH_FAILED: "TOKEN_FETCH_FAILED",
};

export const initialState = {
  tokenArray: [],
  status: tokenFetchActions.TOKEN_FETCH_IDLE,
  error: null,
};

export function reducer(state, action) {
  switch (action.type) {
    case tokenFetchActions.TOKEN_FETCH_INIT:
      return {
        ...state,
        status: tokenFetchActions.TOKEN_FETCH_INIT
      };
    case tokenFetchActions.TOKEN_FETCH_SUCCESS:
        return {
            ...state,
            tokenArray: action.payload,
            status: tokenFetchActions.TOKEN_FETCH_SUCCESS,
        }
    case tokenFetchActions.TOKEN_FETCH_FAILED:
      return {
        ...state,
        error: action.payload,
        status: tokenFetchActions.TOKEN_FETCH_FAILED
      }
    default:
        throw new Error("Invalid action type!");
  }
}
