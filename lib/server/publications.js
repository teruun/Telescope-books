//
//Meteor.publish('bookPosts.list', function (bookId) {
//
//  const currentUser = Meteor.users.findOne(this.userId);
//  console.log("bookId in publication");
//  console.log(bookId);
//
//  posts = Posts.find({
//    book_id: bookId
//  }).count();
//  console.log("posts:");
//  console.log(posts);
//  //console.log(util.inspect(posts, false, null));
//});