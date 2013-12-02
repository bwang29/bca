



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
    dummy: "",
    fb_user: null,
    today: ""
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

  FEED.prototype.get_date = function(time) {
    var dateObj, day, month, year;
    dateObj = new Date(time);
    month = dateObj.getUTCMonth();
    day = dateObj.getUTCDate();
    year = dateObj.getUTCFullYear();
    return year + " / " + month + " / " + day;
  };

  FEED.prototype.render_previous_activity = function() {
    var that;
    that = this;
    BCA.db_user_uploads = new Firebase('https://bca.firebaseIO.com/uploads/' + BCA.fb_user.id);
    return BCA.db_user_uploads.on("value", function(snapshot) {
      var k, posts_array, posts_hash, v,
        _this = this;
      posts_hash = snapshot.val();
      posts_array = [];
      for (k in posts_hash) {
        v = posts_hash[k];
        v.time = that.get_date(v.time);
        v.id = k;
        posts_array.push(v);
      }
      posts_array = posts_array.reverse();
      if (posts_array.length >= 3 && posts_array[0].url !== "" && posts_array[1].url !== "" && posts_array[2].url !== "") {
        $("#image_upload_wrapper").hide();
        $("#reflection_wrapper").show();
        $("#done_today").hide();
        $("#reflection_wrapper textarea").focus();
      } else {
        $("#image_upload_wrapper").show();
        $("#reflection_wrapper").hide();
        $("#done_today").hide();
      }
      if (posts_array.length !== 0 && posts_array[0].time === that.get_date(new Date())) {
        $("#image_upload_wrapper").hide();
        $("#reflection_wrapper").hide();
        $("#done_today").show();
      }
      return BCA.ui.render_rewrite("previous_activities", "module_post", {
        posts: posts_array
      }, function(el) {
        return $(".trash_post").unbind().click(function(e) {
          if (confirm("Are you sure to delete this post?")) {
            return BCA.db_user_uploads.child($(e.target).data("id")).remove();
          }
        });
      });
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
    that.model.fb_user = BCA.fb_user;
    that.model.today = that.get_date(new Date());
    return BCA.ui.render_rewrite(null, "page_feed", that.model, function(el) {
      that.bind_submit_reflection();
      that.bind_submit_image();
      return that.render_previous_activity();
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
      $("#login_panel").fadeIn("fast");
      if (error) {
        return console.log(error.message);
      } else if (user) {
        $("#login_button").hide();
        $("#logout_button").show();
        $("#restart_button").hide();
        BCA.fb_user = user;
        BCA.db_users.child(user.id).set(user);
        console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
        BCA.db_user_tasks = new Firebase('https://bca.firebaseIO.com/tasks/' + user.id);
        return BCA.db_user_tasks.once("value", function(snapshot) {
          if (!snapshot.val()) {
            return BCA.rt.route_to("setup");
          } else {
            $("#restart_button").show();
            BCA.fb_user.task = snapshot.val().goal;
            return BCA.rt.route_to("feed");
          }
        });
      } else {
        BCA.fb_user = null;
        $("#login_button").show();
        $("#logout_button").hide();
        $("#restart_button").hide();
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
    preset_tasks: ["Take a different path to work/school", "Try a different food everyday", "Take a picture of one single object"]
  };

  SETUP.prototype.init = function() {
    var that,
      _this = this;
    that = this;
    $("#restart_button").hide();
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
            BCA.fb_user.task = g;
            $("#restart_button").show();
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
          BCA.fb_user.task = g;
          $("#restart_button").show();
          return BCA.rt.route_to("feed");
        });
      });
    });
  };

  return SETUP;

})();


