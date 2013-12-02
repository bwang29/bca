# BCA routing and startup
# use the following code to enable push state
# var express = require('express')
# var http = require('http')
# var path = require('path')
# var app = express()
# app.set('views', __dirname + '/views')
# app.use(express.static(path.join(__dirname, 'public')))
# app.get('/*', function(req, res) {
#   res.sendfile(__dirname + '/public/index.html')
# })

# app.listen(3000)
# depend on BCA ui and ws

BCA.rt = Davis () ->
  this.configure () ->
    this.generateRequestOnPageLoad = true
  this.get '/', (req) ->
    (new HOME).init()
  this.get '/u/:uid', (req) ->
    (new FEED).init(req.params["uid"])
  this.get '/feed', (req) ->
    (new FEED).init()
  this.get '/setup', (req) ->
    (new SETUP).init()
  this.get '/all', (req) ->
    (new ALL).init()

# helper function to go to a route
BCA.rt.route_to = () =>
  Davis.location.assign "/" + Array.prototype.join.call(arguments,"/")

# application startup configuration
BCA.rt.bind("runRoute", (request) ->
).bind("routeNotFound", (request) ->
).bind("start", ->
  BCA.rt.logger.info "BCA started"
  # connect to database
  BCA.fb_user = null
  BCA.db_user_tasks = null
  BCA.db_user_uploads = null
  BCA.db = new Firebase('https://bca.firebaseIO.com')
  BCA.db_users = new Firebase('https://bca.firebaseIO.com/users')
  BCA.db_uploads = new Firebase('https://bca.firebaseIO.com/uploads')
  BCA.db_tasks = new Firebase('https://bca.firebaseIO.com/tasks')

  BCA.ui.render_rewrite $("body"), "wrapper", {}, (el) =>
    BCA.rt.logger.info "BCA wrapper rendered"
    $("#login_button").unbind().click ()->
      BCA.auth.login "facebook" ,
        rememberMe: true,
        scope: 'email'
    $("#logout_button").unbind().click ()->
      BCA.auth.logout()
      BCA.rt.route_to ""
    $("#restart_button").unbind().click ()->
      if confirm("Are you sure to restart? All progress will be lost!")
        BCA.db_user_uploads.remove()
        BCA.db_user_tasks.remove()
        BCA.rt.route_to "setup"

).bind "stop", ->
  BCA.rt.logger.info "BCA stopped"

# start application
BCA.rt.start()