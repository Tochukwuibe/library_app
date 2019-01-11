import { Types } from '../actions/books.actions';
const initialState = {
    books: [],
    finished: false,
    book: null
}

export const booksReducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case Types.getBooksSuccess: {
            const books = [...state.books, ...payload];
            const finished = books.length === state.books.length;
            return { ...state, books, finished };
        }

        case Types.getBookSuccess: {
            return { ...state, book: payload };
        }

        case Types.addBookSuccess: {
            return { ...state, book: payload };
        }

        case Types.resetBook: {
            return { ...state, book: null };
        }


        default: {
            return state;
        }
    }
}
