import React, { PropTypes, Component } from 'react';
import Core from 'meteor/nova:core';
import SmartContainers from "meteor/utilities:react-list-container";
import NovaForm from "meteor/nova:forms";
import { Button } from 'react-bootstrap';
import { Accounts } from 'meteor/std:accounts-ui';

import BookItem from './BookItem.jsx';

const ModalTrigger = Core.ModalTrigger;
const Messages = Core.Messages;
const FlashContainer = Core.FlashContainer;
const ListContainer = SmartContainers.ListContainer;
const FlashMessages = Telescope.components.FlashMessages;

//////////////////////////////////////////////////////
// MoviesWrapper                                    //
//////////////////////////////////////////////////////

class BooksWrapper extends Component {
  render() {
    return (
      <div className="wrapper">

        <div style={{maxWidth: "300px"}}>
          <Accounts.ui.LoginForm />
        </div>

        <FlashContainer component={FlashMessages}/>

        <div className="main">
          <ListContainer
            collection={Books}
            publication="books.list"
            limit={5}
            component={BooksList}
            />
        </div>

      </div>
    )
  }
}

//////////////////////////////////////////////////////
// BooksList                                       //
//////////////////////////////////////////////////////

class BooksList extends Component {
  renderNew() {
    
    const component = (
      <div className="add-book">
        <ModalTrigger 
          title="Add Book" 
          component={<Button bsStyle="primary">Add Book</Button>}
        >
          <NovaForm 
            collection={Books} 
            methodName="books.create" 
            currentUser={this.props.currentUser}
          />
        </ModalTrigger>
        <hr/>
      </div>
    )
    
    return !!this.props.currentUser ? component : "";
  }

  render() {

    return (
      <div className="books">
        {this.renderNew()}
        {this.props.results.map(book => <BookItem key={book._id} book={book} currentUser={this.props.currentUser}/>)}

      </div>
    )
  }
};




export default BooksWrapper