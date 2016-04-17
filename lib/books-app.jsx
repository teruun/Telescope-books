import React, { PropTypes, Component } from 'react';
import {mount} from 'react-mounter';
import BooksWrapper from './BooksList.jsx';
import BookPage from './BookPage.jsx';
import Core from 'meteor/nova:core';

import PublicationUtils from 'meteor/utilities:smart-publications';
import SmartContainers from "meteor/utilities:react-list-container";
const DocumentContainer = SmartContainers.DocumentContainer;

Books = new Mongo.Collection("books");

const isLoggedIn = user => !!user;
const isOwner = (user, document) => user._id === document.userId;
const isAdmin = user => Users.is.admin(user);

const schema = new SimpleSchema({
  name: {
    type: String,
    publish: true,
    control: "text",
    insertableIf: isLoggedIn,
    editableIf: isOwner
  },
  createdAt: {
    type: Date,
    publish: true,
  },
  year: {
    type: String,
    publish: true,
    optional: true,
    control: "text",
    insertableIf: isLoggedIn,
    editableIf: isOwner
  },
  review: {
    type: String,
    publish: true,
    control: "textarea",
    insertableIf: isLoggedIn,
    editableIf: isOwner
  },
  userId: {
    type: String,
    publish: true,
    join: {
      collection: () => Meteor.users,
      joinAs: "user",
      fields: ["_id", "username"]
    }
  }
});

Books.attachSchema(schema);

//////////////////////////////////////////////////////
// Methods                                          //
//////////////////////////////////////////////////////

Books.smartMethods({
  createCallback: function (user, document) {
    document = _.extend(document, {
      createdAt: new Date(),
      userId: Meteor.userId()
    });
    return document;
  },
  deleteCallback: isOwner
});

//////////////////////////////////////////////////////
// Posts                                            //
//////////////////////////////////////////////////////

Posts.addField({
  fieldName: 'book_id',
  fieldSchema: {
    type: String,
    optional: true,
    insertableIf: isLoggedIn,
    editableIf: isOwner,
    publish: true,
    autoform: {
      omit: true
    }
  }
});

PublicationUtils.addToFields(Posts.publishedFields.list, ["book_id"]);

//PublicationUtils.addToFields(Posts.publishedFields.bookPosts, ["book_id"]);
//var util = require('util');



//////////////////////////////////////////////////////
// Route                                            //
//////////////////////////////////////////////////////

FlowRouter.route('/booksList', {
  name: 'booksList',
  action() {
    mount(BooksWrapper);
  }
});

FlowRouter.route('/books/:_id/:slug?', {
  name: 'books.single',
  action(params, queryParams) {
    ({App, PostPage} = Telescope.components);
    mount(App, {content:
      <DocumentContainer
        collection={Books}
        publication="books.single"
        selector={{_id: params._id}}
        terms={params}
        joins={Books.getJoins()}
        component={BookPage}
        />});
  }
});


if (Meteor.isServer) {
  Books.smartPublish("books.list");
  Books.smartPublish("books.single");
  Posts.smartPublish("bookPosts.list");
}