import axios from 'axios';

export const Types = {
    getBooksSuccess: 'get books Success',
    getBookSuccess: 'get book Success',
    addBookSuccess: 'Add book success',
    resetBook: 'Reset book',
    updateBookSuccess: 'Update Book Success'
}


export const Actions = {
    fetchBooks: async (limit = 10, start = 0, order = 'asc') => {

        const { data } = await axios.get(`/api/books?limit=${limit}&skip=${start}&order=${order}`);

        return getBooksSuccess(data)
    },


    fetchBook: async (id) => {
        const { data } = await axios.get(`/api/books/${id}`);
        return getBookSuccess(data);
    },

    addBook: async (book, cb) => {
        console.log('adding book');
        const { data } = await axios.post('/api/books', book);
        cb(data);
        return addBookSuccess(data);
    },

    editBook: async (id, book, cb) => {
        const { data } = await axios.put(`/api/books/${id}`, book);
        cb(data);
        return updateBookSuccess()
    },
    resetBook: () => ({ type: Types.resetBook })

}


function getBooksSuccess(books) {
    return { type: Types.getBooksSuccess, payload: books }
}

function getBookSuccess(book) {
    return { type: Types.getBookSuccess, payload: book }
}

function addBookSuccess(book) {
    return { type: Types.addBookSuccess, payload: book }
}


function updateBookSuccess(book) {
    return { type: Types.updateBookSuccess, payload: book }
}