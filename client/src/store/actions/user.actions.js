import axios from 'axios';
import { getCookie } from '../../util/cookie.utils';

export const Types = {
    login: 'Login',
    signUp: 'SignUp',
    setUser: 'SetUser',
    setReviews: 'SetReviews',
    setReview: 'SetReview',
    setUsers: 'Get Users'
}



export const Actions = {
    login: (email, password) => Login(email, password),
    signUp: (email, password) => SignUp(email, password),
    getUser: (token) => getUser(token),
    getReviews: (id) => getReviews(id),
    initEdit: (id) => initEdit(id),
    editBook: (id, book, cb) => editBook(id, book, cb),
    deleteBook: (id, cb) => deleteBook(id, cb),
    resetEdit: () => setReview(null),
    getUsers: () => getUsers(),
    addUser: (user, cb) => addUser(user, cb)
}


async function Login(email, password) {

    const { data } = await axios.post('/api/users/login', { email, password })
    const token = getCookie('auth');
    return SetUser(data, token)
}



async function SignUp(email, password) {

    return { type: Types.login, payload: { email, password } }
}



async function getUser(tokenCookie) {
    if (!tokenCookie) return SetUser(null, null)

    const { data: { user, token } } = await axios.get(`/api/users?token=${tokenCookie}`);
    return (dispatch) => {

        return dispatch(SetUser(user, token));
    }
}


async function getUsers() {
    const { data } = await axios.get(`/api/users`)
    return { type: Types.setUsers, payload: data };
}

async function addUser(user, cb) {
    await axios.post('/api/users/register', user);
    cb();
    return (dispatch) => dispatch(getUsers());
}

async function getReviews(id) {
    console.log('getting revies for ', id);
    const { data } = await axios.get(`/api/books?queryBy=reviewer&reviewerId=${id}`);
    return (dispatch) => dispatch(setReviews(data));
}


async function initEdit(id) {
    const { data } = await axios.get(`/api/books/${id}`);
    console.log('the book ', data)
    return (dispatch) => dispatch(setReview(data));
}


async function editBook(id, book, cb) {
    const { data } = await axios.put(`/api/books/${id}`, book);
    cb(data);
    return () => { }
}

async function deleteBook(id, cb) {
    await axios.delete(`/api/books/${id}`);
    cb();
    return () => { }
}



function SetUser(user, token) {
    return { type: Types.setUser, payload: { user, token } }
}


function setReviews(books) {
    return { type: Types.setReviews, payload: books }
}
function setReview(book) {
    return { type: Types.setReview, payload: book }
}