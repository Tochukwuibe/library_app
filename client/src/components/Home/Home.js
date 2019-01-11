import React from 'react';
import BookItem from '../../widgets/bookItem';




const Home = ({ books, loadMore, finished }) => {

    const renderItems = () => {
        if (!(!!books)) return <p>No Books</p>;
        return books.map((book) => <BookItem key={book._id} book={book} />)
    }




    return (
        <div>
            {renderItems()}
            {
                !finished
                &&
                <div className="loadmore" onClick={loadMore}>
                    load More
            </div>
            }

        </div>
    );
}

export default Home;
