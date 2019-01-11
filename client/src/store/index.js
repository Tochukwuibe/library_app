import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise';
import thunk from 'redux-thunk';
import { booksReducer } from './reducers/books.reducer';
import { userReducer } from './reducers/user.reducer';


const rootReducer = combineReducers({
    books: booksReducer,
    user: userReducer
})


const store = createStore(rootReducer, applyMiddleware(promiseMiddleware, thunk));

export default store;