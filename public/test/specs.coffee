# do npm install in the public folder for grunt
# then run "sudo grunt test"

target_base_url = "http://localhost:3000"

# get function
ws_get = (target,callback) ->
  $.ajax
    type: "GET"
    url: target_base_url+ target

    success: (res) ->
      callback(res)
    error: (request, status, err) ->
      console.info err


describe "Ethea front end", ->
  returned = false
  res_val = null

  it "should pass smoke test", ->
    runs ()->
      ws_get "/smoke_test", (res)->
        returned = true
        res_val = res
    waitsFor ()->
      return returned
    , "Service returned", 2000
    runs ()->
      expect(res_val.name).toEqual("Ethea")