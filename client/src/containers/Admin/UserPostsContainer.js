import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from '../../store/actions/user.actions';
import moment from 'moment';
import { Link } from 'react-router-dom';

class UserPostsContainer extends Component {


    componentDidMount = () => {
        this.props.dispatch(Actions.getReviews(this.props.user._id))
    }



    showUserPosts(books) {
        let view = null;

        if (!!books && !!books.length) {
            view = books.map((book, i) => (
                <tr key={book._id}>
                    <td><Link to={`/user/edit/${book._id}`}>{book.name}</Link></td>
                    <td>{book.author}</td>
                    <td>{moment(book.createdAt).format('MM/DD/YY')}</td>
                </tr>
            )
            )
        }

        return view;
    }



    render() {
        console.log('the props is user posts ', this.props);
        const books = this.props.books;

        return (
            <div className="user_posts">
                <h4>Your Reviews</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Author</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.showUserPosts(books)}
                    </tbody>
                </table>
            </div>
        )
    }
}





const mapStateToProps = ({ user: { books } }) => ({ books });

export default connect(mapStateToProps, null)(UserPostsContainer)
