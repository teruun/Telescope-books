import React, { PropTypes, Component } from 'react';
import { Button } from 'react-bootstrap';

import Core from "meteor/nova:core";
const ModalTrigger = Core.ModalTrigger;

import SmartContainers from "meteor/utilities:react-list-container";
const DocumentContainer = SmartContainers.DocumentContainer;

//////////////////////////////////////////////////////
// Book                                            //
//////////////////////////////////////////////////////

class BookItem extends Component {

  render() {

    const book = this.props.book;
    //console.log("book in bookItem:"+book)
    //console.log(util.inspect(book, false, null));

    return (
      <div className = "bookContent">
        <div key={book.name} style={{paddingBottom: "15px",marginBottom: "15px", borderBottom: "1px solid #ccc"}}>
          <a className = "bookName_bookLink" href={'books/'+book._id} >{book.name} ({book.year})</a>
          <p>{book.review} – by <strong>{book.user && book.user.username}</strong></p>
        </div>
      </div>
    )
  }

};

BookItem.propTypes = {
  Book: React.PropTypes.object,
  currentUser: React.PropTypes.object
}

BookItem.contextTypes = {
  currentUser: React.PropTypes.object
};

module.exports = BookItem;
export default BookItem;