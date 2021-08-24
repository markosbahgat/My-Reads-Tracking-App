import React, { Component } from 'react';
import Shelfs from './shelf';

class Shelves extends Component {
    render() { 
        const curnttlyreading = this.props.books.filter(book => book.shelf === 'currentlyReading')
        const wanttoread = this.props.books.filter(book => book.shelf === 'wantToRead')
        const read = this.props.books.filter(book => book.shelf === 'read')
        return ( 
            
            <div className="list-books-content">
            <div>
             <Shelfs bookshelf={curnttlyreading} title={"Currently Reading"} changeshelf={this.props.chnageshelf}/>
             <Shelfs bookshelf={wanttoread} title={"Want To Read"} changeshelf={this.props.chnageshelf}/>
             <Shelfs bookshelf={read} title={"Read"} changeshelf={this.props.chnageshelf}/>
            </div>
          </div>

         );
    }
}
 
export default Shelves;