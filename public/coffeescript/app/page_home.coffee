class HOME
  model:
    dummy: ""
  auth_and_setup: ()->
    that = this
    BCA.auth = new FirebaseSimpleLogin BCA.db, (error, user)->
      $("#login_panel").fadeIn("fast")
      if (error)
        console.log(error.message) # error.code as well
      else if (user)
        $("#login_button").hide()
        $("#logout_button").show()
        $("#restart_button").hide()

        BCA.fb_user = user # actually dangerous to expose this
        BCA.db_users.child(user.id).set(user) # record user
        console.log('User ID: ' + user.id + ', Provider: ' + user.provider)
        # find if the user has assigned task
        BCA.db_user_tasks = new Firebase('https://bca.firebaseIO.com/tasks/' + user.id)
        BCA.db_user_tasks.once "value", (snapshot) ->
          if !snapshot.val() # task has not setup yet
            BCA.rt.route_to "setup"
          else
            $("#restart_button").show()
            BCA.fb_user.task = snapshot.val().goal
            BCA.rt.route_to "feed"
      else
        BCA.fb_user = null
        $("#login_button").show()
        $("#logout_button").hide()
        $("#restart_button").hide()
        console.log('user is logged out')

  init: ()->
    that = this
    BCA.ui.render_rewrite null, "page_home", that.model, (el) =>
      # auth and setup from home to prevent user to re-enter setup/feed page manually
      that.auth_and_setup()

    return this