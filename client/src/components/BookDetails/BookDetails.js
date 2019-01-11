import React from 'react';

const BookDetails = ({ book }) => {
    let view = (<p>Loading...</p>)

    console.log('the book in details ', book);

    if (book) {
        view = (
            <div className="br_container">
                <div className="br_header">
                    <h2>{book.name}</h2>
                    <h5>{book.author}</h5>
                    <div className="br_reviewer">
                        <span>Review by: {book.reviewer.firstname}  {book.reviewer.lastname}</span>
                    </div>
                </div>


                <div className="br_review">
                    {book.review || 'no content'}
                </div>

                <div className="br_box">
                    <div className="left">
                        <div>
                            <span>Pages:</span> {book.pages}
                        </div>

                        <div>
                            <span>Price:</span> {book.price}
                        </div>

                    </div>

                    <div className="right">
                        <span>Raiting:</span>
                        <div>{book.raiting || 0} / 5</div>
                    </div>
                </div>

            </div>
        )
    }

    return view;
}

export default BookDetails;
