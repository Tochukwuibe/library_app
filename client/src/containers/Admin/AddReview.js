import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Actions } from '../../store/actions/books.actions';
import EditReview from '../../components/Admin/EditReview';

class AddReview extends Component {


    constructor(props) {
        super(props);

        this.state = {
            form: {
                reviewer: this.props.user._id,
                name: '',
                author: '',
                review: '',
                pages: '',
                raiting: '',
                price: ''
            }
        }

    }



    onSubmit = (e) => {
        e.preventDefault();

        console.log('the form dat ', this.state.form);
        this.props.dispatch(Actions.addBook(this.state.form, (book) => this.props.history.push(`/books/${book._id}`)))

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
        console.log('the props in add review ', this.props);
        return <EditReview
            form={this.state.form}
            isEdit={false}
            onInputChange={this.onInputChange}
            onSubmit={this.onSubmit}
        />
    }
}





export default connect(null, null)(AddReview)

