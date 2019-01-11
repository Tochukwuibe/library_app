import React from 'react';
import { Link } from 'react-router-dom';

const BookItem = ({ book }) => {

    return (
        <Link to={`books/${book._id}`} className="book_item">
            <div className="book_header">
                <h2>{book.name}</h2>
            </div>


            <div className="book_items">
                <div className="book_author">{book.author}</div>
            </div>


            <div className="book_bubble">
                <strong>Price</strong>  $ {Number.parseFloat(book.price).toFixed(2)}
            </div>



            <div className="book_bubble rating">
                <strong>Raiting</strong>  {book.raiting}
            </div>
        </Link>
    );
}

export default BookItem;
