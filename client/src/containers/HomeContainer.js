import React, { Component } from 'react'
import Home from '../components/Home/Home';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as BookActios from '../store/actions/books.actions';


class HomeContainer extends Component {



  componentDidMount = () => {
    if (!this.props.books.length) {
      this.props.actions.fetchBooks(2, 0, 'desc');
    }

  }

  componentDidUpdate(prevProps, prevState) {
    console.log('component updated ', this.props);
  }


  onLoadMore = () => {
    console.log('loading more');
    const books = this.props.books;
    this.props.actions.fetchBooks(2, books.length, 'desc');
  }


  render() {
    return (
      <div>
        <Home books={this.props.books} finished={this.props.finished} loadMore={this.onLoadMore} />
      </div>
    )
  }


}


const mapStateToProps = ({ books }) => ({
finished: books.finished, 
  books: books.books,
})

    const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(BookActios.Actions, dispatch)
})





export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomeContainer))
