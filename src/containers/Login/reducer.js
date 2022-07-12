export const loginActions = {
    IDLE: 'IDLE',
    LOGIN_INIT: 'LOGIN_INIT',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILED: 'LOGIN_FAILED'
}

export const initialState = {
    email: '',
    password: '',
    error: '',
    status: loginActions.IDLE
}

export function reducer(state, action) {
    switch(action.type) {
        case 'error':
            return {
                ...state,
                error: action.payload
            }
        case 'set_email':
            return {
                ...state,
                error: '',
                email: action.payload
            }
        case 'set_password':
            return {
                ...state,
                error: '',
                password: action.payload
            }
        case loginActions.IDLE:
            return {
                ...state,
                error: '',
                status: loginActions.IDLE
            }
        case loginActions.LOGIN_INIT:
            return {
                ...state,
                status: loginActions.LOGIN_INIT
            };
        case loginActions.LOGIN_SUCCESS:
            return {
                ...state,
                status: loginActions.LOGIN_SUCCESS
            }
        case loginActions.LOGIN_FAILED:
            return {
                ...state,
                status: loginActions.LOGIN_FAILED,
                error: action.payload
            };
        default:
            throw new Error('Invalid action type!');
    }
}
