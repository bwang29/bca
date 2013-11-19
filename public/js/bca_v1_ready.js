var _this = this;

BCA.rt = Davis(function() {
  this.configure(function() {
    return this.generateRequestOnPageLoad = true;
  });
  return this.get('/', function(req) {});
});

BCA.rt.route_to = function() {
  return Davis.location.assign("/" + Array.prototype.join.call(arguments, "/"));
};

BCA.rt.bind("runRoute", function(request) {}).bind("routeNotFound", function(request) {}).bind("start", function() {
  var _this = this;
  BCA.rt.logger.info("BCA started");
  BCA.fb_user = null;
  BCA.db = new Firebase('https://bca.firebaseIO.com');
  BCA.db_users = new Firebase('https://bca.firebaseIO.com/users');
  BCA.db_uploads = new Firebase('https://bca.firebaseIO.com/uploads');
  BCA.db_tasks = new Firebase('https://bca.firebaseIO.com/tasks');
  BCA.setup_complete = function() {
    $(".to_hide").show();
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
      console.log(posts_array);
      if (posts_array.length % 4 === 0) {
        $(".to_upload").hide();
        $(".to_reflect").show();
      } else {
        $(".to_reflect").hide();
        $(".to_upload").show();
      }
      return BCA.ui.render_rewrite($("#previous_activities"), "module_post", {
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
  };
  BCA.auth = new FirebaseSimpleLogin(BCA.db, function(error, user) {
    if (error) {
      return console.log(error.message);
    } else if (user) {
      BCA.fb_user = user;
      $(".to_show").hide();
      $(".to_setup").hide();
      $("#hello_msg").text(user.name);
      BCA.db_users.child(user.id).set(user);
      console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
      BCA.db_user_tasks = new Firebase('https://bca.firebaseIO.com/tasks/' + user.id);
      return BCA.db_user_tasks.once("value", function(snapshot) {
        if (!snapshot.val()) {
          $(".to_setup").show();
          return $("#setup_button").unbind().click(function() {
            var my_own_task;
            my_own_task = $("#my_own_task").val().trim();
            if (my_own_task.length < 5) {
              return alert("Your own task is too short!");
            } else {
              return BCA.db_user_tasks.set({
                goal: my_own_task,
                type: "self"
              }, function() {
                $("#user_task").text(my_own_task);
                $(".to_setup").hide();
                return BCA.setup_complete();
              });
            }
          });
        } else {
          $("#user_task").text(snapshot.val().goal);
          return BCA.setup_complete();
        }
      });
    } else {
      BCA.fb_user = null;
      $(".to_hide").hide();
      $(".to_setup").hide();
      $(".to_show").show();
      return console.log('user is logged out');
    }
  });
  return BCA.ui.render_rewrite($("body"), "wrapper", {}, function(el) {
    BCA.rt.logger.info("BCA wrapper rendered");
    $("#login_button").unbind().click(function() {
      return BCA.auth.login("facebook", {
        rememberMe: true,
        scope: 'email'
      });
    });
    $("#logout_button").unbind().click(function() {
      return BCA.auth.logout();
    });
    $("#restart_button").unbind().click(function() {
      var r;
      r = confirm("Are you sure to restart? All progress will be lost!");
      if (r) {
        BCA.db_user_uploads.remove();
        BCA.db_user_tasks.remove();
        return BCA.auth.logout();
      }
    });
    $("#submit_reflection").click(function() {
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
    return BCA.ui.make_jq_img_upload("jq_image_upload", "image_upload_wrapper", "image_upload_progress", function(img_url) {
      return BCA.db_uploads.child(BCA.fb_user.id).push({
        url: img_url,
        time: (new Date()) - 0,
        reflect: "",
        note: ""
      });
    });
  });
}).bind("stop", function() {
  return BCA.rt.logger.info("BCA stopped");
});

BCA.rt.start();
