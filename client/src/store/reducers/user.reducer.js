import { Types } from '../actions/user.actions';

const initialState = {
    user: undefined,
    token: undefined,
    books: null,
    edited: undefined,
    users: undefined
}

export const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case Types.setUser:
            return { ...state, ...payload }

        case Types.setReviews:
            return { ...state, books: payload }

        case Types.setReview:
            return { ...state, edited: payload }

        case Types.setUsers:
            return { ...state, users: payload }

        default:
            return state
    }
}
