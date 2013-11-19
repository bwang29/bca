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
).bind "stop", ->
  BCA.rt.logger.info "BCA stopped"

# start application
BCA.rt.start()