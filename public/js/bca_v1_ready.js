var _this = this;

BCA.rt = Davis(function() {
  this.configure(function() {
    return this.generateRequestOnPageLoad = true;
  });
  this.get('/', function(req) {
    return (new HOME).init();
  });
  this.get('/u/:uid', function(req) {
    return (new FEED).init(req.params["uid"]);
  });
  this.get('/feed', function(req) {
    return (new FEED).init();
  });
  this.get('/setup', function(req) {
    return (new SETUP).init();
  });
  return this.get('/all', function(req) {
    return (new ALL).init();
  });
});

BCA.rt.route_to = function() {
  return Davis.location.assign("/" + Array.prototype.join.call(arguments, "/"));
};

BCA.rt.bind("runRoute", function(request) {}).bind("routeNotFound", function(request) {}).bind("start", function() {
  var _this = this;
  BCA.rt.logger.info("BCA started");
  BCA.fb_user = null;
  BCA.db_user_tasks = null;
  BCA.db_user_uploads = null;
  BCA.db = new Firebase('https://bca.firebaseIO.com');
  BCA.db_users = new Firebase('https://bca.firebaseIO.com/users');
  BCA.db_uploads = new Firebase('https://bca.firebaseIO.com/uploads');
  BCA.db_tasks = new Firebase('https://bca.firebaseIO.com/tasks');
  return BCA.ui.render_append($("body"), "wrapper", {}, function(el) {
    BCA.rt.logger.info("BCA wrapper rendered");
    $("#login_button").unbind().click(function() {
      return BCA.auth.login("facebook", {
        rememberMe: true,
        scope: 'email'
      });
    });
    $("#logout_button").unbind().click(function() {
      BCA.auth.logout();
      return BCA.rt.route_to("");
    });
    return $("#restart_button").unbind().click(function() {
      if (confirm("Are you sure to restart? All progress will be lost!")) {
        BCA.db_user_uploads.remove();
        BCA.db_user_tasks.remove();
        return BCA.rt.route_to("setup");
      }
    });
  });
}).bind("stop", function() {
  return BCA.rt.logger.info("BCA stopped");
});

BCA.rt.start();
