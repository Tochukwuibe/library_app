import React, { Component } from 'react'
import { Actions } from '../../store/actions/user.actions';
import { connect } from 'react-redux';
import EditReview from '../../components/Admin/EditReview';

class EditReviewContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: null
        }
    }


    componentDidMount = () => {
        this.props.dispatch(Actions.initEdit(this.props.match.params.id))
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log('the props and state ', { nextProps, prevState })
        const book = nextProps.book;
        const prevForm = prevState.form;

        if (!!prevForm) return null;
        if (!(!!book)) return null;

        console.log('updating state in getDeriived')

        return {
            form: {
                reviewer: nextProps.user._id,
                name: book.name,
                author: book.author,
                review: book.review,
                pages: book.pages,
                raiting: book.raiting,
                price: book.price
            },
            bookId: nextProps.match.params.id
        }
    }





    onSubmit = (e) => {
        e.preventDefault();

        console.log('the form dat ', this.state);
        this.props.dispatch(Actions.editBook(this.state.bookId, this.state.form, () => this.props.history.push(`/books/${this.state.bookId}`)))

    }


    onDelete = () => {
        this.props.dispatch(Actions.deleteBook(this.state.bookId, (book) => this.props.history.push('/user/user-reviews')))
    }


    onInputChange = ({ target: { name, value } }) => {
        this.setState((state) => ({
            form: {
                ...state.form,
                [name]: value
            }
        }))
    }

    render() {
        return !!this.state.form ? <EditReview
            form={this.state.form}
            onInputChange={this.onInputChange}
            onSubmit={this.onSubmit}
            isEdit={true}
            onDelete={this.onDelete}
        /> : <p>Loading...</p>
    }



    componentWillUnmount() {
        this.props.dispatch(Actions.resetEdit())
    }
}

const mapStateToProps = ({ user: { edited } }) => ({ book: edited })





export default connect(mapStateToProps, null)(EditReviewContainer);
