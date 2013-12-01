



var ALL;

ALL = (function() {
  function ALL() {}

  ALL.prototype.model = {
    dummy: null
  };

  ALL.prototype.init = function() {
    var that;
    that = this;
    BCA.db_uploads = new Firebase('https://bca.firebaseIO.com/uploads');
    BCA.db_uploads.once("value", function(snapshot) {
      var k, k2, posts_array, users, v, v2,
        _this = this;
      users = snapshot.val();
      posts_array = [];
      for (k in users) {
        v = users[k];
        for (k2 in v) {
          v2 = v[k2];
          v2.id = k;
          posts_array.push(v2);
        }
      }
      console.log(posts_array);
      posts_array.sort(function(a, b) {
        return b.time - a.time;
      });
      return BCA.ui.render_rewrite($("body"), "module_post_all", {
        posts: posts_array
      }, function(el) {});
    });
    return this;
  };

  return ALL;

})();

var FEED;

FEED = (function() {
  function FEED() {}

  FEED.prototype.model = {
    dummy: ""
  };

  FEED.prototype.bind_submit_image = function() {
    return BCA.ui.make_jq_img_upload("jq_image_upload", "image_upload_wrapper", "image_upload_progress", function(img_url) {
      return BCA.db_uploads.child(BCA.fb_user.id).push({
        url: img_url,
        time: (new Date()) - 0,
        reflect: "",
        note: ""
      });
    });
  };

  FEED.prototype.bind_submit_reflection = function() {
    var that;
    that = this;
    return $("#submit_reflection").click(function() {
      var my_reflection;
      my_reflection = $("#my_reflection").val().trim();
      if (my_reflection.length < 10) {
        return alert("Your relection is too short!");
      } else {
        return BCA.db_uploads.child(BCA.fb_user.id).push({
          url: "",
          time: (new Date()) - 0,
          reflect: my_reflection,
          note: ""
        });
      }
    });
  };

  FEED.prototype.init = function() {
    var that,
      _this = this;
    that = this;
    if (!BCA.db_user_tasks || !BCA.fb_user) {
      BCA.rt.route_to("");
      return;
    }
    return BCA.ui.render_rewrite(null, "page_feed", that.model, function(el) {
      BCA.db_user_uploads = new Firebase('https://bca.firebaseIO.com/uploads/' + BCA.fb_user.id);
      return BCA.db_user_uploads.on("value", function(snapshot) {
        var dateObj, day, k, month, posts_array, posts_hash, v, year,
          _this = this;
        posts_hash = snapshot.val();
        posts_array = [];
        for (k in posts_hash) {
          v = posts_hash[k];
          dateObj = new Date(v.time);
          month = dateObj.getUTCMonth();
          day = dateObj.getUTCDate();
          year = dateObj.getUTCFullYear();
          v.time = year + " / " + month + " / " + day;
          v.id = k;
          posts_array.push(v);
        }
        if (posts_array.length % 4 === 0 && posts_array.length > 0) {

        } else {

        }
        return BCA.ui.render_rewrite("previous_activities", "module_post", {
          posts: posts_array.reverse()
        }, function(el) {
          return $(".trash_post").unbind().click(function(e) {
            var r;
            r = confirm("Are you sure to delete this post?");
            if (r) {
              return BCA.db_user_uploads.child($(e.target).data("id")).remove();
            }
          });
        });
      });
    });
  };

  return FEED;

})();

var HOME;

HOME = (function() {
  function HOME() {}

  HOME.prototype.model = {
    dummy: ""
  };

  HOME.prototype.auth_and_setup = function() {
    var that;
    that = this;
    return BCA.auth = new FirebaseSimpleLogin(BCA.db, function(error, user) {
      if (error) {
        return console.log(error.message);
      } else if (user) {
        BCA.fb_user = user;
        BCA.db_users.child(user.id).set(user);
        $("#hello_msg").text(user.name);
        console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
        BCA.db_user_tasks = new Firebase('https://bca.firebaseIO.com/tasks/' + user.id);
        return BCA.db_user_tasks.once("value", function(snapshot) {
          if (!snapshot.val()) {
            return BCA.rt.route_to("setup");
          } else {
            return BCA.rt.route_to("feed");
          }
        });
      } else {
        BCA.fb_user = null;
        return console.log('user is logged out');
      }
    });
  };

  HOME.prototype.init = function() {
    var that,
      _this = this;
    that = this;
    BCA.ui.render_rewrite(null, "page_home", that.model, function(el) {
      return that.auth_and_setup();
    });
    return this;
  };

  return HOME;

})();

var SETUP;

SETUP = (function() {
  function SETUP() {}

  SETUP.prototype.model = {
    dummy: "",
    preset_tasks: ["Take a photo a day", "Eat a different food everyday"]
  };

  SETUP.prototype.init = function() {
    var that,
      _this = this;
    that = this;
    if (!BCA.db_user_tasks || !BCA.fb_user) {
      BCA.rt.route_to("");
      return;
    }
    return BCA.ui.render_rewrite(null, "page_setup", that.model, function(el) {
      $("#setup_button").unbind().click(function() {
        var my_own_task;
        my_own_task = $("#my_own_task").val().trim();
        if (my_own_task.length < 5) {
          return alert("Your own task is too short!");
        } else {
          return BCA.db_user_tasks.set({
            goal: my_own_task,
            type: "self"
          }, function() {
            return BCA.rt.route_to("feed");
          });
        }
      });
      return $(".preset_task").unbind().click(function(e) {
        var g;
        g = $(e.target).text();
        return BCA.db_user_tasks.set({
          goal: g,
          type: "pre_set"
        }, function() {
          return BCA.rt.route_to("feed");
        });
      });
    });
  };

  return SETUP;

})();


