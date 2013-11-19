var target_base_url, ws_get;

target_base_url = "http://localhost:3000";

ws_get = function(target, callback) {
  return $.ajax({
    type: "GET",
    url: target_base_url + target,
    success: function(res) {
      return callback(res);
    },
    error: function(request, status, err) {
      return console.info(err);
    }
  });
};

describe("Ethea front end", function() {
  var res_val, returned;
  returned = false;
  res_val = null;
  return it("should pass smoke test", function() {
    runs(function() {
      return ws_get("/smoke_test", function(res) {
        returned = true;
        return res_val = res;
      });
    });
    waitsFor(function() {
      return returned;
    }, "Service returned", 2000);
    return runs(function() {
      return expect(res_val.name).toEqual("Ethea");
    });
  });
});
