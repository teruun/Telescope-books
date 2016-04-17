import React, { PropTypes, Component } from 'react';
import { Accounts } from 'meteor/std:accounts-ui';
import SmartContainers from "meteor/utilities:react-list-container";

const DocumentContainer = SmartContainers.DocumentContainer;
const ListContainer = SmartContainers.ListContainer;

import Core from "meteor/nova:core";
import BookItem from './BookItem.jsx';
const ModalTrigger = Core.ModalTrigger;
const Messages = Core.Messages;
const FlashContainer = Core.FlashContainer;
const FlashMessages = Telescope.components.FlashMessages;
//var util = require('util');

//import PostItem from "./../../nova-base-components/lib/posts/list/PostItem.jsx";

class BookPage extends Component {

  render() {
    book = this.props.document;
    console.log("book:"+book._id)
    //console.log(util.inspect(book, false, null));

    return (
      <div className="BookPage">

        <div style={{maxWidth: "300px"}}>
          <Accounts.ui.LoginForm />
        </div>

        <FlashContainer component={FlashMessages}/>

        <BookItem book={book}/>



        <div className="comments-thread">
          <h4 className="comments-thread-title">BookPosts</h4>
          <ListContainer
            collection={Posts}
            publication="bookPosts.list"
            selector={{book_id: book._id}}
            //terms={{book}}
            limit={10}
            joins={Posts.getJoins()}
            component={BookPostsList}
                />
        </div>
      </div>
    )
  }
}

class BookPostsList extends Component {

  render() {
    console.log("results");
    ({PostItem} = Telescope.components);
    //console.log(util.inspect(this.props.results, false, null));


    return (
      <div className="BookPosts">
        {this.props.results.map(post => <PostItem key={post._id} post={post} currentUser={this.props.currentUser}/>)}

      </div>
    )
  }
}

export default BookPage