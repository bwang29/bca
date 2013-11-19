var _this = this;

BCA.rt = Davis(function() {
  this.configure(function() {
    return this.generateRequestOnPageLoad = true;
  });
  this.get('/', function(req) {
    return (new HOME).init();
  });
  return this.get('/all', function(req) {
    return (new ALL).init();
  });
});

BCA.rt.route_to = function() {
  return Davis.location.assign("/" + Array.prototype.join.call(arguments, "/"));
};

BCA.rt.bind("runRoute", function(request) {}).bind("routeNotFound", function(request) {}).bind("start", function() {
  return BCA.rt.logger.info("BCA started");
}).bind("stop", function() {
  return BCA.rt.logger.info("BCA stopped");
});

BCA.rt.start();
