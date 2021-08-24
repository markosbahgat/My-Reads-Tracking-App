import React, { Component } from 'react';


class Searchbutton extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="open-search">
              <button onClick={this.props.func}>Add a book</button>
            </div>
         );
    }
}
 
export default Searchbutton;