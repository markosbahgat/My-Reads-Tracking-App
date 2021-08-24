import React, { Component } from 'react';
import * as BooksAPI from '../BooksAPI';

class BookSearch extends Component {
  state = {
    Books: [],
    query: ''
  }

  handleChange = (event) => {
    var value = event.target.value
    this.setState(() => {
      return {query: value}
    })
    this.search_books(value)
  }

  changeBookShelf = (booksall) => {
    let all_Books = this.props.myBooks
    for (let book of booksall) {
      book.shelf = "none"
    }

    for (let book of booksall) {
      for (let b of all_Books) {
        if (b.id === book.id) {
          book.shelf = b.shelf
        }
      }
    }
    return booksall
  }

  search_books = (val) => {
    if (val.length !== 0) {
      BooksAPI.search(val, 10).then((booksall) => {
        if (!booksall || booksall.error) {
          this.setState({ Books: [] })
          return
        }
        if (booksall.length > 0) {
          booksall = booksall.filter((book) => (book.imageLinks))
          booksall = this.changeBookShelf(booksall)
          this.setState(() => {
            return {Books: booksall}
          })
        }
      })
    } else {
      this.setState({Books: [], query: ''})
    }
  }

  render() {
    return (


      <div className="search-books">
      <div className="search-books-bar">
        
        <button className="close-search" onClick={this.props.func1}>Close</button>
        <div className="search-books-input-wrapper">
          
          <input type="text" placeholder="Search by title or author" onChange={this.handleChange} value={this.state.query}/>

        </div>
      </div>
      <div className="search-books-results">
       
          <ol className="books-grid">
          {this.state.query.length > 0 && this.state.Books.map((book, index) => (
                            <li key={book.id}>
                            <div className="book">
                              <div className="book-top">
                                <div className="book-cover" 
                                style={{ width: 128, height: 193, backgroundImage : `URL(${book.imageLinks.thumbnail})` }}></div>
                                <div className="book-shelf-changer">
                                  <select value={book.shelf} onChange={(e) => this.props.chnageshelf(book, e.target.value)}>
                                    <option value="move" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                  </select>
                                </div>
                              </div>
                              <div className="book-title">{book.title}</div>
                              <div className="book-authors">{book.authors}</div>
                            </div>
                          </li>
          ))}
          </ol>
        
      </div>
    </div>
   
    );
  }
}

export default BookSearch;















