import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookSearch from './Components/search'
import Header from './Components/header'
import Searchbutton from './Components/searchButton'
import Shelves from './Components/shelves'

class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
    Allbooks : [],
    Books : [],
    query : ""
  }

 opensearch = () => {
  this.setState({ showSearchPage: true });
 };
 closesearch = () => {
  this.setState({ showSearchPage: false });
 };

 async componentDidMount() {
  const books = await BooksAPI.getAll()
  this.setState({ Allbooks : books})
  
}



updateShelf = (book, shelf) => {
        
  if (shelf === 'none') {
      this.setState(prevState => ({
          Allbooks: prevState.Allbooks.filter(b => b.id !== book.id),
      }))
  }

  if (book.shelf !== shelf) {
      BooksAPI.update(book, shelf).then(() => {
          const { Allbooks, Books } = this.state
          const myReadsIds = Allbooks.map(b => b.id)
          const searchedBooksIds = Allbooks.map(b => b.id)
          let myNewReads = [] //if book already on shelf: reshelf; otherwise, add to myReads
          let newSearchedBooks = []

          if (myReadsIds.includes(book.id) || searchedBooksIds.includes(book.id)) {
              myNewReads = Allbooks.map(b => b.id === book.id ? { ...b, shelf } : b)
              newSearchedBooks = Books.map(b => b.id === book.id ? { ...b, shelf } : b)

          } else {
              book.shelf = shelf
              myNewReads = [...Allbooks, book]
              newSearchedBooks = [...Books, book]
          }
          this.setState({ Allbooks: myNewReads, Books: newSearchedBooks })

      })
  }
}





  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <BookSearch func1={this.closesearch} myBooks={this.state.Allbooks} chnageshelf={this.updateShelf} />
        ) : (
          <div className="list-books">
            <Header/>
            <Shelves books={this.state.Allbooks} searchin={this.state.Books} chnageshelf={this.updateShelf}/>
            <Searchbutton func={this.opensearch}/>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
