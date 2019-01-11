import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as BookActios from '../store/actions/books.actions';
import BookDetails from '../components/BookDetails/BookDetails';

class BookDetaileContainer extends Component {


  componentDidMount = () => {
    
    if (!this.props.book) {
      this.props.actions.fetchBook(this.props.match.params.id)
    }

  }


  render() {
    return (
      <div>
        <BookDetails book={this.props.book} />
      </div>
    )
  }


  componentWillUnmount() {
    this.props.actions.resetBook();
  }

}

const mapStateToProps = ({ books: { book } }) => ({
  book
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(BookActios.Actions, dispatch)
})



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BookDetaileContainer))




