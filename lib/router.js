Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return Meteor.subscribe('posts');
  }
});

Router.route('/', { name: 'postsList' });

Router.route('/posts/:_id', {
  name: 'postPage',
  data: function() {
    return Posts.findOne(this.params._id);
  }
});

Router.route('/submit', { name: 'postSubmit' });

//route hook
var requireLogin = function() {
  if (!Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render('loading');
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

//if data not found on postPage route then display notFoundTemplate
Router.onBeforeAction('dataNotFound', { only: 'postPage' });

Router.onBeforeAction(requireLogin, { only: 'postSubmit' });