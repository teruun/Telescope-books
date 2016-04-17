//////////////////
// Link Helpers //
//////////////////

/**
 * @summary Return a book's link if it has one, else return its book page URL
 * @param {Object} book
 */
Books.getLink = function (book, isAbsolute) {
  return !!book.url ? Telescope.utils.getOutgoingUrl(book.url) : "book:"+book._id;
};
Books.helpers({getLink: function (isAbsolute) {return Books.getLink(this, isAbsolute);}});
